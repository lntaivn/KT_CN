<?php

namespace App\Http\Controllers;

use App\Models\NewEn;
use App\Models\NewVi;
use Illuminate\Http\JsonResponse;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function getAllNews()
    {
        $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.view_count',
                'news.updated_at',
                'news.created_at',
                'news.thumbnail',
                'news.id_category',
                'news.status_vi',
                'news.status_en'
            )->get();

        return response()->json($news, 200);
    }


    public function getAllByCategory($category_id)
    {
        try {
            $news = News::where('id_category', $category_id)->get();
            if ($news->isEmpty()) {
                return response()->json(['message' => 'Không có tin tức nào trong danh mục này.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }

    public function getAllByUser($id)
    {
        try {
            $news = News::where('id_user', $id)->get();
            if ($news->isEmpty()) {
                return response()->json(['message' => 'user chưa có bài đăng nào.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }

    public function getNewByID($id)
    {
        try {
            $news = News::find($id);
            if (!$news) {
                return response()->json(['message' => 'ID không tồn tại.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }


    public function create(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'id_en' => 'required|exists:new_en,id_en',
            'id_vi' => 'required|exists:new_vi,id_vi',
            'id_category' => 'required|exists:categories,id_category',
            'view_count' => 'nullable|integer',
            'thumbnail' => 'nullable|string',
            'status' => 'boolean',
        ]);

        $news = News::create([
            'id_user' => $request->input('id_user'),
            'id_en' => $request->input('id_en'),
            'id_vi' => $request->input('id_vi'),
            'id_category' => $request->input('id_category'),
            'view_count' => $request->input('view_count'),
            'thumbnail' => $request->input('thumbnail'),
            'status' => $request->input('status', true),
        ]);

        return response()->json($news, 201);
    }

    public function get5LatestNews()
    {
        $news = News::select(
            'news.id_new',
            'news.title_vi',
            'news.title_en',
            'news.view_count',
            'news.updated_at',
            'news.created_at',
            'news.thumbnail',
            'news.id_category',
            'news.status_vi',
            'news.status_en'
        )->orderBy('created_at', 'desc')->take(5)->get();

        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getTop5ViewCount()
    {
        $news = News::select(
            'news.id_new',
            'news.title_vi',
            'news.title_en',
            'news.view_count',
            'news.updated_at',
            'news.created_at',
            'news.thumbnail',
            'news.id_category',
            'news.status_vi',
            'news.status_en'
        )->orderBy('view_count', 'desc')->take(5)->get();

        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getTop5RelatedCategory($id_new)
    {
        $news = News::join('categories', 'categories.id_category', '=', 'news.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.view_count',
                'news.updated_at',
                'news.created_at',
                'news.thumbnail',
                'news.id_category',
                'news.status_vi',
                'news.status_en'
            )
            ->where('news.id_category', '=', function ($query) use ($id_new) {
                $query->select('id_category')
                    ->from('news')
                    ->where('id_new', '=', $id_new);
            })
            ->where('news.id_new', '!=', $id_new)
            ->take(5)
            ->get();
        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }
        return response()->json($news, 200);
    }

    public function saveNews(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'id_category' => 'required|exists:categories,id_category',
            'title_en' => 'nullable|string',
            'title_vi' => 'nullable|string',
            'content_en' => 'nullable|string',
            'content_vi' => 'nullable|string',
            'view_count' => 'nullable|integer',
            'thumbnail' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            $news = News::create([
                'id_user' => $request->input('id_user'),
                'id_category' => $request->input('id_category'),
                'content_vi' => $request->input('content_vi'),
                'content_en' => $request->input('content_en'),
                'title_vi' => $request->input('title_vi'),
                'title_en' => $request->input('title_en'),
                'thumbnail' => $request->input('thumbnail'),
                'view_count' => $validatedData['view_count'],
            ]);



            if ($validatedData['content_en'] === null) {
                $news->status_en = 0;
                $news->save();
            }

            if ($validatedData['content_vi'] === null) {
                $news->status_vi = 0;
                $news->save();
            }
            DB::commit();

            return response()->json(['message' => 'Lưu thành công'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Lưu thất bại', $e], 500);
        }
    }

    public function getNewViEnNewsById($id_new)
    {
        $news = News::join('new_en', 'news.id_en', '=', 'new_en.id_en')
            ->join('new_vi', 'news.id_vi', '=', 'new_vi.id_vi')
            ->join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'new_en.title' . ' as title_en',
                'new_vi.title' . ' as title_vi',
                'new_en.content' . ' as content_en',
                'new_vi.content' . ' as content_vi',
                'news.id_category',
                'news.thumbnail',
                'news.status'
            )
            ->where('news.id_new', '=', $id_new)
            ->get();

        return response()->json($news, 200);
    }



}