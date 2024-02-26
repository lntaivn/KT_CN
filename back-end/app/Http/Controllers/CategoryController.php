<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getAll()
    {
        $categories = Category::all();

        return response()->json($categories, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $category = Category::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($category, 201);
    }

    public function get($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Thế loại không tồn tại'], 404);
        }

        return response()->json($category, 200);
    }
}
