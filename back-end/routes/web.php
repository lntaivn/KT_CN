<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
<<<<<<< HEAD
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ImageUploadController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
=======
>>>>>>> dc3f65b550b40803d71c2685f2bddae5ee94810e

Route::get('/', function () {
    return view('welcome');
});

<<<<<<< HEAD
Route::get('/home', function () {
    return view('welcome');
});
=======
Route::get('/user', [UserController::class, 'index']);
Route::post('/user', [UserController::class, 'store'])->withoutMiddleware(['web']);

>>>>>>> dc3f65b550b40803d71c2685f2bddae5ee94810e
