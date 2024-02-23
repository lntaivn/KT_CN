<?php

// app/Http/Controllers/ImageUploadController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request) {

        $folder = "uploads/" . date('Y/m/d');
        $fileName = date('H-i') . '-' . $request->file('upload')->getClientOriginalName();
        $url = $request->file('upload')->move($folder, $fileName);
        
        $path = env('APP_URL') . '/' . $folder . '/' . $fileName;

        if ($request->input('res_filename')) {
            return response(["fileUrl" => $folder . '/' . $fileName]);
        }

        return response([
                    "fileName" => $fileName,
                    "uploaded" => 1,
                    "url" => $path
                ]);
    }
}


