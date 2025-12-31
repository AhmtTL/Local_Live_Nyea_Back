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
        Schema::table('referrals', function (Blueprint $table) {
            // Add school_id column
            $table->foreignId('school_id')->nullable()->constrained()->onDelete('cascade');
            
            // Drop the foreign key constraint on program_id first
            $table->dropForeign(['program_id']);
            
            // Drop program_id column
            $table->dropColumn('program_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('referrals', function (Blueprint $table) {
            // Add back program_id column
            $table->foreignId('program_id')->constrained()->onDelete('cascade');
            
            // Drop the foreign key constraint on school_id first
            $table->dropForeign(['school_id']);
            
            // Drop school_id column
            $table->dropColumn('school_id');
        });
    }
};
