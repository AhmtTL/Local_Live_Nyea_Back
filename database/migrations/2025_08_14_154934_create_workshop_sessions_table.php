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
        Schema::create('workshop_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->string('location'); // e.g., "Jeddah, Saudi Arabia", "London Office"
            $table->date('date'); // Session date
            $table->string('time'); // e.g., "9:00 AM - 5:00 PM AST (2 Days)"
            $table->integer('available_spots')->default(25); // Total available spots
            $table->integer('booked_spots')->default(0); // Currently booked spots
            $table->decimal('price_override', 10, 2)->nullable(); // Optional session-specific price
            $table->boolean('is_active')->default(true); // Can disable sessions
            $table->json('metadata')->nullable(); // Additional session info (timezone, special notes, etc.)
            $table->timestamps();

            // Indexes for performance
            $table->index(['program_id', 'date']);
            $table->index(['location', 'date']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workshop_sessions');
    }
};