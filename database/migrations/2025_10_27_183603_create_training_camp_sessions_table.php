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
        Schema::create('training_camp_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('set null');
            
            // Location details
            $table->string('location');
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('country_code', 3)->nullable();
            $table->string('venue_name')->nullable();
            $table->string('organization_logo')->nullable();
            $table->text('venue_address')->nullable();
            $table->json('location_highlights')->nullable();
            
            // Schedule details
            $table->date('date');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('time', 100);
            $table->string('timezone', 50)->nullable();
            
            // Capacity and pricing
            $table->integer('available_spots')->default(25);
            $table->integer('booked_spots')->default(0);
            $table->decimal('price_override', 10, 2)->nullable();
            
            // Status and features
            $table->boolean('is_active')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->text('special_notes')->nullable();
            $table->json('metadata')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['program_id', 'is_active', 'date']);
            $table->index(['location', 'date']);
            $table->index(['country', 'city']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_camp_sessions');
    }
};
