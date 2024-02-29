<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewEn;

class NewEnController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'status' => 'boolean'
        ]);

        $newEn = NewEn::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'status' => $request->input('status', true)
        ]);

        return response()->json($newEn, 201);
    }

    public function updateStatus($id)
    {
        try {
            $newVi = NewEn::find($id);

            if ($newVi) {
                $newVi->status = !$newVi->status;
                $newVi->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công new_en ',
                    'id_vi' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái'], 500);
        }
    }

}