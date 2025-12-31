<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiscountCode;
use App\Services\DiscountService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class DiscountCodeController extends Controller
{
    public function __construct(
        private DiscountService $discountService
    ) {}
    /**
     * Display a listing of discount codes
     */
    public function index(Request $request): Response
    {
        $query = DiscountCode::query()->with(['creator', 'redemptions']);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $status = $request->get('status');
            switch ($status) {
                case 'active':
                    $query->valid();
                    break;
                case 'inactive':
                    $query->where('is_active', false);
                    break;
                case 'expired':
                    $query->where('expires_at', '<', now())
                          ->where('is_active', true);
                    break;
                case 'scheduled':
                    $query->where('starts_at', '>', now())
                          ->where('is_active', true);
                    break;
            }
        }

        $discountCodes = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->through(fn($code) => [
                'id' => $code->id,
                'code' => $code->code,
                'name' => $code->name,
                'type' => $code->type,
                'formatted_value' => $code->formatted_value,
                'used_count' => $code->used_count,
                'max_redemptions' => $code->max_redemptions,
                'status' => $code->status,
                'created_at' => $code->created_at->format('Y-m-d H:i:s'),
            ]);

        return Inertia::render('Admin/DiscountCodes/Index', [
            'discountCodes' => $discountCodes,
            'filters' => $request->only(['search', 'status', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new discount code
     */
    public function create(): Response
    {
        return Inertia::render('Admin/DiscountCodes/Create');
    }

    /**
     * Store a newly created discount code
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:50|unique:discount_codes,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percentage,fixed_amount',
            'value' => 'required|numeric|min:0',
            'currency' => 'required_if:type,fixed_amount|string|size:3',
            'min_amount' => 'nullable|numeric|min:0',
            'max_redemptions' => 'nullable|integer|min:1',
            'starts_at' => 'nullable|date|after_or_equal:now',
            'expires_at' => 'nullable|date|after:starts_at',
            'is_active' => 'boolean',
        ]);

        try {
            $data = $validatedData;
            $data['code'] = strtoupper($data['code']);
            $data['created_by'] = Auth::id();
            $data['currency'] = $data['currency'] ?? 'USD';

            if ($data['type'] === 'percentage' && $data['value'] > 100) {
                return back()->withErrors(['value' => 'Percentage discount cannot exceed 100%.']);
            }

            $discountCode = $this->discountService->createDiscountCode($data);

            return redirect()->route('admin.discount-codes.index')
                ->with('success', "Discount code '{$discountCode->code}' created successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified discount code
     */
    public function show(DiscountCode $discountCode): Response
    {
        $discountCode->load(['creator', 'redemptions']);

        return Inertia::render('Admin/DiscountCodes/Show', [
            'discountCode' => [
                'id' => $discountCode->id,
                'code' => $discountCode->code,
                'name' => $discountCode->name,
                'description' => $discountCode->description,
                'type' => $discountCode->type,
                'value' => $discountCode->value,
                'formatted_value' => $discountCode->formatted_value,
                'currency' => $discountCode->currency,
                'min_amount' => $discountCode->min_amount,
                'max_redemptions' => $discountCode->max_redemptions,
                'used_count' => $discountCode->used_count,
                'starts_at' => $discountCode->starts_at?->format('Y-m-d\TH:i'),
                'expires_at' => $discountCode->expires_at?->format('Y-m-d\TH:i'),
                'is_active' => $discountCode->is_active,
                'status' => $discountCode->status,
                'stripe_coupon_id' => $discountCode->stripe_coupon_id,
                'stripe_promotion_code_id' => $discountCode->stripe_promotion_code_id,
                'creator' => $discountCode->creator ? [
                    'id' => $discountCode->creator->id,
                    'name' => $discountCode->creator->name,
                ] : null,
                'created_at' => $discountCode->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $discountCode->updated_at->format('Y-m-d H:i:s'),
            ],
            'redemptions' => $discountCode->redemptions->map(fn($redemption) => [
                'id' => $redemption->id,
                'user_email' => $redemption->user_email,
                'amount_discounted' => $redemption->amount_discounted,
                'stripe_session_id' => $redemption->stripe_session_id,
                'created_at' => $redemption->created_at->format('Y-m-d H:i:s'),
            ])->toArray()
        ]);
    }

    /**
     * Show the form for editing the specified discount code
     */
    public function edit(DiscountCode $discountCode): Response
    {
        return Inertia::render('Admin/DiscountCodes/Edit', [
            'discountCode' => [
                'id' => $discountCode->id,
                'code' => $discountCode->code,
                'name' => $discountCode->name,
                'description' => $discountCode->description,
                'type' => $discountCode->type,
                'value' => $discountCode->value,
                'currency' => $discountCode->currency,
                'min_amount' => $discountCode->min_amount,
                'max_redemptions' => $discountCode->max_redemptions,
                'starts_at' => $discountCode->starts_at?->format('Y-m-d\TH:i'),
                'expires_at' => $discountCode->expires_at?->format('Y-m-d\TH:i'),
                'is_active' => $discountCode->is_active,
                'used_count' => $discountCode->used_count,
            ]
        ]);
    }

    /**
     * Update the specified discount code
     */
    public function update(Request $request, DiscountCode $discountCode): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'max_redemptions' => 'nullable|integer|min:1', // The max_redemptions field has been added.
        ]);

        try {
            $this->discountService->updateDiscountCode($discountCode, $validatedData);

            return redirect()->route('admin.discount-codes.index')
                ->with('success', "Discount code updated successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified discount code from storage (permanently delete)
     */
    public function destroy(DiscountCode $discountCode): RedirectResponse
    {
        try {
            // Delete from Stripe first
            $this->discountService->deleteDiscountCode($discountCode);
            
            // Delete from database
            $discountCode->delete();

            return redirect()->route('admin.discount-codes.index')
                ->with('success', "Discount code deleted permanently!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Deactivate the specified discount code (soft disable)
     */
    public function deactivate(DiscountCode $discountCode): RedirectResponse
    {
        try {
            // Deactivate in Stripe
            $this->discountService->deactivateDiscountCode($discountCode);
            
            // Update status in database
            $discountCode->update([
                'is_active' => false,
                'expires_at' => now()
            ]);

            return redirect()->route('admin.discount-codes.index')
                ->with('success', "Discount code deactivated successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Activate the specified discount code (re-enable)
     */
    public function activate(DiscountCode $discountCode): RedirectResponse
    {
        try {
            // Reactivate in Stripe
            $this->discountService->activateDiscountCode($discountCode);
            
            // Update status in database
            $discountCode->update([
                'is_active' => true,
                'expires_at' => $discountCode->original_expires_at ?? null // Restore original expiry if it had one
            ]);

            return redirect()->route('admin.discount-codes.index')
                ->with('success', "Discount code activated successfully!");

        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
