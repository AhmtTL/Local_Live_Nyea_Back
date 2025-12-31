<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->string('type')->default('regular')->after('category');
        });
        
        // Update existing records: if is_workshop is true, set type to 'workshop'
        DB::table('programs')->where('is_workshop', true)->update(['type' => 'workshop']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};