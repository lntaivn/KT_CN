<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id('id_new'); 
            $table->unsignedBigInteger('id_user'); 
            $table->unsignedBigInteger('id_en'); 
            $table->unsignedBigInteger('id_vi'); 
            $table->unsignedBigInteger('id_category'); 
            $table->integer('view_count')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('status')->default(true); 
            $table->timestamps();
        });


        Schema::table('news', function (Blueprint $table) {
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->foreign('id_en')->references('id_en')->on('new_en');
            $table->foreign('id_vi')->references('id_vi')->on('new_vi');
            $table->foreign('id_category')->references('id_category')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
};