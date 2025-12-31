<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrainingCampSession;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TrainingCampSessionController extends Controller
{
    /**
     * Get all training camp sessions for a specific program
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

        $query = TrainingCampSession::with(['program:id,title,slug,price'])
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

        $sessions = $query->leftJoin('schools', 'training_camp_sessions.school_id', '=', 'schools.id')
            ->orderBy('training_camp_sessions.date')
            ->orderBy('training_camp_sessions.program_id')
            ->orderBy('training_camp_sessions.location')
            ->orderBy('schools.name', 'asc')
            ->select('training_camp_sessions.*')
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
     * Get a specific training camp session
     */
    public function show(TrainingCampSession $trainingCampSession): JsonResponse
    {
        $trainingCampSession->load(['program:id,title,slug,description,price,features']);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $trainingCampSession->id,
                'program_id' => $trainingCampSession->program_id,
                'program' => $trainingCampSession->program,
                'program_type' => $trainingCampSession->program_type,
                'location' => $trainingCampSession->location,
                'organization_logo' => $trainingCampSession->organization_logo,
                'date' => $trainingCampSession->date->format('Y-m-d'),
                'start_date' => $trainingCampSession->start_date ? $trainingCampSession->start_date->format('Y-m-d') : null,
                'end_date' => $trainingCampSession->end_date ? $trainingCampSession->end_date->format('Y-m-d') : null,
                'time' => $trainingCampSession->time,
                'available_spots' => $trainingCampSession->available_spots,
                'booked_spots' => $trainingCampSession->booked_spots,
                'remaining_spots' => $trainingCampSession->remaining_spots,
                'effective_price' => $trainingCampSession->effective_price,
                'formatted_effective_price' => $trainingCampSession->formatted_effective_price,
                'is_bookable' => $trainingCampSession->is_bookable,
                'is_full' => $trainingCampSession->is_full,
                'metadata' => $trainingCampSession->metadata,
                'city' => $trainingCampSession->city,
                'country' => $trainingCampSession->country,
                'country_code' => $trainingCampSession->country_code,
                'venue_name' => $trainingCampSession->venue_name,
                'venue_address' => $trainingCampSession->venue_address,
                'location_highlights' => $trainingCampSession->location_highlights,
                'timezone' => $trainingCampSession->timezone,
                'special_notes' => $trainingCampSession->special_notes,
                'created_at' => $trainingCampSession->created_at,
                'school' => $trainingCampSession->school,
            ]
        ]);
    }

    /**
     * Book a training camp session (create payment record)
     */
    public function book(Request $request, TrainingCampSession $trainingCampSession): JsonResponse
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
        if (!$trainingCampSession->is_bookable) {
            return response()->json([
                'success' => false,
                'message' => 'This training camp session is not available for booking.',
            ], 400);
        }

        // Check if enough spots are available
        if ($trainingCampSession->remaining_spots < $quantity) {
            return response()->json([
                'success' => false,
                'message' => "Only {$trainingCampSession->remaining_spots} spots remaining for this session.",
            ], 400);
        }

        try {
            DB::beginTransaction();

            // Reserve the spots temporarily
            $trainingCampSession->increment('booked_spots', $quantity);

            // Calculate total amount
            $totalAmount = $trainingCampSession->effective_price * $quantity;

            // Create payment record
            $payment = $trainingCampSession->payments()->create([
                'user_id' => Auth::user()->id,
                'program_id' => $trainingCampSession->program_id,
                'training_camp_session_id' => $trainingCampSession->id,
                'school_id' => $trainingCampSession->school_id,
                'amount' => $totalAmount,
                'currency' => 'USD',
                'status' => 'pending',
                'metadata' => [
                    'quantity' => $quantity,
                    'session_location' => $trainingCampSession->location,
                    'session_date' => $trainingCampSession->date->format('Y-m-d'),
                    'session_time' => $trainingCampSession->time,
                ],
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Training camp session booking initiated successfully.',
                'data' => [
                    'payment_id' => $payment->id,
                    'total_amount' => $totalAmount,
                    'quantity' => $quantity,
                    'remaining_spots' => $trainingCampSession->fresh()->remaining_spots,
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to book training camp session. Please try again.',
            ], 500);
        }
    }

    /**
     * Get training camp sessions for a specific program by program slug
     */
    public function byProgram(Request $request, $programSlug)
    {
        $program = Program::where('slug', $programSlug)->first();
        // return $program;
        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program not found.',
            ], 404);
        }

        $query = $program->trainingCampSessions()->with(['school'])->active();

        // Filter by school if provided
        if ($request->filled('school_id')) {
            $query->where('school_id', $request->school_id);
        }

        $sessions = $query->leftJoin('schools', 'training_camp_sessions.school_id', '=', 'schools.id')
            ->orderBy('training_camp_sessions.location')
            ->orderBy('training_camp_sessions.date')
            ->orderBy('schools.name', 'asc')
            ->select('training_camp_sessions.*')
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
                    'training_camp_description' => $program->training_camp_description,
                    'price' => $program->price,
                    'base_price' => $program->base_price,
                    'formatted_price' => $program->formatted_price,
                    'duration' => $program->duration,
                    'category' => $program->category,
                    'image' => $program->image,
                    'features' => $program->features,
                    'is_training_camp' => $program->is_training_camp,
                    'training_camp_highlights' => $program->training_camp_highlights ?? [],
                    'instructor_name' => $program->instructor_name,
                    'instructor_title' => $program->instructor_title,
                    'instructor_image' => $program->instructor_image,
                    'accreditations' => $program->accreditations ?? [],
                    'training_camp_locations' => $program->training_camp_locations,
                    'total_training_camp_capacity' => $program->total_training_camp_capacity,
                    'total_training_camp_bookings' => $program->total_training_camp_bookings,
                ],
                'sessions' => $sessions
            ]
        ]);
    }
}
