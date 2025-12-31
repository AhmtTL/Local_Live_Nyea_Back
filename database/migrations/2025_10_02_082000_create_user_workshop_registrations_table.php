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
        Schema::create('user_workshop_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->foreignId('workshop_session_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('unique_code')->unique();
            $table->string('guest_email')->nullable();
            $table->string('guest_name')->nullable();
            $table->boolean('is_checked_in')->default(false);
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'program_id']);
            $table->index('unique_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_workshop_registrations');
    }
};
