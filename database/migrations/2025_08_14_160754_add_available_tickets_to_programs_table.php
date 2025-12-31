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
        Schema::table('programs', function (Blueprint $table) {
            $table->integer('available_tickets')->nullable()->after('category')->comment('Total available tickets/spots for this program');
            $table->integer('sold_tickets')->default(0)->after('available_tickets')->comment('Number of tickets already sold');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn(['available_tickets', 'sold_tickets']);
        });
    }
};