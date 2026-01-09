<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResourceSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResourceSessionController extends Controller
{
    // List all resource sessions (optionally filter by type or parent)
    public function index(Request $request): JsonResponse
    {
        $query = ResourceSession::query();
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }
        $sessions = $query->with('children')->get();
        return response()->json(['success' => true, 'data' => $sessions]);
    }

    // Show a single resource session
    public function show(ResourceSession $resourceSession): JsonResponse
    {
        $resourceSession->load('children');
        return response()->json(['success' => true, 'data' => $resourceSession]);
    }

    // Create a new resource session
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!$user->isAdmin() && !$user->isDev())) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'slug' => 'required|string|unique:resource_sessions,slug',
            'type' => 'required|string',
            'parent_id' => 'nullable|exists:resource_sessions,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }
        $session = ResourceSession::create($request->all());
        return response()->json(['success' => true, 'data' => $session]);
    }

    // Update a resource session
    public function update(Request $request, ResourceSession $resourceSession): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!$user->isAdmin() && !$user->isDev())) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        $resourceSession->update($request->all());
        return response()->json(['success' => true, 'data' => $resourceSession]);
    }

    // Delete a resource session
    public function destroy(ResourceSession $resourceSession): JsonResponse
    {
        $user = Auth::user();
        if (!$user || (!$user->isAdmin() && !$user->isDev())) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        $resourceSession->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Get all resource sessions with advanced filters (mirroring TrainingCampSessionController)
     */
    public function advancedIndex(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'parent_id' => 'sometimes|integer|exists:resource_sessions,id',
            'type' => 'sometimes|string',
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

        $query = ResourceSession::query()->with(['children']);

        if ($request->filled('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('location')) {
            $query->where('location', $request->location);
        }
        if ($request->filled('date_from')) {
            $query->whereBetween('date', [$request->date_from, $request->date_to]);
        }
        if ($request->boolean('bookable_only')) {
            $query->where('is_bookable', true);
        }

        $sessions = $query->orderBy('date')->get()->map(function ($session) {
            return [
                'id' => $session->id,
                'parent_id' => $session->parent_id,
                'type' => $session->type,
                'title' => $session->title,
                'slug' => $session->slug,
                'location' => $session->location ?? null,
                'date' => $session->date ? $session->date->format('Y-m-d') : null,
                'start_date' => $session->start_date ? $session->start_date->format('Y-m-d') : null,
                'end_date' => $session->end_date ? $session->end_date->format('Y-m-d') : null,
                'time' => $session->time ?? null,
                'available_spots' => $session->available_spots ?? null,
                'booked_spots' => $session->booked_spots ?? null,
                'remaining_spots' => $session->remaining_spots ?? null,
                'effective_price' => $session->effective_price ?? null,
                'formatted_effective_price' => $session->formatted_effective_price ?? null,
                'is_bookable' => $session->is_bookable ?? null,
                'is_full' => $session->is_full ?? null,
                'metadata' => $session->metadata ?? [],
                'children' => $session->children,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }
}
