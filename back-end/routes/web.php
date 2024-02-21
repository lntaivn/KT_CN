<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('welcome');
});

route::get('/test', [UserController::class, 'index']);
route::post('/test', [UserController::class, 'NewOB']);
route::get('/test/update/{id}', [UserController::class, 'LoadOB']);
route::put('/test/update/{id}', [UserController::class, 'UpdateOB']);