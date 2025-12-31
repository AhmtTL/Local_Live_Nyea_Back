<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InfluencersController extends Controller
{
    /**
     * Display a listing of influencers
     */
    public function index(Request $request): Response
    {
        $query = User::where('is_influencer', true);

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('referral_code', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('is_active')) {
            $query->where('is_active', $request->get('is_active'));
        }

        // Filter by date range
        if ($request->filled('created_at_from')) {
            $query->whereDate('created_at', '>=', $request->get('created_at_from'));
        }
        if ($request->filled('created_at_to')) {
            $query->whereDate('created_at', '<=', $request->get('created_at_to'));
        }

        $influencers = $query->withCount(['payments', 'interestedPrograms'])
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'referral_code' => $user->referral_code,
                'referred_count' => $user->referred_count,
                'created_at' => $user->created_at,
                'payments_count' => $user->payments_count,
                'interested_programs_count' => $user->interested_programs_count,
                'total_spent' => $user->total_spent,
                'is_active' => $user->is_active,
            ]);

        return Inertia::render('Admin/Influencers/Index', [
            'influencers' => $influencers,
            'filters' => $request->only(['search', 'is_active', 'created_at_from', 'created_at_to']),
        ]);
    }

    /**
     * Display the specified influencer
     */
    public function show(User $influencer): Response
    {
        // Ensure the user is actually an influencer
        if (!$influencer->is_influencer) {
            abort(404, 'User is not an influencer');
        }

        $influencer->load([
            'interestedPrograms',
            'payments.program:id,title,price'
        ]);

        return Inertia::render('Admin/Influencers/Show', [
            'influencer' => [
                'id' => $influencer->id,
                'name' => $influencer->name,
                'email' => $influencer->email,
                'referral_code' => $influencer->referral_code,
                'referred_count' => $influencer->referred_count,
                'email_verified_at' => $influencer->email_verified_at,
                'created_at' => $influencer->created_at,
                'total_spent' => $influencer->total_spent,
                'is_active' => $influencer->is_active,
                'interested_programs' => $influencer->interestedPrograms->map(function ($interestedProgram) {
                    return [
                        'id' => $interestedProgram->id,
                        'title' => $interestedProgram->title,
                        'price' => $interestedProgram->price,
                        'notes' => $interestedProgram->notes,
                    ];
                }),
                'payments' => $influencer->payments->map(fn($payment) => [
                    'id' => $payment->id,
                    'program' => $payment->program,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'stripe_payment_intent_id' => $payment->stripe_payment_intent_id,
                    'paid_at' => $payment->paid_at,
                    'created_at' => $payment->created_at,
                    'notes' => $payment->notes,
                ]),
            ],
        ]);
    }

    /**
     * Remove influencer tag from user
     */
    public function removeInfluencerTag(User $influencer): \Illuminate\Http\RedirectResponse
    {
        // Ensure the user is actually an influencer
        if (!$influencer->is_influencer) {
            abort(404, 'User is not an influencer');
        }

        $influencer->update([
            'is_influencer' => false,
        ]);

        return redirect()->route('admin.influencers.index')
            ->with('success', "Influencer tag has been removed from '{$influencer->name}'.");
    }
}
