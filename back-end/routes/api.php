<?php

use App\Http\Controllers\CategoryController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/changePassword', [AuthController::class, 'changePassword']);
Route::post('/register', [AuthController::class, 'register']);

//New
Route::get('/news', [NewsController::class, 'getAllNews']);//ok
Route::get('/news/{id}', [NewsController::class, 'getNewByID']);//ok
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

