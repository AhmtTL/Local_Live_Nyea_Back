<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\ReferralController;
use App\Http\Controllers\Api\StripeController;
use App\Http\Controllers\Api\TrainingCampSessionController;
use App\Http\Controllers\Api\WorkshopSessionController;
use App\Http\Controllers\Api\StripeWebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::prefix('v1')->group(function () {
    // Authentication routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Guest to user conversion routes
    Route::post('/convert-guest-to-user', [AuthController::class, 'convertGuestToUser']);
    Route::post('/check-guest-purchases', [AuthController::class, 'checkGuestPurchases']);

    // Public program routes
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/programs/featured', [ProgramController::class, 'featured']);
    Route::get('/programs/{identifier}', [ProgramController::class, 'show']);
    Route::get('/programs/category/{category}', [ProgramController::class, 'byCategory']);

    // Public category routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{identifier}', [CategoryController::class, 'show']);

    // Public workshop session routes
    Route::get('/workshop-sessions', [WorkshopSessionController::class, 'index']);
    Route::get('/workshop-sessions/{workshopSession}', [WorkshopSessionController::class, 'show']);
    Route::get('/programs/{programSlug}/workshop-sessions', [WorkshopSessionController::class, 'byProgram']);

    // Public training camp session routes
    Route::get('/training-camp-sessions', [TrainingCampSessionController::class, 'index']);
    Route::get('/training-camp-sessions/{trainingCampSession}', [TrainingCampSessionController::class, 'show']);
    Route::get('/training-camp-sessions/programs/{programSlug}', [TrainingCampSessionController::class, 'byProgram']);

    // Contact form
    Route::post('/contact', [ContactController::class, 'store']);

    // Store referral code in cache
    Route::post('/store-ref-code', [ReferralController::class, 'storeReferralCode']);

    // Stripe payment routes (support both authenticated and guest users)
    Route::prefix('stripe')->group(function () {
        Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
        Route::post('/verify-payment', [StripeController::class, 'verifyPayment']);
        Route::get('/payment-status/{sessionId}', [StripeController::class, 'getPaymentStatus']);
        Route::post('/generate-and-send-entry-code', [StripeController::class, 'generateAndSendEntryCode']);
        Route::post('/webhook', [StripeWebhookController::class, 'handle']);
    });
});

// Protected routes (authentication required)
Route::prefix('v1')->middleware('auth:api')->group(function () {
    // User authentication and profile
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/profile/password', [AuthController::class, 'changePassword']);
    Route::post('/user/stripe/create-checkout-session', [StripeController::class, 'createCheckoutSession']);

    // Workshop session booking (requires authentication)
    Route::post('/workshop-sessions/{workshopSession}/book', [WorkshopSessionController::class, 'book']);

    // Training camp session booking (requires authentication)
    Route::post('/training-camp-sessions/{trainingCampSession}/book', [TrainingCampSessionController::class, 'book']);

    Route::get('/user-programs', [ProgramController::class, 'userPrograms']);

    Route::get('/user-referrals', [ReferralController::class, 'userReferrals']);
});
