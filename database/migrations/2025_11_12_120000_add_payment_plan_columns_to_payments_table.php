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
        Schema::table('payments', function (Blueprint $table) {
            $table->string('stripe_invoice_id')->nullable()->after('stripe_session_id');
            $table->string('payment_plan_type')->nullable()->after('manual_override');
            $table->decimal('payment_plan_total_amount', 10, 2)->nullable()->after('payment_plan_type');
            $table->decimal('payment_plan_deposit_amount', 10, 2)->nullable()->after('payment_plan_total_amount');
            $table->decimal('payment_plan_balance_amount', 10, 2)->nullable()->after('payment_plan_deposit_amount');
            $table->timestamp('payment_plan_balance_due_at')->nullable()->after('payment_plan_balance_amount');
            $table->foreignId('parent_payment_id')->nullable()->after('payment_plan_balance_due_at')->constrained('payments')->nullOnDelete();
            $table->boolean('is_balance_payment')->default(false)->after('parent_payment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['parent_payment_id']);
            $table->dropColumn([
                'stripe_invoice_id',
                'payment_plan_type',
                'payment_plan_total_amount',
                'payment_plan_deposit_amount',
                'payment_plan_balance_amount',
                'payment_plan_balance_due_at',
                'parent_payment_id',
                'is_balance_payment',
            ]);
        });
    }
};

