<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->increments('id_new');
            $table->unsignedInteger('id_user');
            $table->foreign('id_user')
                ->references('id_user')
                ->on('users');
            $table->unsignedInteger('id_en');
            $table->foreign('id_en')
                ->references('id_en')
                ->on('news_en');
            $table->unsignedInteger('id_vi');
            $table->foreign('id_vi')
                ->references('id_vi')
                ->on('news_vi');
                
            $table->date('time_upload');
            $table->date('time_update');
            $table->string('category');
            $table->integer('status');
            $table->timestamps();
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
}
