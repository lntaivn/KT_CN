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
    Route::get('/admin/news', [NewsController::class, 'getAllNewsAdmin']);//ok
    Route::post('/admin/news', [NewsController::class, 'saveNews']);//ok
    Route::get('/admin/news/{id}', [NewsController::class, 'getNewByIDAdmin']);//ok
    Route::put('/admin/news/{id}', [NewsController::class, 'updateNews']);//ok
    Route::get('/admin/news-hidden', [NewsController::class, 'getAllNewsAdminHidden']);//ok
    Route::get('/admin/news-hidden/{id}', [NewsController::class, 'getNewByIDAdminHidden']);//ok
    Route::put('/admin/news/update/status-en/{id}', [NewsController::class, 'updateStatusEn']);
    Route::put('/admin/news/update/status-vi/{id}', [NewsController::class, 'updateStatusVi']);
    Route::put('/admin/news/update/UpdateStatuses', [NewsController::class, 'UpdateStatuses']);
    Route::put('/admin/news/softDelete/{id}', [NewsController::class, 'updateDeleted']);
    Route::put('/admin/news/soft-list/delete', [NewsController::class, 'updateManyDeleted']);
    Route::delete('/admin/news/force-delete', [NewsController::class, 'deleteNews']);
    Route::get('/admin/getCurrentUser', [AuthController::class, 'getCurrentUser']);
    Route::get('/news/search/TitleCategoryIsDeleted', [NewsController::class, 'searchByTitleCategoryIsDeleted']);//ok

});


//category
Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/categories', [CategoryController::class, 'getAll']);
    Route::get('/admin/category/{id}', [CategoryController::class, 'getCategoryById']);
    Route::post('/admin/category', [CategoryController::class, 'create']);
    Route::put('/admin/category/{id}', [CategoryController::class, 'update']);
    Route::put('/admin/category/soft-list/delete', [CategoryController::class, 'updateManyDeleted']);
});

Route::post('/admin/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
Route::post('/admin/upload-image-', [ImageUploadController::class, 'upload1'])->name('upload.image');

//users
Route::middleware(['check.jwt', 'check.role'])->group(function () {
    Route::get('admin/users', [UserController::class, 'index']);
    Route::get('admin/users/{id_user}', [UserController::class, 'findByIdUser']);
    Route::post('admin/users', [UserController::class, 'store']);
    Route::delete('admin/users/{id_user}', [UserController::class, 'destroy']);
    // Route::put('admin/users/{id_user}', [UserController::class, 'update']);
    Route::put('admin/users/soft-delete/{id}', [UserController::class, 'softDelete']);
    Route::put('admin/users/role/change', [UserController::class, 'updateRole']);
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
Route::get('/news/search/TitleCategory', [NewsController::class, 'searchByTitleCategory']);//ok



//Category
Route::get('/categories', [CategoryController::class, 'getAll']);
Route::get('/category/{id_category}', [CategoryController::class, 'get']);

// Route::post('/admin/authentication', [AuthController::class, 'UserAuthentication']);