<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::all();
        return response()->json($news);
    }
    public function getNewByGlug($id) {
        $news = News::find($id);
        return response()->json($news);
    }
    public function saveNews(Request $request) {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->content = $request->content;
        $news->view_count = $request->view_count;
        $news->time_upload = $request->time_upload;
        $news->image = $request->image;
        $news->save();

        return response()->json($news);
    }

}
