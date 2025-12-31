<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\WorkshopSession;
use Illuminate\Database\Seeder;

class ProgramTypeWorkshopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Harvard Negotiation Workshop
        $leadershipWorkshop = Program::where('slug', 'harvard-negotiation-workshop')->first();

        if (!$leadershipWorkshop) {
            $this->command->error('Leadership Negotiation Communication workshop not found. Please run ComprehensiveWorkshopSeeder first.');
            return;
        }

        // Clear existing sessions for this program to avoid duplicates
        WorkshopSession::where('program_id', $leadershipWorkshop->id)->delete();

        // Create sessions with both program types - Updated with new accurate data
        $sessions = [
            // University of Jeddah Sessions - (24 - 25 October)
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'essentials',
                'location' => 'University of Jeddah - (24 - 25 October)',
                'city' => 'Jeddah',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Conference Hall',
                'venue_address' => 'Conference Hall, Jeddah, Saudi Arabia',
                'date' => '2025-10-24',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 11,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => '189 spots available, Session Capacity 11/200 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'standard',
                    'focus' => 'high_school',
                    'target_audience' => 'high_school'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'mastery',
                'location' => 'University of Jeddah - (24 - 25 October)',
                'city' => 'Jeddah',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Conference Hall',
                'venue_address' => 'Conference Hall, Jeddah, Saudi Arabia',
                'date' => '2025-10-24',
                'time' => '14:00 - 17:00 PM (5 Days Extended)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => true, // FEATURED
                'location_highlights' => ['For High School Students'],
                'special_notes' => 'First Come First Serve - 11 spots available, Session Capacity 0/11 enrolled',
                'metadata' => [
                    'program_duration' => '5 days',
                    'intensity' => 'premium',
                    'focus' => 'mastery_high_school',
                    'target_audience' => 'high_school',
                    'extended_program' => true,
                    'featured' => true
                ]
            ],

            // Al Faris International School Sessions - (October 31)
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'essentials',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'time' => '9:00 AM - 12:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 0,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => '189 spots available, Session Capacity 0/189 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'standard',
                    'focus' => 'high_school',
                    'target_audience' => 'high_school',
                    'grade_level' => '11-12'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'mastery',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'time' => '9:00 AM - 12:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => 'First Come First Serve - 11 spots available, Session Capacity 0/11 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'premium',
                    'focus' => 'mastery_high_school',
                    'target_audience' => 'high_school',
                    'grade_level' => '11-12'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'essentials',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 0,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => '189 spots available, Session Capacity 0/189 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'standard',
                    'focus' => 'high_school',
                    'target_audience' => 'high_school',
                    'grade_level' => '11-12'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'mastery',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => 'First Come First Serve - 11 spots available, Session Capacity 0/11 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'premium',
                    'focus' => 'mastery_high_school',
                    'target_audience' => 'high_school',
                    'grade_level' => '11-12'
                ]
            ],

            // Toronto Business Hall Sessions - (November 28 - 29)
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'essentials',
                'location' => 'Toronto Business Hall - (November 28 - 29)',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'venue_address' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'time' => '9:00 AM - 12:00 PM EST (2 Days)',
                'timezone' => 'America/Toronto',
                'available_spots' => 189,
                'booked_spots' => 11,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => '189 spots available, Session Capacity 11/200 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'standard',
                    'focus' => 'high_school',
                    'target_audience' => 'high_school'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'essentials',
                'location' => 'Toronto Business Hall - (November 28 - 29)',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'venue_address' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'time' => '14:00 - 17:00 (2 Days)',
                'timezone' => 'Europe/London',
                'available_spots' => 189,
                'booked_spots' => 11,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For University Students'],
                'special_notes' => '189 spots available, Session Capacity 11/200 enrolled',
                'metadata' => [
                    'program_duration' => '2 days',
                    'intensity' => 'standard',
                    'focus' => 'university',
                    'target_audience' => 'university'
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'mastery',
                'location' => 'Toronto Business Hall - (November 28 - 29)',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'venue_address' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'time' => '9:00 AM - 12:00 PM (5 Days Extended)',
                'timezone' => 'America/Toronto',
                'available_spots' => 11,
                'booked_spots' => 0,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => 'First Come First Serve - 11 spots available, Session Capacity 0/11 enrolled',
                'metadata' => [
                    'program_duration' => '5 days',
                    'intensity' => 'premium',
                    'focus' => 'mastery_high_school',
                    'target_audience' => 'high_school',
                    'extended_program' => true
                ]
            ],
            [
                'program_id' => $leadershipWorkshop->id,
                'program_type' => 'mastery',
                'location' => 'Toronto Business Hall - (November 28 - 29)',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'venue_address' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'time' => '9:00 AM - 12:00 PM (5 Days Extended)',
                'timezone' => 'America/Toronto',
                'available_spots' => 11,
                'booked_spots' => 0,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For University Students'],
                'special_notes' => 'First Come First Serve - 11 spots available, Session Capacity 0/11 enrolled',
                'metadata' => [
                    'program_duration' => '5 days',
                    'intensity' => 'premium',
                    'focus' => 'mastery_university',
                    'target_audience' => 'university',
                    'extended_program' => true
                ]
            ]
        ];

        // Create all sessions
        foreach ($sessions as $sessionData) {
            WorkshopSession::create($sessionData);
        }

        $this->command->info('Program type workshop sessions seeded successfully!');
        $this->command->info('Created ' . count($sessions) . ' sessions:');
        $this->command->info('- University of Jeddah: 2 sessions (1 Essentials + 1 Featured Mastery)');
        $this->command->info('- Al Faris International School: 4 sessions (2 Essentials + 2 Mastery)');
        $this->command->info('- Toronto Business Hall: 4 sessions (2 Essentials + 2 Mastery)');
        $this->command->info('- Target audiences: High School Students & University Students');
        $this->command->info('- Pricing: Essentials $499.99, Mastery $1,499.99');
        $this->command->info('- Featured session: University of Jeddah Mastery');
        $this->command->info('- Total sessions: 10 across 3 locations');
    }
}