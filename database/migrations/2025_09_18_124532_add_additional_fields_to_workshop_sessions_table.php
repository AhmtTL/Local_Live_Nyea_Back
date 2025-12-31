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
            $table->string('session_title')->nullable()->after('program_type');
            $table->string('full_location')->nullable()->after('venue_name');
            $table->string('formatted_date')->nullable()->after('date');
            $table->integer('total_capacity')->nullable()->after('available_spots');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->dropColumn(['session_title', 'full_location', 'formatted_date', 'total_capacity']);
        });
    }
};
