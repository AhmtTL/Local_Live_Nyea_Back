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
        Schema::create('user_training_camp_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('training_camp_session_id')->nullable();
            $table->foreignId('payment_id')->nullable()->constrained('payments');
            $table->string('unique_code')->unique();
            $table->string('guest_email')->nullable();
            $table->string('guest_name')->nullable();
            $table->boolean('is_checked_in')->default(false);
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamps();

            // Add foreign key constraint with custom name
            $table->foreign('training_camp_session_id', 'utcr_tcs_foreign')
                  ->references('id')->on('training_camp_sessions')
                  ->onDelete('cascade');

            $table->index(['user_id', 'program_id']);
            $table->index('unique_code');
            $table->index('training_camp_session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_training_camp_registrations');
    }
};
