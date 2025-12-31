<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'slug' => 'academic-consulting',
                'title' => 'Academic Excellence Consulting',
                'description' => 'Comprehensive assessment of learning capabilities and strategic academic planning for educational success.',
                'price' => 999.00,
                'duration' => '4 weeks',
                'category' => 'Academic Consulting',
                'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Academic Assessment', 'Strategic Planning', 'Learning Optimization', 'Expert Mentorship']
            ],
            [
                'slug' => 'career-consulting',
                'title' => 'Career Development Strategy',
                'description' => 'Professional guidance and strategic planning for career advancement and industry success.',
                'price' => 799.00,
                'duration' => '3 weeks',
                'category' => 'Career Consulting',
                'image' => 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Industry Analysis', 'Strategic Positioning', 'Professional Preparation', 'Network Building']
            ],
            [
                'slug' => 'mentorship',
                'title' => 'Premium Mentorship Program',
                'description' => 'Personalized mentorship with successful professionals and industry leaders.',
                'price' => 1299.00,
                'duration' => '8 weeks',
                'category' => 'Mentorship',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Weekly Sessions', 'Goal Planning', 'Progress Tracking', 'Exclusive Resources']
            ],
            [
                'slug' => 'cambridge-training',
                'title' => 'Cambridge Excellence Program',
                'description' => 'Advanced research methodologies and academic excellence training by Cambridge University experts.',
                'price' => 1999.00,
                'duration' => '6 weeks',
                'category' => 'Academic Excellence',
                'image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Cambridge Faculty', 'Research Methods', 'Academic Excellence', 'Premium Certification']
            ],
            [
                'slug' => 'nasa-space-training',
                'title' => 'NASA Space Training 2025',
                'description' => 'Kennedy Space Center experience with astronaut training, Mars exploration simulation, and STEM excellence.',
                'price' => 5499.00,
                'duration' => '10-14 days',
                'category' => 'NASA Partnership',
                'image' => 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['NASA Partnership', 'Kennedy Space Center', 'Astronaut Training', 'Mars Simulation']
            ],
            [
                'slug' => 'teacher-development',
                'title' => 'Cambridge Teacher Development',
                'description' => 'Official Cambridge Certificate of Professional Development with University-affiliated training.',
                'price' => 2499.00,
                'duration' => '2-4 days',
                'category' => 'Cambridge Certified',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Cambridge Certificate', 'University Training', 'Global Standards', 'Professional Network']
            ],
            [
                'slug' => 'summer-schools',
                'title' => 'Summer Academic Programs',
                'description' => 'Intensive summer learning programs for young students aged 10-17 years.',
                'price' => 1599.00,
                'duration' => '4 weeks',
                'category' => 'Youth Programs',
                'image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Age-Appropriate', 'Interactive Learning', 'Skill Development', 'Global Perspectives']
            ],
            [
                'slug' => 'sat-act-camps',
                'title' => 'SAT/ACT Preparation Camps',
                'description' => 'Intensive test preparation for SAT/ACT and college admission exams.',
                'price' => 899.00,
                'duration' => '2-10 weeks',
                'category' => 'Test Preparation',
                'image' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Expert Instructors', 'Practice Testing', 'Score Improvement', 'Flexible Scheduling']
            ],
            [
                'slug' => 'project-olympiads',
                'title' => 'Academic Olympiad Programs',
                'description' => 'Preparation for International Academic Olympiads with research mentorship.',
                'price' => 2199.00,
                'duration' => '16 weeks',
                'category' => 'Competition Programs',
                'image' => 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['International Competition', 'Research Methods', 'Expert Network', 'Competition Strategy']
            ],
            [
                'slug' => 'experiential-learning',
                'title' => 'Experiential Learning Program',
                'description' => 'Real-world learning experiences and hands-on educational projects.',
                'price' => 1799.00,
                'duration' => '6 weeks',
                'category' => 'Experiential Learning',
                'image' => 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Field Projects', 'Global Perspectives', 'Practical Skills', 'Cultural Learning']
            ],
            [
                'slug' => 'model-un',
                'title' => 'Model UN Leadership Program',
                'description' => 'Debate and diplomatic skills programs for critical thinking and leadership development.',
                'price' => 1299.00,
                'duration' => '5 weeks',
                'category' => 'Leadership Programs',
                'image' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['Debate Skills', 'Leadership Development', 'Critical Thinking', 'Public Speaking']
            ],
            [
                'slug' => 'pre-college',
                'title' => 'Pre-College Preparation',
                'description' => 'Comprehensive college preparation and university readiness programs.',
                'price' => 3499.00,
                'duration' => '3 weeks',
                'category' => 'Pre-College Programs',
                'image' => 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'features' => ['University Access', 'College Preparation', 'Academic Readiness', 'Success Strategies']
            ]
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}
