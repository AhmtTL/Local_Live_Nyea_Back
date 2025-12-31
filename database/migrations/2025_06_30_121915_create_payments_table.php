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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            $table->string('stripe_payment_intent_id')->nullable();
            $table->string('stripe_customer_id')->nullable();
            $table->string('stripe_session_id')->nullable();
            $table->index('stripe_session_id');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('status', ['pending', 'processing', 'paid', 'failed', 'refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->json('metadata')->nullable(); // Additional payment info
            $table->text('notes')->nullable(); // Admin notes
            $table->boolean('manual_override')->default(false); // For admin manual adjustments
            $table->timestamps();

            $table->index(['user_id', 'program_id']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
