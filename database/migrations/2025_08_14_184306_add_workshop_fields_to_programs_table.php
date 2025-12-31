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
            $table->boolean('is_workshop')->default(false)->after('category');
            $table->text('workshop_description')->nullable()->after('is_workshop');
            $table->json('workshop_highlights')->nullable()->after('workshop_description');
            $table->string('instructor_name')->nullable()->after('workshop_highlights');
            $table->string('instructor_title')->nullable()->after('instructor_name');
            $table->string('instructor_image')->nullable()->after('instructor_title');
            $table->json('accreditations')->nullable()->after('instructor_image');
            $table->decimal('base_price', 10, 2)->nullable()->after('price'); // Base price before location adjustments
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn([
                'is_workshop',
                'workshop_description',
                'workshop_highlights',
                'instructor_name',
                'instructor_title',
                'instructor_image',
                'accreditations',
                'base_price'
            ]);
        });
    }
};