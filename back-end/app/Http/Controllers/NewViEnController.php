<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Models\NewEn;
use App\Models\NewVi;

class NewViEnController extends Controller
{


    public function getDetailNews($id)
    {

        $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.content_en',
                'news.content_vi',
                'news.view_count',
                'news.updated_at',
                'news.thumbnail',
                'news.id_category',
                'categories.name_en as category_name_en',
                'categories.name_vi as category_name_vi',
                'news.status_vi',
                'news.status_en'
            )
            ->where('news.id_new', '=', $id)
            ->get();


        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getAll(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $table = ($lang === 'en') ? NewEn::class : NewVi::class;

        $news = $table::all();

        return response()->json($news, 200);
    }

    public function getAllNewViEN()
    {
        $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.content_en',
                'news.content_vi',
                'news.view_count',
                'news.updated_at',
                'news.thumbnail',
                'news.id_category',
                'categories.name_en as category_name_en',
                'categories.name_vi as category_name_vi',
                'news.status_vi',
                'news.status_en'
            )
            ->get();

        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

}