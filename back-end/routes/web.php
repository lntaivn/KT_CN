<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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

Route::get('/', function () {
    return view('welcome');
});

<<<<<<< HEAD
Route::get('/users', [UserController::class, 'index']);

Route::post('/users', [UserController::class, 'store']);

Route::put('/users/{id}', [UserController::class, 'update'])->withoutMiddleware(['web']);

Route::delete('/users/{id}', [UserController::class, 'destroy'])->withoutMiddleware(['web']);

Route::get('/users/{id}', [UserController::class, 'findByIdUser'])->withoutMiddleware(['web']);
=======
Route::get('/home', function () {
    return view('welcome');
});

route::get('/test', [UserController::class, 'index']);
route::post('/test', [UserController::class, 'NewOB']);
route::get('/test/update/{id}', [UserController::class, 'LoadOB']);
route::put('/test/update/{id}', [UserController::class, 'UpdateOB']);


route::get('/news/detail/{glug}', [NewsController::class, 'getNewByGlug']);
route::post('/news/createNew/', [NewsController::class, 'saveNews']);
Route::post('/upload', [ImageUploadController::class, 'upload'])->name('upload.image');


route::get('/new',[NewsController::class, 'getAllNews']);
route::get('/new/category/selectAllNewByActivity', [NewsController::class, 'selectAllNewByActivity']);
route::get('/new/category/selectAllNewByAdmissions', [NewsController::class, 'selectAllNewByAdmissions']);
Route::get('/new/category/getCategoryActivityById/{id}', [NewsController::class, 'getCategoryActivityById']);
Route::get('/new/category/getCategoryAdmissionById/{id}', [NewsController::class, 'getCategoryAdmissionById']);

>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
