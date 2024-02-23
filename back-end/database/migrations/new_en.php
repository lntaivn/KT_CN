<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('new_en', function (Blueprint $table) {
            $table->increments('id_en');
            $table->string('title');
            $table->integer('view_count');
            $table->integer('view_count1');
            $table->string('thumbnail');
            $table->smallInteger('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_en'); // Xóa bảng users nếu rollback
    }
};
