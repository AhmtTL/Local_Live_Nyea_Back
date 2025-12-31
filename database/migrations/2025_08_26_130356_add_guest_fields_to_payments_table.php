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
            // Add dedicated guest information columns
            $table->string('guest_name')->nullable()->after('user_id');
            $table->string('guest_email')->nullable()->after('guest_name');
            $table->string('guest_phone')->nullable()->after('guest_email');
            $table->string('guest_school_name')->nullable()->after('guest_phone');
            
            // Add indexes for guest fields
            $table->index('guest_email');
            $table->index('guest_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Remove indexes first
            $table->dropIndex(['guest_email']);
            $table->dropIndex(['guest_name']);
            
            // Remove guest columns
            $table->dropColumn([
                'guest_name',
                'guest_email', 
                'guest_phone',
                'guest_school_name'
            ]);
        });
    }
};
