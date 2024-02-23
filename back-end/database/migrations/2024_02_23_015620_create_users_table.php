<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

<<<<<<<< HEAD:back-end/database/migrations/users.php
return new class extends Migration {
========
class CreateUsersTable extends Migration
{
>>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4:back-end/database/migrations/2024_02_23_015620_create_users_table.php
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id_user'); 
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
<<<<<<<< HEAD:back-end/database/migrations/users.php
========
            $table->rememberToken();
            $table->timestamps();
>>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4:back-end/database/migrations/2024_02_23_015620_create_users_table.php
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
