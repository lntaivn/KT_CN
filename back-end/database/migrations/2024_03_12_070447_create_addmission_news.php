<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admission_news', function (Blueprint $table) {
            $table->id('id_admission_news');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_department');
            $table->string('title_vi');
            $table->string('title_en');
            $table->text('content_vi')->nullable();
            $table->text('content_en')->nullable();
            $table->integer('view_count')->nullable()->default(0);
            $table->string('thumbnail')->nullable();
            $table->boolean('status_vi')->default(true);
            $table->boolean('status_en')->default(true);
            $table->integer('update_by')->default(null);
            $table->boolean('is_deleted')->default(false);
            $table->enum('type_university_vi', ["Sau đại học", "Đại học"]);
            $table->enum('type_university_en', ["Higher education", "Undergraduate"]);
            $table->timestamps();
        });


        Schema::table('admission_news', function (Blueprint $table) {
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->foreign('id_department')->references('id_department')->on('departments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admission_news');
    }
};