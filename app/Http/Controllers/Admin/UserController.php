<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = User::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->withCount(['payments', 'interestedPrograms'])
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'payments_count' => $user->payments_count,
                'interested_programs_count' => $user->interested_programs_count,
                'total_spent' => $user->total_spent,
                'is_influencer' => $user->is_influencer,
                'referred_count' => $user->referred_count,
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:user,admin,school,dev',
            'is_active' => 'required|boolean',
            'school_name' => 'nullable|string|max:255', // New validation rule for school_name
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Hash is handled by the User model's password cast
            'role' => $request->role,
            'is_active' => $request->is_active,
            'school_name' => $request->school_name, // Store school_name
            'email_verified_at' => now(), // Auto-verify admin created users
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): Response
    {
        $user->load([
            'interestedPrograms',
            'payments.program:id,title,price'
        ]);

        return Inertia::render('Admin/Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'total_spent' => $user->total_spent,
                'is_influencer' => $user->is_influencer,
                'referred_count' => $user->referred_count,
                'school_name' => $user->school_name, // Include school_name
                'interested_programs' => $user->interestedPrograms->map(function ($interestedProgram) {
                    return [
                        'id' => $interestedProgram->id,
                        'title' => $interestedProgram->title,
                        'price' => $interestedProgram->price,
                        'notes' => $interestedProgram->notes,
                    ];
                }),
                'payments' => $user->payments->map(fn($payment) => [
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
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
                'is_influencer' => $user->is_influencer,
                'referred_count' => $user->referred_count,
                'school_name' => $user->school_name, // Include school_name
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:user,admin,school,dev',
            'is_active' => 'required|boolean',
            'school_name' => 'nullable|string|max:255' // Validation rule for school_name
        ]);

        $user->update($request->only(['name', 'email', 'role', 'is_active', 'school_name']));

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Tag user as an influencer
     */
    public function tagAsInfluencer(User $user): RedirectResponse
    {
        $user->update([
            'is_influencer' => true,
        ]);

        return redirect()->back()
            ->with('success', "User '{$user->name}' has been tagged as an influencer.");
    }

    /**
     * Remove influencer tag from user
     */
    public function removeInfluencerTag(User $user): RedirectResponse
    {
        $user->update([
            'is_influencer' => false,
        ]);

        return redirect()->back()
            ->with('success', "Influencer tag has been removed from '{$user->name}'.");
    }

    public function testEmail()
    {
        Mail::to('anipreciousebuka@gmail.com')->send(new TestEmail());
        return "Test email sent successfully.";
    }
}
