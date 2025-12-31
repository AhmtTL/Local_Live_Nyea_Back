<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Program::query();
        $user = Auth::user();
        $isDev = $user && $user->isDev();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->search($search);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->get('category'));
        }

        $programs = $query->withCount(['interestedUsers', 'payments', 'paidPayments'])
            ->orderBy('title')
            ->paginate(15)
            ->through(fn($program) => [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'price' => $program->price,
                'formatted_price' => $program->formatted_price,
                'category' => $program->category,
                'duration' => $program->duration,
                'available_tickets' => $program->available_tickets,
                'sold_tickets' => $program->sold_tickets,
                'remaining_tickets' => $program->remaining_tickets,
                'type' => $program->type,
                'is_sold_out' => $program->is_sold_out,
                'interested_users_count' => $program->interested_users_count,
                'payments_count' => $program->payments_count,
                'paid_payments_count' => $program->paid_payments_count,
                'total_revenue' => $isDev ? null : $program->paidPayments->sum('amount'),
                'created_at' => $program->created_at,
            ]);

        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Programs/Index', [
            'programs' => $programs,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
            'canViewRevenue' => !$isDev,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Programs/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:programs',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'available_tickets' => 'nullable|integer|min:0',
            'sold_tickets' => 'nullable|integer|min:0',
            'type' => 'required|string|in:regular,workshop,training_camp',
            'is_workshop' => 'boolean',
            'workshop_description' => 'nullable|string',
            'workshop_highlights' => 'nullable|array',
            'instructor_name' => 'nullable|string|max:255',
            'instructor_title' => 'nullable|string|max:255',
            'instructor_image' => 'nullable|string',
            'accreditations' => 'nullable|array',
            'base_price' => 'nullable|numeric|min:0',
        ]);

        $data = $request->all();
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['base_price'] = $data['price'];

        // Ensure is_workshop is set correctly based on type
        $data['is_workshop'] = $data['type'] === 'workshop';

        Program::create($data);

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Program $program): Response
    {
        $user = Auth::user();
        $isDev = $user && $user->isDev();

        $program->load([
            'interestedUsers' => function ($query) {
                $query->latest('user_programs.updated_at');
            },
            'payments.user:id,name,email'
        ]);

        return Inertia::render('Admin/Programs/Show', [
            'program' => [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'description' => $program->description,
                'price' => $program->price,
                'formatted_price' => $program->formatted_price,
                'duration' => $program->duration,
                'features' => $program->features,
                'category' => $program->category,
                'type' => $program->type,
                'image' => $program->image,
                'available_tickets' => $program->available_tickets,
                'sold_tickets' => $program->sold_tickets,
                'remaining_tickets' => $program->remaining_tickets,
                'has_available_tickets' => $program->has_available_tickets,
                'is_sold_out' => $program->is_sold_out,
                'created_at' => $program->created_at,
                'interested_users' => $program->interestedUsers->map(fn($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'notes' => $user->pivot->notes,
                ]),
                'payments' => $isDev ? [] : $program->payments->map(fn($payment) => [
                    'id' => $payment->id,
                    'user' => $payment->user,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'paid_at' => $payment->paid_at,
                    'created_at' => $payment->created_at,
                ]),
                'stats' => [
                    'total_interested' => $program->interestedUsers->count(),
                    'total_payments' => $isDev ? null : $program->payments->count(),
                    'total_revenue' => $isDev ? null : $program->paidPayments->sum('amount'),
                    'conversion_rate' => $isDev ? null : ($program->interestedUsers->count() > 0
                        ? round(($program->paidPayments->count() / $program->interestedUsers->count()) * 100, 2)
                        : 0),
                ],
            ],
            'canViewRevenue' => !$isDev,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program): Response
    {
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Programs/Edit', [
            'program' => $program,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Program $program): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:programs,slug,' . $program->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'available_tickets' => 'nullable|integer|min:0',
            'sold_tickets' => 'nullable|integer|min:0',
            'type' => 'required|string|in:regular,workshop,training_camp',
            'is_workshop' => 'boolean',
            'workshop_description' => 'nullable|string',
            'workshop_highlights' => 'nullable|array',
            'instructor_name' => 'nullable|string|max:255',
            'instructor_title' => 'nullable|string|max:255',
            'instructor_image' => 'nullable|string',
            'accreditations' => 'nullable|array',
            'base_price' => 'nullable|numeric|min:0',
        ]);

        $data = $request->all();
        if (!$data['slug']) {
            $data['slug'] = Str::slug($data['title']);
        }

        $data['base_price'] = $data['price'];

        // Ensure is_workshop is set correctly based on type
        $data['is_workshop'] = $data['type'] === 'workshop';

        $program->update($data);

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program): RedirectResponse
    {
        $program->delete();

        return redirect()->route('admin.programs.index')
            ->with('success', 'Program deleted successfully.');
    }
}
