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
            $table->string('organization_logo')->nullable()->after('venue_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('workshop_sessions', function (Blueprint $table) {
            $table->dropColumn('organization_logo');
        });
    }
};
