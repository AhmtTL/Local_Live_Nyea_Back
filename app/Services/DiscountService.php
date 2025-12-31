<?php

namespace App\Services;

use App\Models\DiscountCode;
use App\Models\DiscountRedemption;
use Stripe\Stripe;
use Stripe\Coupon;
use Stripe\PromotionCode;
use Stripe\Exception\ApiErrorException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DiscountService
{
    public function __construct()
    {
        $stripeSecret = config('services.stripe.secret');
        
        if (empty($stripeSecret)) {
            throw new \Exception('Stripe is not properly configured.');
        }

        Stripe::setApiKey($stripeSecret);
    }

    /**
     * Create a discount code and corresponding Stripe coupon
     */
    public function createDiscountCode(array $data): DiscountCode
    {
        try {
            // Create Stripe coupon first
            $stripeCoupon = $this->createStripeCoupon($data);
            
            // Create Stripe promotion code
            $stripePromotionCode = $this->createStripePromotionCode($stripeCoupon->id, $data['code'], $data);

            // Create local discount code record
            $discountCode = DiscountCode::create(array_merge($data, [
                'stripe_coupon_id' => $stripeCoupon->id,
                'stripe_promotion_code_id' => $stripePromotionCode->id,
            ]));

            Log::info('Discount code created successfully', [
                'discount_code_id' => $discountCode->id,
                'code' => $discountCode->code,
                'stripe_coupon_id' => $stripeCoupon->id,
                'stripe_promotion_code_id' => $stripePromotionCode->id,
            ]);

            return $discountCode;

        } catch (ApiErrorException $e) {
            Log::error('Failed to create discount code in Stripe', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            throw new \Exception('Failed to create discount code: ' . $e->getMessage());
        }
    }

    /**
     * Update a discount code and sync with Stripe
     */
    public function updateDiscountCode(DiscountCode $discountCode, array $data): DiscountCode
    {
        try {
            // Update local record
            $discountCode->update($data);

            // Update Stripe coupon metadata if needed
            if ($discountCode->stripe_coupon_id) {
                Coupon::update($discountCode->stripe_coupon_id, [
                    'metadata' => [
                        'name' => $discountCode->name,
                        'description' => $discountCode->description,
                        'max_redemptions' => $discountCode->max_redemptions,
                        'updated_at' => now()->toISOString(),
                    ]
                ]);
            }

            // Update Stripe promotion code if needed
            if ($discountCode->stripe_promotion_code_id && isset($data['is_active'])) {
                PromotionCode::update($discountCode->stripe_promotion_code_id, [
                    'active' => $data['is_active']
                ]);
            }

            Log::info('Discount code updated successfully', [
                'discount_code_id' => $discountCode->id,
                'code' => $discountCode->code,
            ]);

            return $discountCode;

        } catch (ApiErrorException $e) {
            Log::error('Failed to update discount code in Stripe', [
                'error' => $e->getMessage(),
                'discount_code_id' => $discountCode->id,
            ]);
            throw new \Exception('Failed to update discount code: ' . $e->getMessage());
        }
    }

    /**
     * Deactivate a discount code in both local and Stripe
     */
    public function deactivateDiscountCode(DiscountCode $discountCode): DiscountCode
    {
        try {
            // Deactivate locally
            $discountCode->update(['is_active' => false]);

            // Deactivate in Stripe
            if ($discountCode->stripe_promotion_code_id) {
                PromotionCode::update($discountCode->stripe_promotion_code_id, [
                    'active' => false
                ]);
            }

            Log::info('Discount code deactivated successfully', [
                'discount_code_id' => $discountCode->id,
                'code' => $discountCode->code,
            ]);

            return $discountCode;

        } catch (ApiErrorException $e) {
            Log::error('Failed to deactivate discount code in Stripe', [
                'error' => $e->getMessage(),
                'discount_code_id' => $discountCode->id,
            ]);
            throw new \Exception('Failed to deactivate discount code: ' . $e->getMessage());
        }
    }

    /**
     * Validate a discount code by code string
     */
    public function validateDiscountCode(string $code, float $amount = 0): array
    {
        $discountCode = DiscountCode::where('code', strtoupper($code))->first();

        if (!$discountCode) {
            return [
                'valid' => false,
                'error' => 'Discount code not found.',
            ];
        }

        if (!$discountCode->canApplyToAmount($amount)) {
            $errors = [];
            
            if (!$discountCode->isValid()) {
                switch ($discountCode->status) {
                    case 'inactive':
                        $errors[] = 'This discount code is inactive.';
                        break;
                    case 'scheduled':
                        $errors[] = 'This discount code is not yet active.';
                        break;
                    case 'expired':
                        $errors[] = 'This discount code has expired.';
                        break;
                    case 'exhausted':
                        $errors[] = 'This discount code has reached its usage limit.';
                        break;
                    default:
                        $errors[] = 'This discount code is not valid.';
                }
            }

            if ($discountCode->min_amount && $amount < $discountCode->min_amount) {
                $errors[] = "Minimum order amount of $" . number_format($discountCode->min_amount, 2) . " required.";
            }

            return [
                'valid' => false,
                'error' => implode(' ', $errors),
            ];
        }

        $discountAmount = $discountCode->calculateDiscountAmount($amount);

        return [
            'valid' => true,
            'discount_code' => $discountCode,
            'discount_amount' => $discountAmount,
            'message' => "Discount applied! Save $" . number_format($discountAmount, 2),
        ];
    }

    /**
     * Record a discount redemption from Stripe webhook
     */
    public function recordRedemption(string $stripeSessionId, string $userEmail, float $discountAmount): ?DiscountRedemption
    {
        try {
            // Find the discount code by the session
            // This would typically be called from a webhook after payment
            $discountCode = DiscountCode::whereNotNull('stripe_promotion_code_id')->first();
            
            if (!$discountCode) {
                Log::warning('Could not find discount code for redemption', [
                    'stripe_session_id' => $stripeSessionId,
                    'user_email' => $userEmail,
                ]);
                return null;
            }

            // Create redemption record
            $redemption = DiscountRedemption::create([
                'discount_code_id' => $discountCode->id,
                'user_email' => $userEmail,
                'stripe_session_id' => $stripeSessionId,
                'amount_discounted' => $discountAmount,
            ]);

            // Increment usage count
            $discountCode->incrementUsage();

            Log::info('Discount redemption recorded', [
                'redemption_id' => $redemption->id,
                'discount_code_id' => $discountCode->id,
                'stripe_session_id' => $stripeSessionId,
                'amount_discounted' => $discountAmount,
            ]);

            return $redemption;

        } catch (\Exception $e) {
            Log::error('Failed to record discount redemption', [
                'error' => $e->getMessage(),
                'stripe_session_id' => $stripeSessionId,
                'user_email' => $userEmail,
            ]);
            return null;
        }
    }

    /**
     * Create Stripe coupon
     */
    private function createStripeCoupon(array $data): Coupon
    {
        $couponData = [
            'name' => $data['name'],
            'duration' => 'once', // One-time use per customer
            'metadata' => [
                'created_by_nyea' => 'true',
                'local_id' => Str::random(10), // Will be updated after local record creation
                'created_at' => now()->toISOString(),
            ]
        ];

        // Set discount type
        if ($data['type'] === 'percentage') {
            $couponData['percent_off'] = $data['value'];
        } else {
            $couponData['amount_off'] = (int) ($data['value'] * 100); // Convert to cents
            $couponData['currency'] = strtolower($data['currency']);
        }

        // Set validity period
        if (isset($data['expires_at'])) {
            $couponData['redeem_by'] = strtotime($data['expires_at']);
        }

        return Coupon::create($couponData);
    }

    /**
     * Create Stripe promotion code
     */
    private function createStripePromotionCode(string $couponId, string $code, array $data): PromotionCode
    {
        $promotionCodeData = [
            'coupon' => $couponId,
            'code' => strtoupper($code),
            'active' => $data['is_active'] ?? true,
        ];

        // Set usage limits
        if (isset($data['max_redemptions'])) {
            $promotionCodeData['max_redemptions'] = $data['max_redemptions'];
        }

        // Set minimum amount
        if (isset($data['min_amount'])) {
            $promotionCodeData['restrictions'] = [
                'minimum_amount' => (int) ($data['min_amount'] * 100), // Convert to cents
                'minimum_amount_currency' => strtolower($data['currency'] ?? 'USD'),
            ];
        }

        return PromotionCode::create($promotionCodeData);
    }

    /**
     * Sync usage data from Stripe
     */
    public function syncUsageFromStripe(DiscountCode $discountCode): void
    {
        try {
            if (!$discountCode->stripe_promotion_code_id) {
                return;
            }

            $stripePromotionCode = PromotionCode::retrieve($discountCode->stripe_promotion_code_id);
            
            // Update usage count from Stripe
            $discountCode->update([
                'used_count' => $stripePromotionCode->times_redeemed ?? 0
            ]);

        } catch (ApiErrorException $e) {
            Log::error('Failed to sync usage from Stripe', [
                'error' => $e->getMessage(),
                'discount_code_id' => $discountCode->id,
            ]);
        }
    }

    /**
     * Activate a discount code in Stripe
     */
    public function activateDiscountCode(DiscountCode $discountCode): void
    {
        try {
            // Activate promotion code in Stripe if it exists
            if ($discountCode->stripe_promotion_code_id) {
                PromotionCode::update($discountCode->stripe_promotion_code_id, [
                    'active' => true
                ]);
                
                Log::info('Promotion code activated in Stripe', [
                    'stripe_promotion_code_id' => $discountCode->stripe_promotion_code_id,
                    'discount_code_id' => $discountCode->id,
                ]);
            }

        } catch (ApiErrorException $e) {
            Log::error('Failed to activate promotion code in Stripe', [
                'error' => $e->getMessage(),
                'discount_code_id' => $discountCode->id,
            ]);
            throw new \Exception('Failed to activate discount code: ' . $e->getMessage());
        }
    }

    /**
     * Delete a discount code from Stripe
     */
    public function deleteDiscountCode(DiscountCode $discountCode): void
    {
        try {
            // Delete promotion code from Stripe if it exists
            if ($discountCode->stripe_promotion_code_id) {
                // Note: Stripe doesn't allow deletion of promotion codes, but we can deactivate them
                PromotionCode::update($discountCode->stripe_promotion_code_id, [
                    'active' => false
                ]);
                
                Log::info('Promotion code deactivated in Stripe before deletion', [
                    'stripe_promotion_code_id' => $discountCode->stripe_promotion_code_id,
                    'discount_code_id' => $discountCode->id,
                ]);
            }

            // Note: We could also delete the coupon from Stripe if no other promotion codes use it
            // but for safety, we'll leave the coupon in Stripe
            
            Log::info('Discount code prepared for deletion', [
                'discount_code_id' => $discountCode->id,
                'code' => $discountCode->code,
            ]);

        } catch (ApiErrorException $e) {
            // Log the error but don't throw - we still want to delete from our database
            Log::error('Failed to deactivate promotion code in Stripe during deletion', [
                'error' => $e->getMessage(),
                'discount_code_id' => $discountCode->id,
            ]);
        }
    }
}
