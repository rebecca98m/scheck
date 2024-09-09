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
        Schema::table('element_values', function (Blueprint $table) {
            $table->float('influence')->nullable();
            $table->float('impact')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('element_values', function (Blueprint $table) {
            $table->dropColumn('influence');
            $table->dropColumn('impact');
        });
    }
};
