<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('resource_sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resource_program_id')->nullable();
            $table->unsignedBigInteger('school_id')->nullable();
            $table->string('location')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('country_code')->nullable();
            $table->string('venue_name')->nullable();
            $table->string('organization_logo')->nullable();
            $table->text('venue_address')->nullable();
            $table->json('location_highlights')->nullable();
            $table->dateTime('date')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->string('time')->nullable();
            $table->string('timezone')->nullable();
            $table->integer('available_spots')->default(0);
            $table->integer('booked_spots')->default(0);
            $table->decimal('price_override', 10, 2)->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->text('special_notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('resource_program_id')->references('id')->on('programs')->onDelete('set null');
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('set null');
        });
    }
    public function down() {
        Schema::dropIfExists('resource_sessions');
    }
};
