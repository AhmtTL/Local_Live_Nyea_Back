<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\WorkshopSession;
use Illuminate\Database\Seeder;

class WorkshopSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First, create or find the Premier Workshop program
        $premierWorkshop = Program::firstOrCreate([
            'slug' => 'premier-workshop'
        ], [
            'title' => 'Premier Workshop',
            'description' => 'An intensive 2-day workshop designed to equip educators and professionals with cutting-edge skills and methodologies.',
            'price' => 499.99,
            'duration' => '2 Days',
            'category' => 'workshop',
            'features' => [
                'Interactive Learning Sessions',
                'Expert-Led Workshops',
                'Networking Opportunities',
                'Certificate of Completion',
                'Resource Materials',
                'Follow-up Support'
            ]
        ]);

        // Workshop sessions data based on the flyer information with scarcity simulation
        $workshopSessions = [
            [
                'program_id' => $premierWorkshop->id,
                'location' => 'Jeddah, Saudi Arabia',
                'date' => '2025-09-30',
                'time' => '9:00 AM - 5:00 PM AST (2 Days)',
                'available_spots' => 25,
                'booked_spots' => 22, // Almost sold out - only 3 spots left!
                'price_override' => 499.99,
                'is_active' => true,
                'metadata' => [
                    'timezone' => 'Asia/Riyadh',
                    'venue' => 'TBD',
                    'special_notes' => 'First session in Saudi Arabia - High demand!'
                ]
            ],
            [
                'program_id' => $premierWorkshop->id,
                'location' => 'London Office',
                'date' => '2025-10-15',
                'time' => '9:00 AM - 5:00 PM GMT (2 Days)',
                'available_spots' => 25,
                'booked_spots' => 17, // Limited availability - 8 spots left
                'price_override' => 499.99,
                'is_active' => true,
                'metadata' => [
                    'timezone' => 'Europe/London',
                    'venue' => 'NYEA London Office',
                    'special_notes' => 'Popular location - filling fast'
                ]
            ],
            [
                'program_id' => $premierWorkshop->id,
                'location' => 'New York Office',
                'date' => '2025-11-20',
                'time' => '9:00 AM - 5:00 PM EST (2 Days)',
                'available_spots' => 25,
                'booked_spots' => 13, // Filling up - 12 spots left
                'price_override' => 499.99,
                'is_active' => true,
                'metadata' => [
                    'timezone' => 'America/New_York',
                    'venue' => 'Empire State Building, 20 W 34th street, New York',
                    'special_notes' => 'Premium Manhattan location'
                ]
            ],
            [
                'program_id' => $premierWorkshop->id,
                'location' => 'New York Office',
                'date' => '2025-12-10',
                'time' => '9:00 AM - 5:00 PM EST (2 Days)',
                'available_spots' => 25,
                'booked_spots' => 7, // Good availability - 18 spots left
                'price_override' => 499.99,
                'is_active' => true,
                'metadata' => [
                    'timezone' => 'America/New_York',
                    'venue' => 'Empire State Building, 20 W 34th street, New York',
                    'special_notes' => 'Holiday season session'
                ]
            ],
            [
                'program_id' => $premierWorkshop->id,
                'location' => 'London Office',
                'date' => '2026-01-20',
                'time' => '9:00 AM - 5:00 PM GMT (2 Days)',
                'available_spots' => 25,
                'booked_spots' => 3, // Nearly full capacity - 22 spots left
                'price_override' => 499.99,
                'is_active' => true,
                'metadata' => [
                    'timezone' => 'Europe/London',
                    'venue' => 'NYEA London Office',
                    'special_notes' => 'New year session - early bird pricing'
                ]
            ]
        ];

        // Create workshop sessions
        foreach ($workshopSessions as $sessionData) {
            WorkshopSession::firstOrCreate([
                'program_id' => $sessionData['program_id'],
                'location' => $sessionData['location'],
                'date' => $sessionData['date']
            ], $sessionData);
        }

        $this->command->info('Workshop sessions seeded successfully!');
        $this->command->info("Created {$premierWorkshop->title} program with " . count($workshopSessions) . " sessions.");
    }
}