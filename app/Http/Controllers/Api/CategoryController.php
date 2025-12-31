<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Get all categories
     */
    public function index(): JsonResponse
    {
        $categories = Category::active()
            ->ordered()
            ->withCount('programs')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'sort_order' => $category->sort_order,
                    'programs_count' => $category->programs_count,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $categories
            ]
        ]);
    }

    /**
     * Get a specific category with its programs
     */
    public function show(string $identifier): JsonResponse
    {
        // Try to find by ID first, then by slug
        $category = is_numeric($identifier)
            ? Category::with('programs')->find($identifier)
            : Category::with('programs')->where('slug', $identifier)->first();

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $programs = $category->programs->map(function ($program) {
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
                'category' => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'sort_order' => $category->sort_order,
                ],
                'programs' => $programs
            ]
        ]);
    }
}
