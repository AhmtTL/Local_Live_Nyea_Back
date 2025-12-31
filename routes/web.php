<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\InfluencersController as AdminInfluencersController;
use App\Http\Controllers\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\Admin\ReferralController as AdminReferralController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\WorkshopSessionController as AdminWorkshopSessionController;
use App\Http\Controllers\Admin\TrainingCampSessionController as AdminTrainingCampSessionController;
use App\Http\Controllers\Admin\DiscountCodeController as AdminDiscountCodeController;
use App\Http\Controllers\Admin\WorkshopRegistrationController as AdminWorkshopRegistrationController;
use App\Http\Controllers\Admin\TrainingCampRegistrationController as AdminTrainingCampRegistrationController;
use App\Http\Controllers\Admin\RegistrationController as AdminRegistrationController;
use App\Http\Controllers\Admin\ImageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        // Redirect dev users to programs page
        if ($user->isDev()) {
            return redirect()->route('admin.programs.index');
        }
        // Redirect school users to registrations page
        if ($user->isSchool()) {
            return redirect()->route('admin.registrations.index');
        }
        // If user is authenticated, redirect to dashboard
        return redirect()->route('dashboard');
    }
    // If not authenticated, redirect to login
    return redirect()->route('login');
});

Route::get('/test-email', [AdminUserController::class, 'testEmail']);

