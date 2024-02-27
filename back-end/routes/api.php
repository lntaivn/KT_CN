<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewViEnController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NewViController;
use App\Http\Controllers\NewEnController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Auth
Route::post('/login', [AuthController::class, 'login']);

//New
Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/news/{id_new}', [NewsController::class, 'getNewByID']);
Route::get('/news/category/{id_category}', [NewsController::class, 'getAllByCategory']);
Route::get('/news/user/{id_user}', [NewsController::class, 'getAllByCategory']);
Route::post('/news', [NewsController::class, 'create']);


//News vi_en
// Route::get('/new-vi-en', [NewViEnController::class, 'getAll']);
Route::get('/new-vi-en/{id}', [NewViEnController::class, 'get']);
Route::get('/new-vi-en', [NewViEnController::class, 'getAllNewViEN']);

//News vi
Route::post('/new-vi', [NewViController::class, 'create']);

//News en
Route::post('/new-en', [NewEnController::class, 'create']);

//Category
Route::get('/categories', [CategoryController::class, 'getAll']);
Route::post('/category', [CategoryController::class, 'create']);
Route::get('/category/{id_category}', [CategoryController::class, 'get']);


//user
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id_user}', [UserController::class, 'update']);
Route::delete('/users/{id_user}', [UserController::class, 'destroy']);
Route::get('/users/{id_user}', [UserController::class, 'findByIdUser']);
