<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewVi;

class NewViController extends Controller
{
    public function getAll()
    {
        $newVis = NewVi::all();

        return response()->json($newVis, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'status' => 'boolean'
        ]);

        $newVi = NewVi::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'status' => $request->input('status', true)
        ]);

        return response()->json($newVi, 201);
    }

    public function get($id)
    {
        $newVi = NewVi::find($id);

        if (!$newVi) {
            return response()->json(['message' => 'Bài viết mới không tồn tại'], 404);
        }

        return response()->json($newVi, 200);
    }
}