// redirect to admin.dashboard
Route::get('/dashboard', function () {
    $user = Auth::user();
    // Redirect dev users to programs page
    if ($user && $user->isDev()) {
        return redirect()->route('admin.programs.index');
    }
    // Redirect school users to registrations page
    if ($user && $user->isSchool()) {
        return redirect()->route('admin.registrations.index');
    }
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes - Protected by admin middleware
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // User Management
    Route::resource('users', AdminUserController::class);
    Route::post('users/{user}/tag-influencer', [AdminUserController::class, 'tagAsInfluencer'])->name('users.tag-influencer');
    Route::post('users/{user}/remove-influencer', [AdminUserController::class, 'removeInfluencerTag'])->name('users.remove-influencer');

    // Influencers Management
    Route::get('influencers', [AdminInfluencersController::class, 'index'])->name('influencers.index');
    Route::get('influencers/{influencer}', [AdminInfluencersController::class, 'show'])->name('influencers.show');
    Route::post('influencers/{influencer}/remove-influencer', [AdminInfluencersController::class, 'removeInfluencerTag'])->name('influencers.remove-influencer');

    // Program Management
    Route::resource('programs', AdminProgramController::class);

    // Referral Management
    Route::resource('referrals', AdminReferralController::class)->only(['index', 'show', 'store', 'destroy']);
    Route::get('referrals/form-data', [AdminReferralController::class, 'getFormData'])->name('referrals.form-data');

    // Workshop Session Management
    Route::resource('workshop-sessions', AdminWorkshopSessionController::class);
    Route::post('workshop-sessions/{workshopSession}/duplicate', [AdminWorkshopSessionController::class, 'duplicate'])
        ->name('workshop-sessions.duplicate');
    Route::post('workshop-sessions/{workshopSession}/toggle-publish', [AdminWorkshopSessionController::class, 'togglePublish'])
        ->name('workshop-sessions.toggle-publish');

    // Training Camp Session Management
    Route::resource('training-camp-sessions', AdminTrainingCampSessionController::class);
    Route::post('training-camp-sessions/{trainingCampSession}/duplicate', [AdminTrainingCampSessionController::class, 'duplicate'])
        ->name('training-camp-sessions.duplicate');
    Route::post('training-camp-sessions/{trainingCampSession}/toggle-publish', [AdminTrainingCampSessionController::class, 'togglePublish'])
        ->name('training-camp-sessions.toggle-publish');

    // Payment Management
    Route::get('payments', [AdminPaymentController::class, 'index'])->name('payments.index');
    Route::get('payments/export', [AdminPaymentController::class, 'export'])->name('payments.export');
    Route::get('payments/export-excel', [AdminPaymentController::class, 'exportExcel'])->name('payments.export-excel');
    Route::get('payments/{payment}', [AdminPaymentController::class, 'show'])->name('payments.show');
    Route::patch('payments/{payment}', [AdminPaymentController::class, 'update'])->name('payments.update');

    // Discount Code Management
    Route::resource('discount-codes', AdminDiscountCodeController::class);
    Route::post('discount-codes/{discountCode}/deactivate', [AdminDiscountCodeController::class, 'deactivate'])->name('discount-codes.deactivate');
    Route::post('discount-codes/{discountCode}/activate', [AdminDiscountCodeController::class, 'activate'])->name('discount-codes.activate');

    // Unified Registration Management
    Route::get('registrations', [AdminRegistrationController::class, 'index'])->name('registrations.index');
    Route::get('registrations/workshops/export', [AdminRegistrationController::class, 'exportWorkshops'])->name('registrations.workshops.export');
    Route::get('registrations/training-camps/export', [AdminRegistrationController::class, 'exportTrainingCamps'])->name('registrations.training-camps.export');
    Route::post('registrations/workshops/{registration}/check-in', [AdminRegistrationController::class, 'checkInWorkshop'])->name('registrations.workshops.check-in');
    Route::post('registrations/workshops/{registration}/uncheck-in', [AdminRegistrationController::class, 'uncheckInWorkshop'])->name('registrations.workshops.uncheck-in');
    Route::post('registrations/training-camps/{registration}/check-in', [AdminRegistrationController::class, 'checkInTrainingCamp'])->name('registrations.training-camps.check-in');
    Route::post('registrations/training-camps/{registration}/uncheck-in', [AdminRegistrationController::class, 'uncheckInTrainingCamp'])->name('registrations.training-camps.uncheck-in');

    // Legacy Workshop Registration Management (kept for backward compatibility)
    Route::get('workshop-registrations', [AdminWorkshopRegistrationController::class, 'index'])->name('workshop-registrations.index');
    Route::get('workshop-registrations/export', [AdminWorkshopRegistrationController::class, 'export'])->name('workshop-registrations.export');
    Route::get('workshop-registrations/export-excel', [AdminWorkshopRegistrationController::class, 'exportExcel'])->name('workshop-registrations.export-excel');
    Route::post('workshop-registrations/{registration}/check-in', [AdminWorkshopRegistrationController::class, 'checkIn'])->name('workshop-registrations.check-in');
    Route::post('workshop-registrations/{registration}/uncheck-in', [AdminWorkshopRegistrationController::class, 'uncheckIn'])->name('workshop-registrations.uncheck-in');

    // Training Camp Registration Management
    Route::get('training-camp-registrations', [AdminTrainingCampRegistrationController::class, 'index'])->name('training-camp-registrations.index');
    Route::get('training-camp-registrations/export', [AdminTrainingCampRegistrationController::class, 'export'])->name('training-camp-registrations.export');
    Route::get('training-camp-registrations/export-excel', [AdminTrainingCampRegistrationController::class, 'exportExcel'])->name('training-camp-registrations.export-excel');
    Route::post('training-camp-registrations/{registration}/check-in', [AdminTrainingCampRegistrationController::class, 'checkIn'])->name('training-camp-registrations.check-in');
    Route::post('training-camp-registrations/{registration}/uncheck-in', [AdminTrainingCampRegistrationController::class, 'uncheckIn'])->name('training-camp-registrations.uncheck-in');

    // Image Management
    Route::post('images/upload', [ImageController::class, 'upload'])
        ->name('images.upload')
        ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);
    Route::delete('images/delete', [ImageController::class, 'delete'])->name('images.delete');
    Route::get('images/test', [ImageController::class, 'test'])->name('images.test')->withoutMiddleware(['auth', 'verified', 'admin']);
});

require __DIR__ . '/auth.php';
