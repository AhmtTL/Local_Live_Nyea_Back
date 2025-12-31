<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\TrainingCampSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingCampSessionController extends Controller
{
    /**
     * Display a listing of training camp sessions
     */
    public function index(Request $request): Response
    {
        $query = TrainingCampSession::with(['program', 'school'])
            ->leftJoin('schools', 'training_camp_sessions.school_id', '=', 'schools.id')
            ->leftJoin('programs', 'training_camp_sessions.program_id', '=', 'programs.id')
            ->select('training_camp_sessions.*');

        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('training_camp_sessions.location', 'like', "%{$search}%")
                    ->orWhere('training_camp_sessions.city', 'like', "%{$search}%")
                    ->orWhere('training_camp_sessions.country', 'like', "%{$search}%")
                    ->orWhere('training_camp_sessions.venue_name', 'like', "%{$search}%")
                    ->orWhere('programs.title', 'like', "%{$search}%")
                    ->orWhere('programs.slug', 'like', "%{$search}%")
                    ->orWhere('schools.name', 'like', "%{$search}%");
            });
        }

        $sessions = $query->orderBy('training_camp_sessions.date', 'asc')
            ->orderBy('schools.name', 'asc')
            ->paginate(15)
            ->withQueryString(); // Preserve query parameters in pagination links

        return Inertia::render('Admin/TrainingCampSessions/Index', [
            'sessions' => $sessions,
            'filters' => $request->only(['search', 'program_id', 'location'])
        ]);
    }

    /**
     * Show the form for creating a new training camp session
     */
    public function create(): Response
    {
        $trainingCamps = Program::trainingCamps()
            ->select('id', 'title', 'slug', 'base_price')
            ->orderBy('title')
            ->get();

        $schools = \App\Models\School::orderBy('name')->get();

        return Inertia::render('Admin/TrainingCampSessions/Create', [
            'trainingCamps' => $trainingCamps,
            'schools' => $schools
        ]);
    }

    /**
     * Store a newly created training camp session
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'program_type' => 'nullable|in:essentials,mastery,none',
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
            'time' => 'nullable|string|max:100',
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
        $program = Program::find($validated['program_id']);

        $validated['program_type'] = 'none';
        $validated['booked_spots'] = $validated['booked_spots'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? false;
        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['price_override'] = $validated['price_override'] ?? $program->base_price;
        $validated['time'] = $validated['time'] ?? 'Not Specified';

        TrainingCampSession::create($validated);

        return redirect()
            ->route('admin.training-camp-sessions.index')
            ->with('success', 'Training camp session created successfully.');
    }

    /**
     * Display the specified training camp session
     */
    public function show(TrainingCampSession $trainingCampSession): Response
    {
        $trainingCampSession->load(['program:id,title,slug,base_price', 'school:id,name']);

        return Inertia::render('Admin/TrainingCampSessions/Show', [
            'session' => $trainingCampSession
        ]);
    }

    /**
     * Show the form for editing the specified training camp session
     */
    public function edit(TrainingCampSession $trainingCampSession): Response
    {
        $trainingCamps = Program::trainingCamps()
            ->select('id', 'title', 'slug', 'base_price')
            ->orderBy('title')
            ->get();

        $schools = \App\Models\School::orderBy('name')->get();

        return Inertia::render('Admin/TrainingCampSessions/Edit', [
            'session' => $trainingCampSession,
            'trainingCamps' => $trainingCamps,
            'schools' => $schools
        ]);
    }

    /**
     * Update the specified training camp session
     */
    public function update(Request $request, TrainingCampSession $trainingCampSession)
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:programs,id',
            'program_type' => 'nullable|in:essentials,mastery,none',
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
            'time' => 'nullable|string|max:100',
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

        if (!empty($validated['program_id'])) {
            $program = Program::find($validated['program_id']);
            $validated['price_override'] = $program->base_price;
        }
        $validated['time'] = 'Not Specified';

        // Remove new_school_name from validated data as it's not a database field
        unset($validated['new_school_name']);

        $trainingCampSession->update($validated);


        return redirect()
            ->route('admin.training-camp-sessions.index')
            ->with('success', 'Training camp session updated successfully.');
    }

    /**
     * Duplicate the specified training camp session
     */
    public function duplicate(TrainingCampSession $trainingCampSession)
    {
        $duplicatedSession = $trainingCampSession->replicate();

        // Clear the ID and modify some fields for the duplicate
        $duplicatedSession->id = null;
        $duplicatedSession->booked_spots = 0; // Reset bookings for new session
        $duplicatedSession->is_featured = false; // Don't auto-feature duplicates

        // Add "(Copy)" to location to distinguish it
        $duplicatedSession->location = $duplicatedSession->location . ' (Copy)';

        $duplicatedSession->save();

        return redirect()
            ->route('admin.training-camp-sessions.edit', $duplicatedSession)
            ->with('success', 'Training camp session duplicated successfully. Please review and update the details.');
    }

    /**
     * Toggle the publish status of a training camp session
     */
    public function togglePublish(TrainingCampSession $trainingCampSession)
    {
        $trainingCampSession->update([
            'is_active' => !$trainingCampSession->is_active
        ]);

        $status = $trainingCampSession->is_active ? 'published' : 'unpublished';

        return redirect()
            ->back()
            ->with('success', "Training camp session {$status} successfully.");
    }

    /**
     * Remove the specified training camp session
     */
    public function destroy(TrainingCampSession $trainingCampSession)
    {
        $trainingCampSession->delete();

        return redirect()
            ->route('admin.training-camp-sessions.index')
            ->with('success', 'Training camp session deleted successfully.');
    }
}
