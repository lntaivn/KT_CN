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
        Schema::dropIfExists('news'); // Xóa bảng users nếu rollback

        Schema::create('news', function (Blueprint $table) {
            $table->increments('id_new');
            $table->unsignedInteger('id_en');
            $table->unsignedInteger('id_user');
            $table->timestamp('time_upload');
            $table->timestamp('time_update')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->smallInteger('status')->nullable();
            $table->foreign('id_en')->references('id_en')->on('new_en');
            $table->foreign('id_user')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news'); // Xóa bảng users nếu rollback
    }
};
