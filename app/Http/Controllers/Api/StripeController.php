<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StripeService;
use App\Models\Payment;
use App\Models\UserWorkshopRegistration;
use App\Models\UserTrainingCampRegistration;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class StripeController extends Controller
{
    public function __construct(
        private StripeService $stripeService
    ) {}

    /**
     * Create checkout session
     */
    public function createCheckoutSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.price_data' => 'required|array',
            'items.*.price_data.currency' => 'required|string',
            'items.*.price_data.product_data' => 'required|array',
            'items.*.price_data.product_data.name' => 'required|string',
            'items.*.price_data.product_data.metadata.program_id' => 'required|integer|exists:programs,id',
            'items.*.price_data.unit_amount' => 'required|integer|min:1',
            'items.*.quantity' => 'required|integer|min:1',
            'metadata' => 'sometimes|array',
            'sesson_type' => 'sometimes|string',
            'payment_plans' => 'sometimes|array',
            'payment_plans.*.program_id' => 'required_with:payment_plans|integer|exists:programs,id',
            'payment_plans.*.session_id' => 'nullable|string',
            'payment_plans.*.type' => 'required_with:payment_plans|string|max:255',
            'payment_plans.*.deposit_amount' => 'required_with:payment_plans|numeric|min:0',
            'payment_plans.*.balance_amount' => 'nullable|numeric|min:0',
            'payment_plans.*.total_amount' => 'required_with:payment_plans|numeric|min:0',
            'payment_plans.*.balance_due_date' => 'nullable|date',
            'payment_plans.*.metadata' => 'nullable|array',
            // Guest checkout information
            'guest_info' => 'sometimes|array',
            'guest_info.name' => 'required_with:guest_info|string|min:2',
            'guest_info.email' => 'required_with:guest_info|email',
            'guest_info.phone' => 'required_with:guest_info|string',
            'guest_info.school_name' => 'required_with:guest_info|string',
            // Parent information (for both authenticated and guest users)
            'parent_info' => 'nullable|array',
            'parent_info.parent_name' => 'nullable|string|max:255',
            'parent_info.parent_email' => 'nullable|string|email|max:255',
            'parent_info.parent_phone_number' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }
        $formData = $request->all();
        logger()->info('formData', [$formData]);

        try {
            $user = Auth::user();
            logger()->info('user', [$user]);
            $items = $formData['items'];
            // $metadata = $formData['metadata'] ?? [];
            $guestInfo = $formData['guest_info'] ?? null;
            $parentInfo = $formData['parent_info'] ?? [];
            $paymentPlans = $formData['payment_plans'] ?? [];

            // If no authenticated user but guest info provided, handle as guest checkout
            if ($user) {
                $session = $this->stripeService->createCheckoutSession($items, $user, $parentInfo, $paymentPlans);
            } elseif (!$user && $guestInfo) {
                $session = $this->stripeService->createGuestCheckoutSession($items, $guestInfo, $parentInfo, $paymentPlans);
            } else {
                return response()->json([
                    'message' => 'Authentication required or guest information must be provided',
                ], 401);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $session->id,
                    'url' => $session->url,
                    'payment_status' => $session->payment_status,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Checkout session creation failed', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create checkout session',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }

    /**
     * Verify payment
     */
    public function verifyPayment(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'session_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        logger()->info('Payment verification request', [$request->all()]);

        try {
            $sessionId = $request->input('session_id');
            $result = $this->stripeService->verifyPayment($sessionId);

            return response()->json([
                'success' => $result['verified'],
                'data' => $result
            ]);
        } catch (\Exception $e) {
            Log::error('Payment verification failed', [
                'error' => $e->getMessage(),
                'session_id' => $request->input('session_id'),
            ]);

            return response()->json([
                'success' => false,
                'verified' => false,
                'payment_status' => 'failed',
                'error' => config('app.debug') ? $e->getMessage() : 'Payment verification failed',
            ], 500);
        }
    }

    /**
     * Get payment status by session ID
     */
    public function getPaymentStatus(string $sessionId): JsonResponse
    {
        try {
            $payments = Payment::where('stripe_session_id', $sessionId)->get();

            if ($payments->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'verified' => false,
                    'payment_status' => 'failed',
                    'error' => 'Payment records not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'verified' => true,
                'data' => [
                    'payment_status' => $payments->first()->status,
                    'payment_ids' => $payments->pluck('id')->toArray(),
                    'customer_email' => $payments->first()->user->email,
                    'amount_total' => $payments->sum('amount') * 100, // Convert to cents
                    'currency' => $payments->first()->currency,
                    'metadata' => $payments->first()->metadata,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Get payment status failed', [
                'error' => $e->getMessage(),
                'session_id' => $sessionId,
            ]);

            return response()->json([
                'success' => false,
                'verified' => false,
                'payment_status' => 'failed',
                'error' => config('app.debug') ? $e->getMessage() : 'Failed to get payment status',
            ], 500);
        }
    }

    // Generate and send entry code for payments (paid) within a specified time period
    public function generateAndSendEntryCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
            $endDate = Carbon::parse($request->input('end_date'))->endOfDay();

            $payments = Payment::where('status', 'paid')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->get();

            foreach ($payments as $payment) {
                if ($payment->workshop_session_id) {
                    $this->stripeService->createRegistrationAndSendEmail($payment);
                } elseif ($payment->training_camp_session_id) {
                    $this->stripeService->createTrainingCampRegistrationAndSendEmail($payment);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Entry codes generated and sent successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Generate and send entry code failed', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate and send entry code',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }
}
