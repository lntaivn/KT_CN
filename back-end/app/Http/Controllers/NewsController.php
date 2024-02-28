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
        $news = News::all();
        return response()->json($news);
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

    public function get5LatestNews(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->select('new_' . $lang . '.title', 'news.id_new', 'news.thumbnail')
            ->orderBy('view_count', 'desc')->take(5)->get();

        return response()->json($news, 200);
    }

    public function getTop5ViewCount(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->select('new_' . $lang . '.title', 'news.id_new', 'news.view_count', 'news.thumbnail')
            ->orderBy('view_count', 'desc')->take(5)->get();

        return response()->json($news, 200);
    }

    public function getTop5RelatedCategory(Request $request)
    {
        $lang = $request->input('lang', 'vi');
        $id_news = $request->id_news;
        $id_category = $request->id_category;
        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select('new_' . $lang . '.title', 'news.id_new', 'news.thumbnail', 'categories.name_' . $lang . ' as category')
            ->where('news.id_category', '=', $id_category)
            ->where('news.id_new', '!=', $id_news)
            ->get();

        return response()->json($news, 200);
    }

    public function saveNews(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'id_category' => 'required|exists:categories,id_category',
            'title_en' => 'required|string',
            'title_vi' => 'required|string',
            'content_en' => 'nullable|string',
            'content_vi' => 'nullable|string',
            'status' => 'boolean',
            'view_count' => 'nullable|integer',
            'thumbnail' => 'nullable|integer'
        ]);

        try {
            // Start a database transaction
            DB::beginTransaction();

            $newEn = NewEn::create([
                'title' => $validatedData['title_en'],
                'content' => $validatedData['content_en'],
                'status' => $validatedData['status']
            ]);

            $newVi = NewVi::create([
                'title' => $validatedData['title_vi'],
                'content' => $validatedData['content_vi'],
                'status' => $validatedData['status']
            ]);

            if ($validatedData['content_en'] === null) {
                $newEn->status = 0;
                $newEn->save();
            }

            if ($validatedData['content_vi'] === null) {
                $newVi->status = 0;
                $newVi->save();
            }
            DB::commit();

            DB::beginTransaction();


            $maxIdEn = NewEn::max('id_en');

            // Tìm id lớn nhất từ bảng new_vi
            $maxIdVi = NewVi::max('id_vi');

            $news = News::create([
                'id_user' => $request->input('id_user'),
                // 'id_en' => $newEn->id,
                // 'id_vi' => $newVi->id,
                'id_en' => $maxIdEn,
                'id_vi' => $maxIdVi,
                'id_category' => $request->input('id_category'),
                'thumbnail' => $request->input('thumbnail'),
                'view_count' => $validatedData['view_count'],
                'status' => $validatedData['status']
            ]);



            DB::commit();

            return response()->json(['message' => 'Lưu thành công'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Lưu thất bại', $e], 500);
        }
    }

}