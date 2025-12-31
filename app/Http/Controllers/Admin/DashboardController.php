<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Program;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        $user = Auth::user();

        // Redirect school users to registrations page
        if ($user && $user->isSchool()) {
            return redirect()->route('admin.registrations.index');
        }

        // Redirect dev users to programs page (they can't access dashboard)
        if ($user && $user->isDev()) {
            return redirect()->route('admin.programs.index');
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_programs' => Program::count(),
                'total_payments' => Payment::count(),
                'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
                'pending_payments' => Payment::where('status', 'pending')->count(),
                'failed_payments' => Payment::where('status', 'failed')->count(),
            ],
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'created_at']),
            'recent_payments' => Payment::with(['user:id,name,email', 'program:id,title'])
                ->select(['id', 'user_id', 'program_id', 'amount', 'status', 'created_at', 'guest_name', 'guest_email'])
                ->latest()
                ->take(5)
                ->get(),
            'revenue_by_program' => Payment::with('program:id,title')
                ->where('status', 'paid')
                ->selectRaw('program_id, SUM(amount) as total_revenue, COUNT(*) as total_sales')
                ->groupBy('program_id')
                ->orderBy('total_revenue', 'desc')
                ->take(5)
                ->get(),
        ]);
    }
}
