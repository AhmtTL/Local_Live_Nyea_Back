<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkshopSession;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class WorkshopSessionController extends Controller
{
    /**
     * Get all workshop sessions for a specific program
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'program_id' => 'sometimes|integer|exists:programs,id',
            'school_id' => 'sometimes|integer|exists:schools,id',
            'location' => 'sometimes|string',
            'date_from' => 'sometimes|date',
            'date_to' => 'sometimes|date',
            'bookable_only' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $query = WorkshopSession::with(['program:id,title,slug,price'])
            ->active();

        // Filter by program
        if ($request->filled('program_id')) {
            $query->where('program_id', $request->program_id);
        }

        // Filter by school
        if ($request->filled('school_id')) {
            $query->where('school_id', $request->school_id);
        }

        // Filter by location
        if ($request->filled('location')) {
            $query->byLocation($request->location);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->byDateRange($request->date_from, $request->date_to);
        }

        // Filter only bookable sessions
        if ($request->boolean('bookable_only')) {
            $query->bookable();
        }

        $sessions = $query->leftJoin('schools', 'workshop_sessions.school_id', '=', 'schools.id')
            ->orderBy('workshop_sessions.date')
            ->orderBy('workshop_sessions.program_id')
            ->orderBy('workshop_sessions.location')
            ->orderBy('schools.name', 'asc')
            ->select('workshop_sessions.*')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'program_id' => $session->program_id,
                    'program' => $session->program,
                    'program_type' => $session->program_type,
                    'location' => $session->location,
                    'organization_logo' => $session->organization_logo,
                    'date' => $session->date->format('Y-m-d'),
                    'start_date' => $session->start_date ? $session->start_date->format('Y-m-d') : null,
                    'end_date' => $session->end_date ? $session->end_date->format('Y-m-d') : null,
                    'time' => $session->time,
                    'available_spots' => $session->available_spots,
                    'booked_spots' => $session->booked_spots,
                    'remaining_spots' => $session->remaining_spots,
                    'effective_price' => $session->effective_price,
                    'formatted_effective_price' => $session->formatted_effective_price,
                    'is_bookable' => $session->is_bookable,
                    'is_full' => $session->is_full,
                    'metadata' => $session->metadata,
                    'school' => $session->school,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    /**
     * Get a specific workshop session
     */
    public function show(WorkshopSession $workshopSession): JsonResponse
    {
        $workshopSession->load(['program:id,title,slug,description,price,features']);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $workshopSession->id,
                'program_id' => $workshopSession->program_id,
                'program' => $workshopSession->program,
                'program_type' => $workshopSession->program_type,
                'location' => $workshopSession->location,
                'organization_logo' => $workshopSession->organization_logo,
                'date' => $workshopSession->date->format('Y-m-d'),
                'start_date' => $workshopSession->start_date ? $workshopSession->start_date->format('Y-m-d') : null,
                'end_date' => $workshopSession->end_date ? $workshopSession->end_date->format('Y-m-d') : null,
                'time' => $workshopSession->time,
                'available_spots' => $workshopSession->available_spots,
                'booked_spots' => $workshopSession->booked_spots,
                'remaining_spots' => $workshopSession->remaining_spots,
                'effective_price' => $workshopSession->effective_price,
                'formatted_effective_price' => $workshopSession->formatted_effective_price,
                'is_bookable' => $workshopSession->is_bookable,
                'is_full' => $workshopSession->is_full,
                'metadata' => $workshopSession->metadata,
                'city' => $workshopSession->city,
                'country' => $workshopSession->country,
                'country_code' => $workshopSession->country_code,
                'venue_name' => $workshopSession->venue_name,
                'venue_address' => $workshopSession->venue_address,
                'location_highlights' => $workshopSession->location_highlights,
                'timezone' => $workshopSession->timezone,
                'special_notes' => $workshopSession->special_notes,
                'created_at' => $workshopSession->created_at,
                'school' => $workshopSession->school,
            ]
        ]);
    }

    /**
     * Book a workshop session (create payment record)
     */
    public function book(Request $request, WorkshopSession $workshopSession): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $quantity = $request->quantity;

        // Check if session is bookable
        if (!$workshopSession->is_bookable) {
            return response()->json([
                'success' => false,
                'message' => 'This workshop session is not available for booking.',
            ], 400);
        }

        // Check if enough spots are available
        if ($workshopSession->remaining_spots < $quantity) {
            return response()->json([
                'success' => false,
                'message' => "Only {$workshopSession->remaining_spots} spots remaining for this session.",
            ], 400);
        }

        try {
            DB::beginTransaction();

            // Reserve the spots temporarily
            $workshopSession->increment('booked_spots', $quantity);

            // Calculate total amount
            $totalAmount = $workshopSession->effective_price * $quantity;

            // Create payment record
            $payment = $workshopSession->payments()->create([
                'user_id' => Auth::user()->id,
                'program_id' => $workshopSession->program_id,
                'school_id' => $workshopSession->school_id,
                'amount' => $totalAmount,
                'currency' => 'USD',
                'status' => 'pending',
                'metadata' => [
                    'quantity' => $quantity,
                    'session_location' => $workshopSession->location,
                    'session_date' => $workshopSession->date->format('Y-m-d'),
                    'session_time' => $workshopSession->time,
                ],
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Workshop session booking initiated successfully.',
                'data' => [
                    'payment_id' => $payment->id,
                    'total_amount' => $totalAmount,
                    'quantity' => $quantity,
                    'remaining_spots' => $workshopSession->fresh()->remaining_spots,
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to book workshop session. Please try again.',
            ], 500);
        }
    }

    /**
     * Get workshop sessions for a specific program by program slug
     */
    public function byProgram(Request $request, string $programSlug): JsonResponse
    {
        $program = Program::where('slug', $programSlug)->first();

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program not found.',
            ], 404);
        }

        $query = $program->bookableWorkshopSessions();

        // Filter by school if provided
        if ($request->filled('school_id')) {
            $query->where('school_id', $request->school_id);
        }

        $sessions = $query->leftJoin('schools', 'workshop_sessions.school_id', '=', 'schools.id')
            ->orderBy('workshop_sessions.location')
            ->orderBy('workshop_sessions.date')
            ->orderBy('schools.name', 'asc')
            ->select('workshop_sessions.*')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'program_type' => $session->program_type,
                    'unique_identifier' => $session->location . '_' . $session->date->format('Y-m-d'),
                    'session_title' => $session->location . ' - ' . $session->date->format('M j, Y'),
                    'location' => $session->location,
                    'city' => $session->city,
                    'country' => $session->country,
                    'country_code' => $session->country_code,
                    'full_location' => trim(($session->city ?? '') . ', ' . ($session->country ?? ''), ', '),
                    'venue_name' => $session->venue_name,
                    'organization_logo' => $session->organization_logo,
                    'venue_address' => $session->venue_address,
                    'location_highlights' => $session->location_highlights ?? [],
                    'date' => $session->date->format('Y-m-d'),
                    'formatted_date' => $session->date->format('F j, Y'),
                    'start_date' => $session->start_date ? $session->start_date->format('Y-m-d') : null,
                    'end_date' => $session->end_date ? $session->end_date->format('Y-m-d') : null,
                    'time' => $session->time,
                    'timezone' => $session->timezone,
                    'available_spots' => $session->available_spots,
                    'booked_spots' => $session->booked_spots,
                    'remaining_spots' => $session->remaining_spots,
                    'effective_price' => $session->effective_price,
                    'formatted_effective_price' => $session->formatted_effective_price,
                    'price_difference' => $session->effective_price - $session->program->base_price,
                    'is_premium_pricing' => $session->effective_price > $session->program->base_price,
                    'is_discounted_pricing' => $session->effective_price < $session->program->base_price,
                    'is_bookable' => $session->is_bookable,
                    'is_full' => $session->is_full,
                    'is_featured' => $session->is_featured,
                    'is_almost_sold_out' => $session->remaining_spots <= 5,
                    'is_limited_availability' => $session->remaining_spots <= 10,
                    'urgency_level' => $session->remaining_spots <= 5 ? 'critical' : ($session->remaining_spots <= 10 ? 'high' : 'normal'),
                    'capacity_percentage' => round(($session->booked_spots / $session->available_spots) * 100, 1),
                    'special_notes' => $session->special_notes,
                    'metadata' => $session->metadata,
                    'school' => $session->school,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'program' => [
                    'id' => $program->id,
                    'title' => $program->title,
                    'slug' => $program->slug,
                    'description' => $program->description,
                    'workshop_description' => $program->workshop_description,
                    'price' => $program->price,
                    'base_price' => $program->base_price,
                    'formatted_price' => $program->formatted_price,
                    'duration' => $program->duration,
                    'category' => $program->category,
                    'image' => $program->image,
                    'features' => $program->features,
                    'is_workshop' => $program->is_workshop,
                    'workshop_highlights' => $program->workshop_highlights ?? [],
                    'instructor_name' => $program->instructor_name,
                    'instructor_title' => $program->instructor_title,
                    'instructor_image' => $program->instructor_image,
                    'accreditations' => $program->accreditations ?? [],
                    'workshop_locations' => $program->workshop_locations,
                    'total_workshop_capacity' => $program->total_workshop_capacity,
                    'total_workshop_bookings' => $program->total_workshop_bookings,
                ],
                'sessions' => $sessions
            ]
        ]);
    }
}
