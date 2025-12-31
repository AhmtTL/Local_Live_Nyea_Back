<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255|unique:users',
            'role' => 'required|string|in:student,teacher,admin',
            'grade' => 'required|string|max:255',
            'school_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'password' => ['required', 'confirmed', 'min:8'],
            'parent_name' => 'nullable|string|max:255',
            'parent_email' => 'nullable|string|email|max:255',
            'parent_phone_number' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        $data = $validator->validated();
        $data['password'] = Hash::make($data['password']);
        $data['is_active'] = true;

        $user = User::create($data);

        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is inactive'
            ], 403);
        }

        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'success' => true,
            'message' => 'Login was successful',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ]
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Get user profile
     */
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => new UserResource($user),
            ]
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:255|unique:users,phone,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }
        $data = $validator->validated();

        $user->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => [
                'user' => new UserResource($user),
            ]
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->update([
            'password' => $request->password
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }

    /**
     * Convert guest purchases to user account
     * This allows guest users to create accounts later and merge their purchase data
     */
    public function convertGuestToUser(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255|unique:users',
            'role' => 'required|string|in:student,teacher,admin',
            'password' => ['required', 'confirmed', 'min:8'],
            'guest_email' => 'required|string|email|max:255', // Email used for guest purchases
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        $guestEmail = $data['guest_email'];
        unset($data['guest_email']);

        try {
            DB::beginTransaction();

            // Check if there are any guest payments with this email
            $guestPayments = Payment::whereNull('user_id')
                ->where(function ($query) use ($guestEmail) {
                    $query->whereJsonContains('metadata->guest_email', $guestEmail)
                        ->orWhereJsonContains('metadata->guest_info->email', $guestEmail);
                })
                ->get();

            if ($guestPayments->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No guest purchases found for the provided email address'
                ], 404);
            }

            // Create the new user
            $data['password'] = Hash::make($data['password']);
            $data['is_active'] = true;
            $user = User::create($data);

            // Transfer guest payments to the new user
            $transferredCount = 0;
            foreach ($guestPayments as $payment) {
                $payment->update([
                    'user_id' => $user->id,
                    'metadata' => array_merge(
                        $payment->metadata ?? [],
                        [
                            'converted_from_guest' => true,
                            'conversion_date' => now()->toISOString(),
                            'original_guest_email' => $guestEmail,
                        ]
                    )
                ]);
                $transferredCount++;
            }

            DB::commit();

            // Generate token for the new user
            $token = $user->createToken('API Token')->accessToken;

            return response()->json([
                'success' => true,
                'message' => "Account created successfully! {$transferredCount} guest purchase(s) have been transferred to your account.",
                'data' => [
                    'user' => new UserResource($user),
                    'token' => $token,
                    'token_type' => 'Bearer',
                    'transferred_purchases' => $transferredCount,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to create account and transfer purchases. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Check if guest purchases exist for an email
     */
    public function checkGuestPurchases(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $email = $request->email;

        // Check for guest payments
        $guestPayments = Payment::whereNull('user_id')
            ->where(function ($query) use ($email) {
                $query->whereJsonContains('metadata->guest_email', $email)
                    ->orWhereJsonContains('metadata->guest_info->email', $email);
            })
            ->with('program') // Load program details
            ->get();

        $purchasesSummary = $guestPayments->map(function ($payment) {
            return [
                'id' => $payment->id,
                'program_name' => $payment->program->title ?? 'Unknown Program',
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'status' => $payment->status,
                'purchase_date' => $payment->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'has_guest_purchases' => $guestPayments->isNotEmpty(),
                'purchases_count' => $guestPayments->count(),
                'total_amount' => $guestPayments->sum('amount'),
                'purchases' => $purchasesSummary,
            ]
        ]);
    }
}
