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


//---------------------------------Admin-------------------------------------//

//admin not role

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/news', [NewsController::class, 'getAllNewsAdmin']);
    Route::post('/admin/news', [NewsController::class, 'saveNews']);//ok
    Route::put('/admin/news/{id}', [NewsController::class, 'updateNews']);
    Route::get('/admin/news/{id}', [NewsController::class, 'getNewByIDAdmin']);//ok
    Route::put('/admin/news/update/status-en/{id}', [NewsController::class, 'updateStatusEn']);
    Route::put('/admin/news/update/status-vi/{id}', [NewsController::class, 'updateStatusVi']);
    Route::put('/admin/news/update/UpdateStatuses', [NewsController::class, 'UpdateStatuses']);
    Route::put('/admin/news/softDelete/{id}', [NewsController::class, 'updateDeleted']);
    Route::put('/admin/news/soft-list/delete', [NewsController::class, 'updateManyDeleted']);
    Route::delete('/admin/news', [NewsController::class, 'deleteNews']);

    Route::get('/admin/getCurrentUser', [AuthController::class, 'getCurrentUser']);
});


//category
Route::middleware('check.jwt')->group(function () {
    Route::post('/admin/category', [CategoryController::class, 'create']);
});

//upload img
Route::middleware('check.jwt')->group(function () {
    Route::post('/admin/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
    Route::post('/admin/upload-image-', [ImageUploadController::class, 'upload1'])->name('upload.image');
});

//users
Route::middleware(['check.jwt', 'check.role'])->group(function () {
    Route::get('admin/users', [UserController::class, 'index']);
    Route::get('admin/users/{id_user}', [UserController::class, 'findByIdUser']);
    Route::post('admin/users', [UserController::class, 'store']);
    Route::delete('admin/users/{id_user}', [UserController::class, 'destroy']);
    Route::put('admin/users/{id_user}', [UserController::class, 'update']);

});

//Admin: check role
Route::middleware(['check.jwt', 'check.role'])->group(function () {
    Route::get('/admin/news/test', [NewsController::class, 'getAllNews']);
    Route::get('/news/user/{id_user}', [NewsController::class, 'getAllByUser']);
});



//----------------------------------User---------------------------------//
//'top 5
Route::get('news/get5LatestNews', [NewsController::class, 'get5LatestNews']);//ok
Route::get('news/getTop5ViewCount', [NewsController::class, 'getTop5ViewCount']);//ok
Route::get('news/getTop5RelatedCategory/{id}', [NewsController::class, 'getTop5RelatedCategory']);//ok

//news
Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/news/{id}', [NewsController::class, 'getNewByID']);//ok
Route::get('/news/category/{id_category}', [NewsController::class, 'getAllByCategory']);//ok
Route::put('/news/update/viewCount/{id}', [NewsController::class, 'updateViewCount']);//ok

//Category
Route::get('/categories', [CategoryController::class, 'getAll']);
Route::get('/category/{id_category}', [CategoryController::class, 'get']);


// Route::post('/admin/authentication', [AuthController::class, 'UserAuthentication']);