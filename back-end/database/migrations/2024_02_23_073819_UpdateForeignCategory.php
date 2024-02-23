<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyNewsTable_Category extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('news', function (Blueprint $table) {
            // Xóa cột 'category'
            $table->dropColumn('category');

            // Thêm cột 'id_category'
            $table->unsignedInteger('id_category');
            $table->foreign('id_category')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('news', function (Blueprint $table) {
            // Xóa liên kết khóa ngoại
            $table->dropForeign(['id_category']);

            // Thêm lại cột 'category'
            $table->string('category');

            // Xóa cột 'id_category'
            $table->dropColumn('id_category');
        });
    }
}

