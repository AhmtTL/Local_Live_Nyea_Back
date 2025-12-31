<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ProgramSeeder::class,
        ]);

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@nyea.test',
            'phone' => '01717171717',
            'email_verified_at' => now(),
            'role' => 'admin',
            'is_active' => true,
            'password' => Hash::make('Admin@123'),
            'email_verified_at' => now(),
        ]);

        // Create regular test user
        User::create([
            'name' => 'Test User',
            'email' => 'test@nyea.test',
            'phone' => '01711111111',
            'role' => 'user',
            'is_active' => true,
            'password' => Hash::make('Pass@123'),
            'email_verified_at' => now(),
        ]);

        // Create additional test users
        User::factory(5)->create();
    }
}
