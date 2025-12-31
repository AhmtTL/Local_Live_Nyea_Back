<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\WorkshopSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkshopSessionController extends Controller
{
    /**
     * Display a listing of workshop sessions
     */
    public function index(Request $request): Response
    {
        $query = WorkshopSession::with(['program', 'school'])
            ->leftJoin('schools', 'workshop_sessions.school_id', '=', 'schools.id')
            ->leftJoin('programs', 'workshop_sessions.program_id', '=', 'programs.id')
            ->select('workshop_sessions.*');

        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('workshop_sessions.location', 'like', "%{$search}%")
                    ->orWhere('workshop_sessions.city', 'like', "%{$search}%")
                    ->orWhere('workshop_sessions.country', 'like', "%{$search}%")
                    ->orWhere('workshop_sessions.venue_name', 'like', "%{$search}%")
                    ->orWhere('programs.title', 'like', "%{$search}%")
                    ->orWhere('programs.slug', 'like', "%{$search}%")
                    ->orWhere('schools.name', 'like', "%{$search}%");
            });
        }

        $sessions = $query->orderBy('workshop_sessions.date', 'asc')
            ->orderBy('schools.name', 'asc')
            ->paginate(15)
            ->withQueryString(); // Preserve query parameters in pagination links

        return Inertia::render('Admin/WorkshopSessions/Index', [
            'sessions' => $sessions,
            'filters' => $request->only(['search', 'program_id', 'location'])
        ]);
    }

    /**
     * Show the form for creating a new workshop session
     */
    public function create(): Response
    {
        $workshops = Program::workshops()
            ->select('id', 'title', 'slug', 'base_price')
            ->orderBy('title')
            ->get();

        $schools = \App\Models\School::orderBy('name')->get();

        return Inertia::render('Admin/WorkshopSessions/Create', [
            'workshops' => $workshops,
            'schools' => $schools
        ]);
    }

    /**
     * Store a newly created workshop session
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'program_type' => 'required|in:essentials,mastery',
            'school_id' => 'nullable|exists:schools,id',
            'new_school_name' => 'nullable|string|max:255',
            'location' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'country_code' => 'nullable|string|max:3',
            'venue_name' => 'nullable|string|max:255',
            'organization_logo' => 'nullable|string|max:500',
            'venue_address' => 'nullable|string',
            'location_highlights' => 'nullable|array',
            'location_highlights.*' => 'string|max:100',
            'date' => 'required|date|after:today',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'time' => 'required|string|max:100',
            'timezone' => 'nullable|string|max:50',
            'available_spots' => 'required|integer|min:1|max:1000',
            'booked_spots' => 'nullable|integer|min:0|max:' . $request->available_spots,
            'price_override' => 'nullable|numeric|min:0',

            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'special_notes' => 'nullable|string',
            'metadata' => 'nullable|array',
        ]);

        // Handle new school creation
        if (!empty($validated['new_school_name'])) {
            $school = \App\Models\School::firstOrCreate([
                'name' => $validated['new_school_name'],
            ]);
            $validated['school_id'] = $school->id;
        }

        // Remove new_school_name from validated data as it's not a database field
        unset($validated['new_school_name']);

        $validated['booked_spots'] = $validated['booked_spots'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? false;
        $validated['is_featured'] = $validated['is_featured'] ?? false;

        WorkshopSession::create($validated);

        return redirect()
            ->route('admin.workshop-sessions.index')
            ->with('success', 'Workshop session created successfully.');
    }

    /**
     * Display the specified workshop session
     */
    public function show(WorkshopSession $workshopSession): Response
    {
        $workshopSession->load(['program:id,title,slug,base_price', 'school:id,name', 'payments']);

        return Inertia::render('Admin/WorkshopSessions/Show', [
            'session' => $workshopSession
        ]);
    }

    /**
     * Show the form for editing the specified workshop session
     */
    public function edit(WorkshopSession $workshopSession): Response
    {
        $workshops = Program::workshops()
            ->select('id', 'title', 'slug', 'base_price')
            ->orderBy('title')
            ->get();

        $schools = \App\Models\School::orderBy('name')->get();

        return Inertia::render('Admin/WorkshopSessions/Edit', [
            'session' => $workshopSession,
            'workshops' => $workshops,
            'schools' => $schools
        ]);
    }

    /**
     * Update the specified workshop session
     */
    public function update(Request $request, WorkshopSession $workshopSession)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'program_type' => 'required|in:essentials,mastery',
            'school_id' => 'nullable|exists:schools,id',
            'new_school_name' => 'nullable|string|max:255',
            'location' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'country_code' => 'nullable|string|max:3',
            'venue_name' => 'nullable|string|max:255',
            'organization_logo' => 'nullable|string|max:500',
            'venue_address' => 'nullable|string',
            'location_highlights' => 'nullable|array',
            'location_highlights.*' => 'string|max:100',
            'date' => 'required|date',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'time' => 'required|string|max:100',
            'timezone' => 'nullable|string|max:50',
            'available_spots' => 'required|integer|min:1|max:1000',
            'booked_spots' => 'nullable|integer|min:0',
            'price_override' => 'nullable|numeric|min:0',

            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'special_notes' => 'nullable|string',
            'metadata' => 'nullable|array',
        ]);

        // Handle new school creation
        if (!empty($validated['new_school_name'])) {
            $school = \App\Models\School::firstOrCreate([
                'name' => $validated['new_school_name'],
            ]);
            $validated['school_id'] = $school->id;
        }

        // Remove new_school_name from validated data as it's not a database field
        unset($validated['new_school_name']);

        $workshopSession->update($validated);

        return redirect()
            ->route('admin.workshop-sessions.index')
            ->with('success', 'Workshop session updated successfully.');
    }

    /**
     * Duplicate the specified workshop session
     */
    public function duplicate(WorkshopSession $workshopSession)
    {
        $duplicatedSession = $workshopSession->replicate();

        // Clear the ID and modify some fields for the duplicate
        $duplicatedSession->id = null;
        $duplicatedSession->booked_spots = 0; // Reset bookings for new session
        $duplicatedSession->is_featured = false; // Don't auto-feature duplicates

        // Add "(Copy)" to location to distinguish it
        $duplicatedSession->location = $duplicatedSession->location . ' (Copy)';

        // Set date to future (add 1 month to original date)
        // $originalDate = new \DateTime($duplicatedSession->date);
        // $originalDate->add(new \DateInterval('P1M'));
        // $duplicatedSession->date = $originalDate->format('Y-m-d');

        $duplicatedSession->save();

        return redirect()
            ->route('admin.workshop-sessions.edit', $duplicatedSession)
            ->with('success', 'Workshop session duplicated successfully. Please review and update the details.');
    }

    /**
     * Toggle the publish status of a workshop session
     */
    public function togglePublish(WorkshopSession $workshopSession)
    {
        $workshopSession->update([
            'is_active' => !$workshopSession->is_active
        ]);

        $status = $workshopSession->is_active ? 'published' : 'unpublished';

        return redirect()
            ->back()
            ->with('success', "Workshop session {$status} successfully.");
    }

    /**
     * Remove the specified workshop session
     */
    public function destroy(WorkshopSession $workshopSession)
    {
        $workshopSession->delete();

        return redirect()
            ->route('admin.workshop-sessions.index')
            ->with('success', 'Workshop session deleted successfully.');
    }
}
