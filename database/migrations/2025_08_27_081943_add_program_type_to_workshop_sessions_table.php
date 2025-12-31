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
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->enum('program_type', ['mastery', 'essentials'])->default('essentials')->after('program_id');
            $table->decimal('mastery_price_multiplier', 3, 2)->default(1.5)->after('program_type'); // 1.5 = 50% more expensive
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->dropColumn(['program_type', 'mastery_price_multiplier']);
        });
    }
};
