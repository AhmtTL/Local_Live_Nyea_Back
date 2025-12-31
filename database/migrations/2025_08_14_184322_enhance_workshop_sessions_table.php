<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->string('city')->nullable()->after('location');
            $table->string('country')->nullable()->after('city');
            $table->string('country_code', 3)->nullable()->after('country');
            $table->text('venue_address')->nullable()->after('country_code');
            $table->string('venue_name')->nullable()->after('venue_address');
            $table->json('location_highlights')->nullable()->after('venue_name'); // Special features of this location
            $table->string('timezone')->nullable()->after('time');
            $table->text('special_notes')->nullable()->after('metadata'); // Location-specific notes
            $table->boolean('is_featured')->default(false)->after('special_notes'); // Highlight certain sessions
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->dropColumn([
                'city',
                'country',
                'country_code',
                'venue_address',
                'venue_name',
                'location_highlights',
                'timezone',
                'special_notes',
                'is_featured'
            ]);
        });
    }
};