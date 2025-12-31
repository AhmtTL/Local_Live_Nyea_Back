<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\User;
use App\Models\Program;
use App\Services\DiscountService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReferralController extends Controller
{
    public function __construct(
        private DiscountService $discountService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $referrals = Referral::with(['user', 'school'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhereHas('school', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('referral_code', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        // Get form data for the create modal
        $influencers = User::where('is_influencer', true)
            ->select('id', 'name', 'email')
            ->get();

        $schools = \App\Models\School::orderBy('name')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Referrals/Index', [
            'referrals' => $referrals,
            'filters' => $request->only(['search']),
            'formData' => [
                'influencers' => $influencers,
                'schools' => $schools,
            ],
        ]);
    }

    /**
     * Get form data for creating referrals (JSON API endpoint).
     */
    public function getFormData()
    {
        $influencers = User::where('is_influencer', true)
            ->select('id', 'name', 'email')
            ->get();

        $schools = \App\Models\School::orderBy('name')
            ->select('id', 'name')
            ->get();

        return response()->json([
            'influencers' => $influencers,
            'schools' => $schools,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $influencers = User::where('is_influencer', true)
            ->select('id', 'name', 'email')
            ->get();

        $schools = \App\Models\School::orderBy('name')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Referrals/Create', [
            'influencers' => $influencers,
            'schools' => $schools,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Referral $referral)
    {
        $referral->load([
            'user',
            'school',
            'conversions' => function ($query) {
                $query->with(['payment', 'program'])->latest();
            }
        ]);

        return Inertia::render('Admin/Referrals/Show', [
            'referral' => $referral,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'school_id' => 'required|exists:schools,id',
            'discount_type' => 'required|in:percentage,fixed_amount',
            'discount_value' => 'required|numeric|min:0',
            'discount_currency' => 'required_if:discount_type,fixed_amount|string|size:3',
            'starts_at' => 'nullable|date|after_or_equal:now',
            'expires_at' => 'nullable|date|after:starts_at',
        ]);

        // Validate discount value based on type
        if ($request->discount_type === 'percentage' && $request->discount_value > 100) {
            return back()->withErrors(['discount_value' => 'Percentage discount cannot exceed 100%.']);
        }

        // Check if referral already exists for this user-school combination
        $existingReferral = Referral::where('user_id', $request->user_id)
            ->where('school_id', $request->school_id)
            ->first();

        if ($existingReferral) {
            return back()->withErrors(['error' => 'Referral already exists for this user and school combination.']);
        }

        $findUser = User::find($request->user_id);
        $school = \App\Models\School::find($request->school_id);
        
        // Create referral link targeting the school
        $refCode = 'INF' . strtoupper(substr(md5(uniqid()), 0, 10));
        $referralLink = config('app.frontend_url') . '/workshop-booking/leadership-negotiation-communication' . '?ref=' . $refCode. '&schid=' . $school->id;

        $referral = Referral::create([
            'user_id' => $request->user_id,
            'school_id' => $request->school_id,
            'referral_code' => $refCode,
            'referral_link' => $referralLink
        ]);

        // Create corresponding discount code
        try {
            $discountData = [
                'code' => $refCode,
                'name' => "Referral Discount",
                'description' => "Discount code for referral by {$findUser->name} targeting {$school->name}",
                'type' => $request->discount_type,
                'value' => $request->discount_value,
                'currency' => $request->discount_currency ?? 'USD',
                'starts_at' => $request->starts_at,
                'expires_at' => $request->expires_at,
                'is_active' => true,
                'created_by' => Auth::id(),
                'referral_id' => $referral->id,
            ];

            $this->discountService->createDiscountCode($discountData);
        } catch (\Exception $e) {
            // If discount code creation fails, still keep the referral but log the error
            Log::error('Failed to create discount code for referral', [
                'referral_id' => $referral->id,
                'error' => $e->getMessage()
            ]);
        }

        return redirect()->route('admin.referrals.index')
            ->with('success', 'Referral created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Referral $referral)
    {
        $referral->delete();

        return back()->with('success', 'Referral deleted successfully.');
    }
}
