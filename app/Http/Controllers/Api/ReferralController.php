<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ReferralController extends Controller
{
    /**
     * Store referral code in cache using encrypted identifier
     */
    public function storeReferralCode(Request $request)
    {
        $request->validate([
            'ref_code' => 'required|string|max:255',
            'school_id' => 'sometimes|integer|exists:schools,id'
        ]);

        // Store in cache using IP address as key for 1 hour
        $cacheKey = 'ref_code_' . $request->ip();
        $referralData = [
            'ref_code' => $request->ref_code,
            'school_id' => $request->school_id ?? null
        ];

        cache([$cacheKey => $referralData], now()->addHour());

        Log::info('Stored referral code in cache', [
            'cache_key' => $cacheKey,
            'ref_code' => $request->ref_code,
            'school_id' => $request->school_id ?? null,
            'client_ip' => $request->ip()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Referral code stored successfully',
            'ref_code' => $request->ref_code,
            'school_id' => $request->school_id ?? null
        ]);
    }

    /**
     * Retrieve referral information for authenticated user
     */
    public function userReferrals(Request $request)
    {
        $user = Auth::user();
        $referrals = Referral::with(['user', 'school', 'conversions'])
            ->where('user_id', $user->id)
            ->get();
        return response()->json([
            'success' => true,
            'referrals' => $referrals
        ]);
    }
}
