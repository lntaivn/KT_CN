<?php

// app/Http/Controllers/ImageUploadController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            if ($image->isValid()) {
                $imageName = time() . '_' . $image->getClientOriginalName();

                $image->move(public_path('images'), $imageName);

                // Sử dụng URL chứa cổng 8000
                $imageUrl = asset('images/' . $imageName, true);

                return response()->json(['url' => $imageUrl]);
            } else {
                return response()->json(['error' => 'Invalid file uploaded'], 400);
            }
        } else {
            return response()->json(['error' => 'No file uploaded'], 400);
        }
    }
}


