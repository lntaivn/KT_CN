<?php

namespace App\Http\Controllers;

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

}