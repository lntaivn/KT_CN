<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Models\NewEn;
use App\Models\NewVi;

class NewViEnController extends Controller
{


    public function get(Request $request, $id)
    {
        // giá trị mặc địh
        $lang = $request->input('lang', 'vi');

        $table = ($lang === 'en') ? NewEn::class : NewVi::class;

        $new = $table::find($id);

        if (!$new) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($new, 200);
    }

    public function getAll(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $table = ($lang === 'en') ? NewEn::class : NewVi::class;

        $news = $table::all();

        return response()->json($news, 200);
    }

    public function getAllNewViEN(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        // Lấy thông tin từ cơ sở dữ liệu
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select('new_' . $lang . '.title', 'news.id_new', 'news.created_at', 'news.updated_at', 'news.view_count', 'new_' . $lang . '.content', 'news.thumbnail', 'categories.name as category')
            ->get();

        return response()->json($news, 200);
    }

}