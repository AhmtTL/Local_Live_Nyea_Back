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
            $table->foreignId('workshop_session_id')->nullable()->after('program_id')->constrained('workshop_sessions')->onDelete('cascade');
            $table->index('workshop_session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['workshop_session_id']);
            $table->dropIndex(['workshop_session_id']);
            $table->dropColumn('workshop_session_id');
        });
    }
};