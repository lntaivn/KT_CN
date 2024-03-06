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
            'name_vi' => 'required|string',
            'name_en' => 'required|string',
        ]);

        $category = Category::create([
            'name_vi' => $request->input('name_vi'),
            'name_en' => $request->input('name_en'),
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

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name_vi' => 'required|string',
                'name_en' => 'required|string',
            ]);

            $name_vi = $validatedData['name_vi'];
            $name_en = $validatedData['name_en'];

            $Category = Category::find($id);

            $Category->name_vi = $name_vi;
            $Category->name_en = $name_en;
            $Category->save();

            return response()->json([
                'message' => 'Cập nhật category thành công',
                'id_category' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật category', 'error' => $e->getMessage()], 500);
        }
    }
}