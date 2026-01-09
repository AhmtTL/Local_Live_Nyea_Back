<?php


namespace App\Services;

use App\Models\Payment;
use App\Models\User;
use App\Models\Program;
use App\Models\Referral;
use App\Models\ReferralConversion;
use App\Models\UserWorkshopRegistration;
use App\Models\UserTrainingCampRegistration;
use App\Mail\WorkshopRegistrationMail;
use App\Mail\TrainingCampRegistrationMail;
use App\Models\TrainingCampSession;
use App\Models\WorkshopSession;

use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Customer;
use Stripe\Invoice;
use Stripe\InvoiceItem;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Arr;

class StripeService
{
    public function __construct()
    {
        $stripeSecret = config('services.stripe.secret');

        if (empty($stripeSecret)) {
            throw new \Exception('Payment system is not properly configured. Please contact support.');
        }

        // Initialize Stripe with the provided API key
        Stripe::setApiKey($stripeSecret);
    }

    /**
     * Create Stripe checkout session for authenticated users
     */
    public function createCheckoutSession(array $items, User $user, array $parentInfo = [], array $paymentPlans = []): Session
    {
        try {
            // Transform items for Stripe
            $lineItems = collect($items)->map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => $item['price_data']['currency'],
                        'product_data' => [
                            'name' => $item['price_data']['product_data']['name'],
                            'description' => $item['price_data']['product_data']['description'] ?? null,
                            'images' => $item['price_data']['product_data']['images'] ?? [],
                            'metadata' => $item['price_data']['product_data']['metadata'] ?? [],
                        ],
                        'unit_amount' => $item['price_data']['unit_amount'],
                    ],
                    'quantity' => $item['quantity'],
                ];
            })->toArray();

            // Create checkout session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => config('app.frontend_url') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => config('app.frontend_url') . '/cart',
                'customer_email' => $user->email,
                'customer_creation' => 'always',
                'client_reference_id' => $user->id,
                'metadata' => [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                ],
                'allow_promotion_codes' => true,
                'billing_address_collection' => 'required',
                'payment_intent_data' => [
                    'metadata' => [
                        'user_id' => $user->id,
                        'order_type' => 'educational_program',
                    ],
                ],
            ]);

            // Create payment records for each item
            $this->createPaymentsFromSession($session, $user, $items, $parentInfo, $paymentPlans);

            return $session;
        } catch (ApiErrorException $e) {
            Log::error('Stripe checkout session creation failed', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
            ]);
            throw $e;
        }
    }

    /**
     * Create Stripe checkout session for guest users
     */
    public function createGuestCheckoutSession(array $items, array $guestInfo, array $parentInfo = [], array $paymentPlans = []): Session
    {
        try {
            // Transform items for Stripe
            $lineItems = collect($items)->map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => $item['price_data']['currency'],
                        'product_data' => [
                            'name' => $item['price_data']['product_data']['name'],
                            'description' => $item['price_data']['product_data']['description'] ?? null,
                            'images' => $item['price_data']['product_data']['images'] ?? [],
                            'metadata' => $item['price_data']['product_data']['metadata'] ?? [],
                        ],
                        'unit_amount' => $item['price_data']['unit_amount'],
                    ],
                    'quantity' => $item['quantity'],
                ];
            })->toArray();

            // Create checkout session for guest
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => config('app.frontend_url') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => config('app.frontend_url') . '/cart',
                'customer_email' => $guestInfo['email'],
                'customer_creation' => 'always',
                'metadata' => [
                    'is_guest' => 'true',
                    'guest_name' => $guestInfo['name'],
                    'guest_email' => $guestInfo['email'],
                    'guest_phone' => '12598573299',
                    'guest_school_name' => $guestInfo['school_name'],
                ],
                'allow_promotion_codes' => true,
                'billing_address_collection' => 'required',
                'payment_intent_data' => [
                    'metadata' => [
                        'is_guest' => 'true',
                        'guest_email' => $guestInfo['email'],
                        'order_type' => 'educational_program_guest',
                    ],
                ],
            ]);

            // Create guest payment records
            $this->createGuestPaymentsFromSession($session, $guestInfo, $items, $parentInfo, $paymentPlans);

            return $session;
        } catch (ApiErrorException $e) {
            Log::error('Guest checkout session creation failed', [
                'error' => $e->getMessage(),
                'guest_email' => $guestInfo['email'] ?? 'unknown',
            ]);
            throw $e;
        }
    }

    /**
     * Verify payment and get session details
     */
    public function verifyPayment(string $sessionId): array
    {
        try {
            $session = Session::retrieve($sessionId);
            $payments = Payment::where('stripe_session_id', $sessionId)->get();

            if ($payments->isEmpty()) {
                return [
                    'verified' => false,
                    'payment_status' => 'failed',
                    'error' => 'Payment records not found',
                ];
            }
            foreach ($payments as $payment) {
                $oldStatus = $payment->status;
                $newStatus = $session->payment_status;

                $updatePayload = [];

                if ($session->payment_intent && !$payment->stripe_payment_intent_id) {
                    $updatePayload['stripe_payment_intent_id'] = is_string($session->payment_intent)
                        ? $session->payment_intent
                        : ($session->payment_intent->id ?? null);
                }

                if ($session->customer && !$payment->stripe_customer_id) {
                    $updatePayload['stripe_customer_id'] = is_string($session->customer)
                        ? $session->customer
                        : ($session->customer->id ?? null);
                }

                if (!empty($updatePayload)) {
                    $payment->update(array_filter($updatePayload));
                }

                $payment->update([
                    'status' => $newStatus,
                    'paid_at' => $newStatus === 'paid' || $newStatus === 'no_payment_required' ? now() : null,
                ]);

                logger()->info('Payment status updated', [$payment->id, $newStatus]);


                // Update workshop session availability if payment was successful
                if (($oldStatus !== 'paid') && ($newStatus === 'paid' || $newStatus === 'no_payment_required')) {
                    // Payment was just confirmed as successful
                    if ($payment->workshop_session_id) {
                        $workshopSession = \App\Models\WorkshopSession::find($payment->workshop_session_id);
                        if ($workshopSession) {
                            // Calculate quantity from metadata or default to 1
                            $quantity = $payment->metadata['quantity'] ?? 1;

                            // Update booked spots
                            $workshopSession->increment('booked_spots', $quantity);

                            // Create workshop registration and send email
                            $this->createRegistrationAndSendEmail($payment);

                            // Track referral conversion after email is sent
                            $this->trackReferralConversion($payment);
                        }
                    }

                    // Update training camp session availability if payment was successful
                    if ($payment->training_camp_session_id) {
                        $trainingCampSession = \App\Models\TrainingCampSession::find($payment->training_camp_session_id);
                        if ($trainingCampSession) {
                            // Calculate quantity from metadata or default to 1
                            $quantity = $payment->metadata['quantity'] ?? 1;

                            // Update booked spots
                            $trainingCampSession->increment('booked_spots', $quantity);

                            // Create training camp registration and send email
                            $this->createTrainingCampRegistrationAndSendEmail($payment);

                            // Track referral conversion after email is sent
                            $this->trackReferralConversion($payment);
                        }
                    }

                    // Resource program registration and email
                    if ($payment->resource_program_id) {
                        $resourceProgram = \App\Models\ResourceProgram::find($payment->resource_program_id);
                        if ($resourceProgram) {
                            // Calculate quantity from metadata or default to 1
                            $quantity = $payment->metadata['quantity'] ?? 1;

                            // If you have a booked_spots or similar stat, increment it
                            if (isset($resourceProgram->booked_spots)) {
                                $resourceProgram->increment('booked_spots', $quantity);
                            }

                            // Create resource program registration and send email
                            $this->createResourceProgramRegistrationAndSendEmail($payment);
                        }
                    }

                    if ($payment->is_deposit) {
                        $depositMetadata = $payment->metadata ?? [];
                        Arr::set($depositMetadata, 'payment_plan.deposit_paid_at', now()->toIso8601String());
                        $payment->update(['metadata' => $depositMetadata]);

                        $balancePayment = $payment->balancePayments()->first();
                        if ($balancePayment && !$balancePayment->stripe_invoice_id) {
                            try {
                                $invoiceId = $this->createBalanceInvoice($payment, $balancePayment, $session);
                                Log::info('Balance invoice created for payment plan', [
                                    'deposit_payment_id' => $payment->id,
                                    'balance_payment_id' => $balancePayment->id,
                                    'invoice_id' => $invoiceId,
                                ]);
                            } catch (\Exception $invoiceException) {
                                Log::error('Failed to create balance invoice', [
                                    'deposit_payment_id' => $payment->id,
                                    'balance_payment_id' => $balancePayment->id,
                                    'error' => $invoiceException->getMessage(),
                                ]);
                            }
                        }
                    }
                }

                // Update user program relationship (only for authenticated users)
                if ($payment->user_id) {
                    $user = User::find($payment->user_id);
                    if ($user) {
                        // if user already has this program, update the notes on the user program
                        if ($user->interestedPrograms()->where('program_id', $payment->program_id)->exists()) {
                            // Update existing pivot record
                            $user->interestedPrograms()->updateExistingPivot($payment->program_id, [
                                'notes' => $payment->notes ?? null,
                            ]);
                        } else {
                            // Attach new program with notes
                            $user->interestedPrograms()->attach($payment->program_id, [
                                'notes' => $payment->notes ?? null,
                            ]);
                        }
                    }
                }
            }

            return [
                'verified' => true,
                'payment_status' => $session->payment_status,
                'payment_ids' => $payments->pluck('id')->toArray(),
                'customer_email' => $session->customer_details->email ?? $payments->first()->user->email,
                'amount_total' => $session->amount_total,
                'currency' => $session->currency,
                'metadata' => $session->metadata->toArray(),
            ];
        } catch (ApiErrorException $e) {
            Log::error('Payment verification failed', [
                'session_id' => $sessionId,
                'error' => $e->getMessage(),
            ]);

            return [
                'verified' => false,
                'payment_status' => 'failed',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Track referral conversion and update conversion count
     */
    private function trackReferralConversion(Payment $payment): void
    {
        try {
            // Get referral code from cache using client IP
            $cacheKey = 'ref_code_' . request()->ip();
            $referralData = cache($cacheKey);

            // Handle both old format (string) and new format (array)
            if (is_string($referralData)) {
                $refCode = $referralData;
                $schoolId = null;
            } elseif (is_array($referralData)) {
                $refCode = $referralData['ref_code'] ?? null;
                $schoolId = $referralData['school_id'] ?? null;
            } else {
                $refCode = null;
                $schoolId = null;
            }

            Log::info('Tracking referral conversion', [
                'payment_id' => $payment->id,
                'guest_email' => $payment->guest_email,
                'cache_key' => $cacheKey,
                'ref_code' => $refCode,
                'school_id' => $schoolId,
                'client_ip' => request()->ip(),
            ]);

            if (!$refCode) {
                Log::info('No referral code found in cache', [
                    'cache_key' => $cacheKey,
                    'client_ip' => request()->ip()
                ]);
                return;
            }

            // Find referral by code
            $referral = Referral::where('referral_code', $refCode)->first();
            if (!$referral) {
                Log::info('Referral code not found in database', ['ref_code' => $refCode]);
                return;
            }

            // Get program and check if the payment is for a workshop session from the referral's school
            $program = Program::find($payment->program_id);

            if (!$program || $program->slug !== 'harvard-negotiation-workshop') {
                Log::info('Program not eligible for referral tracking', [
                    'program_slug' => $program?->slug,
                    'expected' => 'harvard-negotiation-workshop'
                ]);
                return; // Only track harvard-negotiation-workshop
            }

            // Check if the payment has a workshop session and if it belongs to the referral's school
            if ($payment->workshop_session_id) {
                $workshopSession = \App\Models\WorkshopSession::find($payment->workshop_session_id);
                if ($workshopSession && $workshopSession->school_id !== $referral->school_id) {
                    Log::info('Workshop session school does not match referral school', [
                        'workshop_school_id' => $workshopSession->school_id,
                        'referral_school_id' => $referral->school_id
                    ]);
                    return; // Only track conversions for the referral's target school
                }
            }

            // Create conversion record
            ReferralConversion::create([
                'referral_id' => $referral->id,
                'payment_id' => $payment->id,
                'program_id' => $program->id,
                'customer_email' => $payment->guest_email,
                'customer_name' => $payment->guest_name,
                'customer_grade' => $payment->guest_grade,
                'amount' => $payment->amount,
            ]);

            // Update conversion count
            $referral->increment('conversions_count');

            Log::info('Referral conversion tracked successfully', [
                'ref_code' => $refCode,
                'referral_id' => $referral->id,
                'payment_id' => $payment->id,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to track referral conversion', [
                'ref_code' => cache('ref_code_' . request()->ip()),
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
            ]);
        } finally {
            // Clear referral code from cache
            $cacheKey = 'ref_code_' . request()->ip();
            cache()->forget($cacheKey);
            Log::info('Cleared referral code from cache', ['cache_key' => $cacheKey]);
        }
    }

    /**
     * Create and send a Stripe invoice for the outstanding balance on a payment plan
     */
    private function createBalanceInvoice(Payment $depositPayment, Payment $balancePayment, Session $checkoutSession): ?string
    {
        $customerId = $checkoutSession->customer
            ?? $depositPayment->stripe_customer_id
            ?? $balancePayment->stripe_customer_id;

        if (!$customerId) {
            $customer = Customer::create([
                'email' => $depositPayment->display_email,
                'name' => $depositPayment->display_name,
                'phone' => $depositPayment->guest_phone ?? null,
                'metadata' => [
                    'deposit_payment_id' => $depositPayment->id,
                    'balance_payment_id' => $balancePayment->id,
                ],
            ]);

            $customerId = $customer->id;
        }

        $currency = strtolower($balancePayment->currency ?? $checkoutSession->currency ?? 'usd');

        $programTitle = $depositPayment->program?->title ?? 'Programme';
        $description = sprintf(
            'Remaining balance for %s',
            $programTitle
        );

        InvoiceItem::create([
            'customer' => $customerId,
            'amount' => (int) round($balancePayment->amount * 100),
            'currency' => $currency,
            'description' => $description,
            'metadata' => [
                'balance_payment_id' => $balancePayment->id,
                'deposit_payment_id' => $depositPayment->id,
                'program_id' => $depositPayment->program_id,
                'plan_type' => $depositPayment->payment_plan_type,
            ],
        ]);

        $invoicePayload = [
            'customer' => $customerId,
            'collection_method' => 'send_invoice',
            'auto_advance' => false,
            'metadata' => [
                'balance_payment_id' => $balancePayment->id,
                'deposit_payment_id' => $depositPayment->id,
                'program_id' => $depositPayment->program_id,
                'plan_type' => $depositPayment->payment_plan_type,
            ],
        ];

        if ($balancePayment->payment_plan_balance_due_at) {
            $invoicePayload['due_date'] = $balancePayment->payment_plan_balance_due_at
                ->copy()
                ->timezone('UTC')
                ->timestamp;
        } else {
            $invoicePayload['days_until_due'] = 7;
        }


        $invoice = Invoice::create($invoicePayload);
        $invoice = $invoice->finalizeInvoice();
        $invoice->sendInvoice();

        $balancePayment->update([
            'stripe_invoice_id' => $invoice->id,
            'stripe_customer_id' => $customerId,
        ]);

        $depositPayment->update([
            'stripe_customer_id' => $customerId,
        ]);

        return $invoice->id;
    }

    /**
     * Create payment records from Stripe session
     */
    private function createPaymentsFromSession(Session $session, User $user, array $items, array $parentInfo = [], array $paymentPlans = []): void
    {
        $customerInfo = [
            'user_id' => $user->id,
            'guest_name' => $user->name,
            'guest_email' => $user->email,
            'guest_phone' => $user->phone,
            'guest_school_name' => $user->school_name,
            'guest_grade' => $user->grade ?? null,
            'guest_city' => $user->city ?? null,
            'parent_name' => $parentInfo['parent_name'] ?? $user->parent_name ?? null,
            'parent_email' => $parentInfo['parent_email'] ?? $user->parent_email ?? null,
            'parent_phone_number' => $parentInfo['parent_phone_number'] ?? $user->parent_phone_number ?? null,
        ];

        $this->createPayments($session, $items, $customerInfo, false, $paymentPlans);
    }

    /**
     * Create payment records from Stripe session for guest users
     */
    private function createGuestPaymentsFromSession(Session $session, array $guestInfo, array $items, array $parentInfo = [], array $paymentPlans = []): void
    {
        $customerInfo = [
            'user_id' => null,
            'guest_name' => $guestInfo['name'],
            'guest_email' => $guestInfo['email'],
            'guest_phone' => $guestInfo['phone'],
            'guest_school_name' => $guestInfo['school_name'],
            'guest_grade' => $guestInfo['grade'] ?? null,
            'guest_city' => $guestInfo['city'] ?? null,
            'parent_name' => $parentInfo['parent_name'] ?? null,
            'parent_email' => $parentInfo['parent_email'] ?? null,
            'parent_phone_number' => $parentInfo['parent_phone_number'] ?? null,
        ];

        $this->createPayments($session, $items, $customerInfo, true, $paymentPlans);
    }

    /**
     * Create payments for both authenticated and guest users
     */
    private function createPayments(Session $session, array $items, array $customerInfo, bool $isGuest = false, array $paymentPlans = []): void
    {
        foreach ($items as $item) {
            $paymentData = $this->extractPaymentData($item, $session->id);

            if (!$paymentData) {
                continue; // Skip invalid items
            }

            $metadata = array_merge(
                $session->metadata->toArray(),
                $item['price_data']['product_data']['metadata'] ?? []
            );

            $quantity = $item['quantity'] ?? 1;
            $metadata['quantity'] = $quantity;

            if ($isGuest) {
                $metadata['guest_info'] = $customerInfo; // Keep for backward compatibility
                $metadata['is_guest_purchase'] = true;
            }

            $matchedPlan = $this->matchPaymentPlan($paymentData, $paymentPlans);
            $balanceDueAt = null;

            if ($matchedPlan && !empty($matchedPlan['balance_due_date'])) {
                try {
                    $balanceDueAt = Carbon::parse($matchedPlan['balance_due_date']);
                } catch (\Throwable $exception) {
                    Log::warning('Unable to parse payment plan balance due date', [
                        'provided_value' => $matchedPlan['balance_due_date'],
                        'error' => $exception->getMessage(),
                    ]);
                }
            }

            if ($matchedPlan) {
                $metadata['payment_plan'] = [
                    'type' => $matchedPlan['type'],
                    'deposit_per_unit' => $matchedPlan['deposit_amount'],
                    'balance_per_unit' => $matchedPlan['balance_amount'],
                    'total_per_unit' => $matchedPlan['total_amount'],
                    'balance_due_date' => $matchedPlan['balance_due_date'] ?? null,
                    'extra' => $matchedPlan['metadata'] ?? null,
                ];
            }

            $depositAttributes = array_merge($paymentData, $customerInfo, [
                'stripe_session_id' => $session->id,
                'amount' => ($item['price_data']['unit_amount'] * $item['quantity']) / 100,
                'currency' => strtoupper($item['price_data']['currency']),
                'status' => 'pending',
                'metadata' => $metadata,
            ]);

            if ($matchedPlan) {
                $depositAttributes = array_merge($depositAttributes, [
                    'payment_plan_type' => $matchedPlan['type'],
                    'payment_plan_total_amount' => ($matchedPlan['total_amount'] ?? 0) * $quantity,
                    'payment_plan_deposit_amount' => ($matchedPlan['deposit_amount'] ?? 0) * $quantity,
                    'payment_plan_balance_amount' => ($matchedPlan['balance_amount'] ?? 0) * $quantity,
                    'payment_plan_balance_due_at' => $balanceDueAt,
                ]);
            }

            $newPayment = Payment::create($depositAttributes);

            // log the payment data
            Log::info('newPayment', ['newPayment' => $newPayment]);

            if ($matchedPlan && ($matchedPlan['balance_amount'] ?? 0) > 0) {
                $balanceMetadata = array_merge($metadata, [
                    'origin_stripe_session_id' => $session->id,
                    'payment_plan_role' => 'balance',
                ]);

                $balanceAttributes = array_merge($paymentData, $customerInfo, [
                    'stripe_session_id' => null,
                    'amount' => ($matchedPlan['balance_amount'] ?? 0) * $quantity,
                    'currency' => strtoupper($item['price_data']['currency']),
                    'status' => 'pending',
                    'metadata' => $balanceMetadata,
                    'payment_plan_type' => $matchedPlan['type'],
                    'payment_plan_total_amount' => ($matchedPlan['total_amount'] ?? 0) * $quantity,
                    'payment_plan_deposit_amount' => ($matchedPlan['deposit_amount'] ?? 0) * $quantity,
                    'payment_plan_balance_amount' => ($matchedPlan['balance_amount'] ?? 0) * $quantity,
                    'payment_plan_balance_due_at' => $balanceDueAt,
                    'parent_payment_id' => $newPayment->id,
                    'is_balance_payment' => true,
                ]);

                $balancePayment = Payment::create($balanceAttributes);

                Log::info('balancePaymentScheduled', ['balancePayment' => $balancePayment]);
            }
        }
    }

    /**
     * Extract and validate payment data from item
     */
    private function extractPaymentData(array $item, string $sessionId): ?array
    {
        $programId = $item['price_data']['product_data']['metadata']['program_id'] ?? $item['metadata']['program_id'] ?? null;

        $sessionType = $item['price_data']['product_data']['metadata']['session_type'] ?? $item['metadata']['session_type'] ?? null;
        Log::info('sessionType', [$sessionType]);

        if (!$programId) {
            Log::warning('Program ID not found in item metadata', ['item' => $item, 'session_id' => $sessionId]);
            return null;
        }

        if (!Program::find($programId)) {
            Log::warning('Program not found', ['program_id' => $programId, 'session_id' => $sessionId]);
            return null;
        }

        $schoolId = null;

        if ($sessionType === 'training_camp') {
            $trainingCampSessionId = $item['price_data']['product_data']['metadata']['session_id'] ?? $item['metadata']['session_id'] ?? null;
            if ($trainingCampSessionId) {
                $trainingCampSession = TrainingCampSession::find($trainingCampSessionId);
                if (!$trainingCampSession) {
                    Log::warning('Training camp session not found', ['training_camp_session_id' => $trainingCampSessionId, 'session_id' => $sessionId]);
                    return null;
                }
                $schoolId = $trainingCampSession->school_id;
            }
        }
        if ($sessionType === 'workshop') {
            $workshopSessionId = $item['price_data']['product_data']['metadata']['session_id'] ?? $item['metadata']['session_id'] ?? null;
            if ($workshopSessionId) {
                $workshopSession = WorkshopSession::find($workshopSessionId);
                if (!$workshopSession) {
                    Log::warning('Workshop session not found', ['workshop_session_id' => $workshopSessionId, 'session_id' => $sessionId]);
                    return null;
                }
                $schoolId = $workshopSession->school_id;
            }
        }
        if ($sessionType === 'resource_program') {
            $resourceProgramId = $item['price_data']['product_data']['metadata']['resource_program_id'] ?? $item['metadata']['resource_program_id'] ?? null;
            if ($resourceProgramId) {
                $resourceProgram = \App\Models\ResourceProgram::find($resourceProgramId);
                if (!$resourceProgram) {
                    Log::warning('Resource program not found', ['resource_program_id' => $resourceProgramId, 'session_id' => $sessionId]);
                    return null;
                }
                // Resource programda schoolId zorunlu olmayabilir, ek bilgi gerekiyorsa buraya eklenebilir.
            }
        }

        // log the program id, workshop session id, training camp session id, resource program id, and school id
        Log::info('createPayments', [
            'program_id' => $programId ?? null,
            'workshop_session_id' => $workshopSessionId ?? null,
            'training_camp_session_id' => $trainingCampSessionId ?? null,
            'resource_program_id' => $resourceProgramId ?? null,
            'school_id' => $schoolId ?? null,
        ]);

        return [
            'program_id' => $programId,
            'workshop_session_id' => $workshopSessionId ?? null,
            'training_camp_session_id' => $trainingCampSessionId ?? null,
            'resource_program_id' => $resourceProgramId ?? null,
            'school_id' => $schoolId ?? null,
        ];
    }

    /**
     * Match payment plans to the payment data for a given line item
     */
    private function matchPaymentPlan(array $paymentData, array $paymentPlans): ?array
    {
        foreach ($paymentPlans as $plan) {
            if ((int) ($plan['program_id'] ?? 0) !== (int) ($paymentData['program_id'] ?? 0)) {
                continue;
            }

            $planSessionId = $plan['session_id'] ?? null;

            $trainingCampSessionId = $paymentData['training_camp_session_id'] ?? null;
            $workshopSessionId = $paymentData['workshop_session_id'] ?? null;
            $resourceProgramId = $paymentData['resource_program_id'] ?? null;

            if ($planSessionId) {
                if ($trainingCampSessionId && (string) $planSessionId === (string) $trainingCampSessionId) {
                    return $plan;
                }
                if ($workshopSessionId && (string) $planSessionId === (string) $workshopSessionId) {
                    return $plan;
                }
                if ($resourceProgramId && (string) $planSessionId === (string) $resourceProgramId) {
                    return $plan;
                }
                continue;
            }

            return $plan;
        }

        return null;
    }

    /**
     * Create workshop registration and send email with unique code
     */
    public function createRegistrationAndSendEmail(Payment $payment): void
    {
        try {
            // Create registration record
            $registration = UserWorkshopRegistration::create([
                'user_id' => $payment->user_id,
                'program_id' => $payment->program_id,
                'workshop_session_id' => $payment->workshop_session_id,
                'guest_email' => $payment->guest_email,
                'guest_name' => $payment->guest_name,
                'payment_id' => $payment->id
            ]);

            // Send email with unique code
            $recipientEmail = $payment->user_id ? $payment->user->email : $payment->guest_email;

            if ($recipientEmail) {
                Mail::to($recipientEmail)->send(new WorkshopRegistrationMail($registration));
                Log::info('Registration email sent', [
                    'registration_id' => $registration->id,
                    'email' => $recipientEmail,
                ]);
            } else {
                Log::warning('No email address found for registration', [
                    'registration_id' => $registration->id,
                    'payment_id' => $payment->id,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to create registration or send email', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Create training camp registration and send email with unique code
     */
    public function createTrainingCampRegistrationAndSendEmail(Payment $payment): void
    {
        try {
            // Create registration record
            $registration = UserTrainingCampRegistration::create([
                'user_id' => $payment->user_id,
                'program_id' => $payment->program_id,
                'training_camp_session_id' => $payment->training_camp_session_id,
                'guest_email' => $payment->guest_email,
                'guest_name' => $payment->guest_name,
                'payment_id' => $payment->id
            ]);

            // Send email with unique code
            $recipientEmail = $payment->user_id ? $payment->user->email : $payment->guest_email;

            if ($recipientEmail) {
                Mail::to($recipientEmail)->send(new TrainingCampRegistrationMail($registration));
                Log::info('Training camp registration email sent', [
                    'registration_id' => $registration->id,
                    'email' => $recipientEmail,
                ]);
            } else {
                Log::warning('No email address found for training camp registration', [
                    'registration_id' => $registration->id,
                    'payment_id' => $payment->id,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to create training camp registration or send email', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Create resource program registration and send email with unique code
     */
    public function createResourceProgramRegistrationAndSendEmail(Payment $payment): void
    {
        try {
            $registration = \App\Models\UserResourceProgramRegistration::create([
                'user_id' => $payment->user_id,
                'resource_program_id' => $payment->resource_program_id,
                'guest_email' => $payment->guest_email,
                'guest_name' => $payment->guest_name,
                'payment_id' => $payment->id
            ]);

            $recipientEmail = $payment->user_id ? $payment->user->email : $payment->guest_email;
            if ($recipientEmail) {
                \Mail::to($recipientEmail)->send(new \App\Mail\ResourceProgramRegistrationMail($registration));
                \Log::info('Resource program registration email sent', [
                    'registration_id' => $registration->id,
                    'email' => $recipientEmail,
                ]);
            } else {
                \Log::warning('No email address found for resource program registration', [
                    'registration_id' => $registration->id,
                    'payment_id' => $payment->id,
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Failed to create resource program registration or send email', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
