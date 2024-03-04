<?php

use App\Http\Controllers\CategoryController;
use App\Http\Middleware\ExtractEmailFromJWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageUploadController;

/*;
use App
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/test', [AuthController::class, 'getUser']);
    Route::post('/changePassword', [AuthController::class, 'changePassword']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/news', [NewsController::class, 'getAllNews']);

});

Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/news', [NewsController::class, 'getAllNews']);
    Route::get('/news', [NewsController::class, 'getAllNews']);

});

//Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/changePassword', [AuthController::class, 'changePassword']);
Route::post('/register', [AuthController::class, 'register']);

//New JwtMiddleware

Route::get('/news/{id}', [NewsController::class, 'getNewByID'])->middleware('verify.jwt.user_id');//ok
Route::get('/news/category/{id_category}', [NewsController::class, 'getAllByCategory']);//ok
Route::get('/news/user/{id_user}', [NewsController::class, 'getAllByUser']);
Route::get('/get5LatestNews', [NewsController::class, 'get5LatestNews']);//ok
Route::get('/getTop5ViewCount', [NewsController::class, 'getTop5ViewCount']);//ok
Route::get('/getTop5RelatedCategory/{id}', [NewsController::class, 'getTop5RelatedCategory']);//ok
Route::put('/news/update-status-vi/{id}', [NewsController::class, 'updateStatusVi']);//ok
Route::put('/news/update-status-en/{id}', [NewsController::class, 'updateStatusEn']);//ok
Route::put('/news/UpdateStatuses', [NewsController::class, 'UpdateStatuses']);//ok 
Route::post('/news', [NewsController::class, 'saveNews']);//ok
Route::put('/news/{id}', [NewsController::class, 'updateNews']);//ok
Route::put('/news/updateViewCount/{id}', [NewsController::class, 'updateViewCount']);//ok


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


Route::post('/admin/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
Route::post('/admin/upload-image-', [ImageUploadController::class, 'upload1'])->name('upload.image');

Route::post('/admin/authentication', [AuthController::class, 'UserAuthentication']);