<?php

namespace App\Http\Controllers;

use App\Models\Admission_news;
use Illuminate\Http\Request;

class AdmissionNewsController extends Controller
{
    public function createAdmission(Request $request)
    {
        try {
            if (!$request->has('user_info')) {
                $user_info = $request->user_info;
            }
            // Validate the request data
            $validatedData = $request->validate([
                'id_department' => 'required|integer',
                'title_vi' => 'required|string',
                'title_en' => 'required|string',
                'content_vi' => 'nullable|string',
                'content_en' => 'nullable|string',
                'thumbnail' => 'nullable|string',
                'type_university_vi' => 'required|string|in:Sau đại học,Đại học',
                'type_university_en' => 'required|string|in:Higher education,Undergraduate',
            ]);

            // Create a new admission news record
            $admissionNews = Admission_news::create([
                'id_user' => $user_info->id_user,
                'update_by' => $user_info->id_user,
                'id_department' => $validatedData['id_department'],
                'title_vi' => $validatedData['title_vi'],
                'title_en' => $validatedData['title_en'],
                'content_vi' => $validatedData['content_vi'],
                'content_en' => $validatedData['content_en'],
                'thumbnail' => $validatedData['thumbnail'],
                'type_university_vi' => $validatedData['type_university_vi'],
                'type_university_en' => $validatedData['type_university_en'],
            ]);

            return response()->json(['message' => 'Admission news created successfully', 'admission_news' => $admissionNews], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create admission news', 'error' => $e->getMessage()], 500);
        }
    }
}
