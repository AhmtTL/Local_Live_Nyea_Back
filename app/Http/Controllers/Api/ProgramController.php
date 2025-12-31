<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProgramController extends Controller
{
    /**
     * Get all programs with optional filtering
     */
    public function index(Request $request): JsonResponse
    {
        $query = Program::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->search($search);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->get('category'));
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        // Sort options
        $sort = $request->get('sort', 'title');
        $direction = $request->get('direction', 'asc');

        $allowedSorts = ['title', 'price', 'duration', 'created_at'];
        if (in_array($sort, $allowedSorts)) {
            $query->orderBy($sort, $direction);
        } else {
            $query->orderBy('title', 'asc');
        }

        // Pagination
        $perPage = min($request->get('per_page', 15), 50); // Max 50 per page
        $programs = $query->paginate($perPage);

        $programs->getCollection()->transform(function ($program) {
            return [
                'id' => $program->id,
                'title' => $program->title,
                'slug' => $program->slug,
                'description' => $program->description,
                'price' => $program->price,
                'formatted_price' => $program->formatted_price,
                'duration' => $program->duration,
                'features' => $program->features,
                'category' => $program->category,
                'image' => $program->image,
                'available_tickets' => $program->available_tickets,
                'sold_tickets' => $program->sold_tickets,
                'remaining_tickets' => $program->remaining_tickets,
                'has_available_tickets' => $program->has_available_tickets,
                'is_sold_out' => $program->is_sold_out,
                'created_at' => $program->created_at,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $programs
        ]);
    }

    /**
     * Get a specific program by ID or slug
     */
    public function show(string $identifier): JsonResponse
    {
        // Try to find by ID first, then by slug
        $program = is_numeric($identifier)
            ? Program::find($identifier)
            : Program::where('slug', $identifier)->first();

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
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
                    'image' => $program->image,
                    'available_tickets' => $program->available_tickets,
                    'sold_tickets' => $program->sold_tickets,
                    'remaining_tickets' => $program->remaining_tickets,
                    'has_available_tickets' => $program->has_available_tickets,
                    'is_sold_out' => $program->is_sold_out,
                    'created_at' => $program->created_at,
                ]
            ]
        ]);
    }

    /**
     * Get featured/popular programs
     */
    public function featured(): JsonResponse
    {
        // Get programs ordered by number of interested users
        $programs = Program::withCount('interestedUsers')
            ->orderBy('interested_users_count', 'desc')
            ->take(6)
            ->get()
            ->map(function ($program) {
                return [
                    'id' => $program->id,
                    'title' => $program->title,
                    'slug' => $program->slug,
                    'description' => $program->description,
                    'price' => $program->price,
                    'formatted_price' => $program->formatted_price,
                    'duration' => $program->duration,
                    'features' => $program->features,
                    'category' => $program->category,
                    'image' => $program->image,
                    'interested_count' => $program->interested_users_count,
                    'created_at' => $program->created_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'programs' => $programs
            ]
        ]);
    }

    /**
     * Get programs by category
     */
    public function byCategory(string $category): JsonResponse
    {
        $programs = Program::byCategory($category)
            ->orderBy('title')
            ->get()
            ->map(function ($program) {
                return [
                    'id' => $program->id,
                    'title' => $program->title,
                    'slug' => $program->slug,
                    'description' => $program->description,
                    'price' => $program->price,
                    'formatted_price' => $program->formatted_price,
                    'duration' => $program->duration,
                    'features' => $program->features,
                    'category' => $program->category,
                    'image' => $program->image,
                    'created_at' => $program->created_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'category' => $category,
                'programs' => $programs
            ]
        ]);
    }

    public function userPrograms(): JsonResponse
    {
        $user = Auth::user();
        $programs = $user->interestedPrograms->map(function ($program) {
            return [
                'id' => $program->id, // Use program ID as the unique identifier
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
                    'image' => $program->image,
                    'created_at' => $program->created_at,
                ],
                'notes' => $program->pivot->notes ?? null,
                'joined_at' => $program->pivot->created_at ?? null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'programs' => $programs
            ]
        ]);
    }
}
