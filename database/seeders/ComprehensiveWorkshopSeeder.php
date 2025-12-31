<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\WorkshopSession;
use Illuminate\Database\Seeder;

class ComprehensiveWorkshopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Harvard Negotiation Workshop
        $negotiationWorkshop = Program::firstOrCreate([
            'slug' => 'harvard-negotiation-workshop'
        ], [
            'title' => 'Harvard Negotiation Workshop',
            'description' => 'Master the art of negotiation with Harvard University\'s proven methodologies and frameworks.',
            'price' => 499.99, // Base price
            'base_price' => 499.99,
            'duration' => '2 Days Intensive',
            'category' => 'Leadership',
            'is_workshop' => true,
            'workshop_description' => 'This intensive workshop teaches you the negotiation strategies used at Harvard Business School and practiced by top executives worldwide.',
            'workshop_highlights' => [
                'Harvard-developed negotiation frameworks',
                'Real-world case study simulations',
                'Interactive role-playing exercises',
                'Conflict resolution techniques',
                'Cross-cultural negotiation strategies',
                'Advanced persuasion psychology'
            ],
            'instructor_name' => 'Prof. Nicholas Coburn-Palo',
            'instructor_title' => 'Harvard University Professor',
            'instructor_image' => '/images/nicholas-coburn-palo.svg',
            'accreditations' => ['Harvard University', 'CPDUK Certified'],
            'image' => '/images/harvard2.png',
            'features' => [
                'Harvard University Professor-Led',
                'CPDUK Accredited Certificate',
                'Interactive Case Studies',
                'Negotiation Simulation Labs',
                'Professional Networking',
                'Reference Letter Opportunity'
            ]
        ]);

        // Create Cambridge Leadership Workshop
        $leadershipWorkshop = Program::firstOrCreate([
            'slug' => 'cambridge-leadership-workshop'
        ], [
            'title' => 'Cambridge Leadership Excellence Workshop',
            'description' => 'Develop advanced leadership skills through Cambridge University\'s research-backed methodologies.',
            'price' => 499.99, // Base price
            'base_price' => 499.99,
            'duration' => '3 Days Intensive',
            'category' => 'Leadership',
            'is_workshop' => true,
            'workshop_description' => 'Transform your leadership approach with cutting-edge research from Cambridge University\'s leadership institute.',
            'workshop_highlights' => [
                'Cambridge research-based methodologies',
                'Executive presence development',
                'Strategic thinking frameworks',
                'Team dynamics optimization',
                'Decision-making under pressure',
                'Global leadership perspectives'
            ],
            'instructor_name' => 'Dr. Sarah Mitchell',
            'instructor_title' => 'Cambridge University Leadership Institute',
            'instructor_image' => '/images/cambridge-teacher.webp',
            'accreditations' => ['Cambridge University', 'Institute of Leadership & Management'],
            'image' => '/images/cambridge2.png',
            'features' => [
                'Cambridge University Research-Based',
                'Executive Presence Training',
                'Strategic Leadership Frameworks',
                'Global Case Studies',
                'Peer Learning Networks',
                'Certification of Excellence'
            ]
        ]);

        // Create sessions for Harvard Negotiation Workshop - ONLY USER PROVIDED SESSIONS
        $negotiationSessions = [
            // University of Jeddah - ESSENTIALS
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'University of Jeddah - (24 - 25 October)',
                'program_type' => 'essentials',
                'location' => 'University of Jeddah',
                'city' => 'Jeddah',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Conference Hall',
                'organization_logo' => '/storage/images/partner1.png',
                'venue_address' => 'Conference Hall, Jeddah, Saudi Arabia',
                'full_location' => 'Conference Hall, Jeddah, Saudi Arabia',
                'date' => '2025-10-24',
                'formatted_date' => 'Friday, October 24, 2025',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 11,
                'total_capacity' => 200,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => '189 spots available. Session Capacity: 11/200 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'session_format' => 'essentials'
                ]
            ],
            // University of Jeddah - MASTERY (FEATURED)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'University of Jeddah - (24 - 25 October)',
                'program_type' => 'mastery',
                'location' => 'University of Jeddah',
                'city' => 'Jeddah',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Conference Hall',
                'organization_logo' => '/storage/images/partner1.png',
                'venue_address' => 'Conference Hall, Jeddah, Saudi Arabia',
                'full_location' => 'Conference Hall, Jeddah, Saudi Arabia',
                'date' => '2025-10-24',
                'formatted_date' => 'Friday, October 24, 2025',
                'time' => '14:00 - 17:00 PM (5 Days Extended)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'total_capacity' => 11,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => true,
                'location_highlights' => ['For High School Students'],
                'special_notes' => 'First Come First Serve - 11 spots available. Session Capacity: 0/11 enrolled',
                'metadata' => [
                    'duration_days' => 5,
                    'target_audience' => 'high_school',
                    'session_format' => 'mastery'
                ]
            ],
            // Al Faris International School - ESSENTIALS (Grade 8-10)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Al Faris International School (Grade 8-10)',
                'program_type' => 'essentials',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'organization_logo' => '/storage/images/partner2.png',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'full_location' => 'Al Faris International School, Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'formatted_date' => 'Friday, October 31, 2025',
                'time' => '9:00 AM - 12:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 0,
                'total_capacity' => 189,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 8 - 9 - 10'],
                'special_notes' => '189 spots available. Session Capacity: 0/189 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'grade_levels' => ['8', '9', '10'],
                    'session_format' => 'essentials'
                ]
            ],
            // Al Faris International School - MASTERY (Grade 8-10)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Al Faris International School (Grade 8-10)',
                'program_type' => 'mastery',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'organization_logo' => '/storage/images/partner2.png',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'full_location' => 'Al Faris International School, Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'formatted_date' => 'Friday, October 31, 2025',
                'time' => '9:00 AM - 12:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'total_capacity' => 11,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 8 - 9 - 10'],
                'special_notes' => 'First Come First Serve - 11 spots available. Session Capacity: 0/11 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'grade_levels' => ['8', '9', '10'],
                    'session_format' => 'mastery'
                ]
            ],
            // Al Faris International School - ESSENTIALS (Grade 11-12)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Al Faris International School (Grade 11-12)',
                'program_type' => 'essentials',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'organization_logo' => '/storage/images/partner2.png',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'full_location' => 'Al Faris International School, Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'formatted_date' => 'Friday, October 31, 2025',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 189,
                'booked_spots' => 0,
                'total_capacity' => 189,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => '189 spots available. Session Capacity: 0/189 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'grade_levels' => ['11', '12'],
                    'session_format' => 'essentials'
                ]
            ],
            // Al Faris International School - MASTERY (Grade 11-12)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Al Faris International School (Grade 11-12)',
                'program_type' => 'mastery',
                'location' => 'Al Faris International School',
                'city' => 'Riyadh',
                'country' => 'Saudi Arabia',
                'country_code' => 'SAU',
                'venue_name' => 'Al Faris International School',
                'organization_logo' => '/storage/images/partner2.png',
                'venue_address' => 'Riyadh, Saudi Arabia',
                'full_location' => 'Al Faris International School, Riyadh, Saudi Arabia',
                'date' => '2025-10-31',
                'formatted_date' => 'Friday, October 31, 2025',
                'time' => '14:00 - 17:00 PM (2 Days)',
                'timezone' => 'Asia/Riyadh',
                'available_spots' => 11,
                'booked_spots' => 0,
                'total_capacity' => 11,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students', 'Grade 11 - 12'],
                'special_notes' => 'First Come First Serve - 11 spots available. Session Capacity: 0/11 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'grade_levels' => ['11', '12'],
                    'session_format' => 'mastery'
                ]
            ],
            // Toronto Business Hall - ESSENTIALS (High School Students)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Toronto Business Hall - (November 28 - 29)',
                'program_type' => 'essentials',
                'location' => 'Toronto Business Hall',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'organization_logo' => '/storage/images/partner3.png',
                'venue_address' => 'Toronto, Canada',
                'full_location' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'formatted_date' => 'Friday, November 28, 2025',
                'time' => '9:00 AM - 12:00 PM EST (2 Days)',
                'timezone' => 'America/Toronto',
                'available_spots' => 189,
                'booked_spots' => 11,
                'total_capacity' => 200,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => '189 spots available. Session Capacity: 11/200 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'high_school',
                    'session_format' => 'essentials'
                ]
            ],
            // Toronto Business Hall - ESSENTIALS (University Students)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Toronto Business Hall - (November 28 - 29)',
                'program_type' => 'essentials',
                'location' => 'Toronto Business Hall',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'organization_logo' => '/storage/images/partner3.png',
                'venue_address' => 'Toronto, Canada',
                'full_location' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'formatted_date' => 'Friday, November 28, 2025',
                'time' => '14:00 - 17:00 (2 Days)',
                'timezone' => 'Europe/London',
                'available_spots' => 189,
                'booked_spots' => 11,
                'total_capacity' => 200,
                'price_override' => 499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For University Students'],
                'special_notes' => '189 spots available. Session Capacity: 11/200 enrolled',
                'metadata' => [
                    'duration_days' => 2,
                    'target_audience' => 'university',
                    'session_format' => 'essentials'
                ]
            ],
            // Toronto Business Hall - MASTERY (High School Students)
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Toronto Business Hall - (November 28 - 29)',
                'program_type' => 'mastery',
                'location' => 'Toronto Business Hall',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'organization_logo' => '/storage/images/partner3.png',
                'venue_address' => 'Toronto, Canada',
                'full_location' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'formatted_date' => 'Friday, November 28, 2025',
                'time' => '9:00 AM - 12:00 PM (5 Days Extended)',
                'timezone' => 'America/Toronto',
                'available_spots' => 11,
                'booked_spots' => 0,
                'total_capacity' => 11,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For High School Students'],
                'special_notes' => 'First Come First Serve - 11 spots available. Session Capacity: 0/11 enrolled',
                'metadata' => [
                    'duration_days' => 5,
                    'target_audience' => 'high_school',
                    'session_format' => 'mastery'
                ]
            ],
            // Toronto Business Hall - MASTERY (University Students) - INCOMPLETE IN USER DATA
            [
                'program_id' => $negotiationWorkshop->id,
                'session_title' => 'Toronto Business Hall - (November 28 - 29)',
                'program_type' => 'mastery',
                'location' => 'Toronto Business Hall',
                'city' => 'Toronto',
                'country' => 'Canada',
                'country_code' => 'CAN',
                'venue_name' => 'Toronto Business Hall',
                'organization_logo' => '/storage/images/partner3.png',
                'venue_address' => 'Toronto, Canada',
                'full_location' => 'Toronto Business Hall, Toronto, Canada',
                'date' => '2025-11-28',
                'formatted_date' => 'Friday, November 28, 2025',
                'time' => '9:00 AM - 12:00 PM (5 Days Extended)',
                'timezone' => 'America/Toronto',
                'available_spots' => 11,
                'booked_spots' => 0,
                'total_capacity' => 11,
                'price_override' => 1499.99,
                'is_active' => true,
                'is_featured' => false,
                'location_highlights' => ['For University Students'],
                'special_notes' => 'First Come First Serve - 11 spots available. Session Capacity: 0/11 enrolled',
                'metadata' => [
                    'duration_days' => 5,
                    'target_audience' => 'university',
                    'session_format' => 'mastery'
                ]
            ]
        ];

        // No Cambridge sessions - only Harvard sessions as requested
        $leadershipSessions = [];

        // Create all workshop sessions
        $allSessions = array_merge($negotiationSessions, $leadershipSessions);
        
        foreach ($allSessions as $sessionData) {
            WorkshopSession::firstOrCreate([
                'program_id' => $sessionData['program_id'],
                'location' => $sessionData['location'],
                'date' => $sessionData['date']
            ], $sessionData);
        }

        $this->command->info('Comprehensive workshop data seeded successfully!');
        $this->command->info("Created {$negotiationWorkshop->title} with " . count($negotiationSessions) . " sessions.");
        $this->command->info("Created {$leadershipWorkshop->title} with " . count($leadershipSessions) . " sessions.");
    }
}
