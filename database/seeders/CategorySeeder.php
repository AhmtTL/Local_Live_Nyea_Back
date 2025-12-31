<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Academic Consulting',
            'Career Consulting',
            'Mentorship',
            'Academic Excellence',
            'NASA Partnership',
            'Cambridge Certified',
            'Youth Programs',
            'Test Preparation',
            'Competition Programs',
            'Experiential Learning',
            'Leadership Programs',
            'Pre-College Programs'
        ];

        foreach ($categories as $index => $categoryName) {
            Category::create([
                'name' => $categoryName,
                'slug' => Str::slug($categoryName),
                'description' => "Programs focused on {$categoryName}",
                'sort_order' => $index + 1,
                'is_active' => true,
            ]);
        }
    }
}
