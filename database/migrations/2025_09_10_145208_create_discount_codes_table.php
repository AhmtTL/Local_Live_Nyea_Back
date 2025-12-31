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
        Schema::create('discount_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['percentage', 'fixed_amount']);
            $table->decimal('value', 10, 2); // percentage (0-100) or fixed amount
            $table->string('currency', 3)->default('USD'); // for fixed_amount only
            
            // Business Rules
            $table->decimal('min_amount', 10, 2)->nullable(); // minimum order amount
            $table->integer('max_redemptions')->nullable(); // global usage limit
            $table->integer('used_count')->default(0);
            
            // Validity
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            
            // Stripe Integration
            $table->string('stripe_coupon_id')->nullable();
            $table->string('stripe_promotion_code_id')->nullable();
            
            // Metadata
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            // Indexes
            $table->index(['is_active', 'starts_at', 'expires_at']);
            $table->index('code');
        });
        
        Schema::create('discount_redemptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discount_code_id')->constrained()->onDelete('cascade');
            $table->string('user_email');
            $table->string('stripe_session_id')->nullable();
            $table->decimal('amount_discounted', 10, 2);
            $table->timestamps();
            
            // Indexes
            $table->index(['discount_code_id', 'user_email']);
            $table->index('stripe_session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_redemptions');
        Schema::dropIfExists('discount_codes');
    }
};