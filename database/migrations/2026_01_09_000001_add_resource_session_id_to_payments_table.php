<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::table('payments', function (Blueprint $table) {
            if (!Schema::hasColumn('payments', 'resource_session_id')) {
                $table->unsignedBigInteger('resource_session_id')->nullable()->after('id');
                $table->foreign('resource_session_id')->references('id')->on('resource_sessions')->onDelete('set null');
            }
        });
    }
    public function down() {
        Schema::table('payments', function (Blueprint $table) {
            if (Schema::hasColumn('payments', 'resource_session_id')) {
                $table->dropForeign(['resource_session_id']);
                $table->dropColumn('resource_session_id');
            }
        });
    }
};
