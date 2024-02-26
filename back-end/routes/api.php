<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;

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
route::get('/new', [NewsController::class, 'getAllNews']);
Route::get('/new/category/{id_category}', [NewsController::class, 'getAllByCategory']);


//Category
route::get('/category/new/{id_new}', [NewsController::class, 'getCategoryByNews']);



Route::get('/users', [UserController::class, 'index']);

Route::post('/users', [UserController::class, 'store']);

Route::put('/users/{id_user}', [UserController::class, 'update']);

Route::delete('/users/{id_user}', [UserController::class, 'destroy']);

Route::get('/users/{id_user}', [UserController::class, 'findByIdUser']);



