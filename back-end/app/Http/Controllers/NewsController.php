<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function getAllNews()
    {
        $news = News::all();
        return response()->json($news);
    }


    public function getAllByCategory($category_id)
    {
        $news = News::where('id_category', $category_id)->get();

        return response()->json($news);
    }

    public function getCategoryByNews($news_id)
    {
        $news = News::find($news_id);

        if (!$news) {
            return response()->json(['error' => 'Tin tức không tồn tại'], 404);
        }

        $category = $news->category;

        if (!$category) {
            return response()->json(['error' => 'Không có danh mục cho tin tức này'], 404);
        }

        return response()->json($category);
    }

    public function getCategoryAdmissionById($id): JsonResponse
    {
        $news = News::where('id_new', $id)->where('category', 'admissions')->first();
        if (!$news) {
            return response()->json(['error' => 'News not found'], 404);
        }
        return response()->json($news);
    }
    public function getTop5RelativeCategoryNewsById($id): JsonResponse 
    {
        $newsItems = News::where('id_new', $id)->get();

        if ($newsItems->isEmpty()) {
            return response()->json(['error' => 'News items not found'], 404);
        }
        $category = $newsItems->first()->category;

        $relatedNews = News::where('category', $category)
                            ->where('id_new', '!=', $id) 
                            ->orderBy('created_at', 'desc')
                            ->take(5)
                            ->get();

        return response()->json($relatedNews);
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
