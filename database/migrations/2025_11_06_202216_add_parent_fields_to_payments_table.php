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
            $table->string('parent_name')->nullable()->after('guest_city');
            $table->string('parent_email')->nullable()->after('parent_name');
            $table->string('parent_phone_number')->nullable()->after('parent_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn(['parent_name', 'parent_email', 'parent_phone_number']);
        });
    }
};
