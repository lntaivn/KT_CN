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

    public function getAll()
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                )
                ->where('admission_news.is_deleted', '=', 0)
                ->orderBy('admission_news.created_at')
                ->get();

            $responseData = [];
            foreach ($admission_news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }

            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get all admission news', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAdmissionNewsById($id)
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                )
                ->where('admission_news.is_deleted', '=', 0)
                ->where('admission_news.id_admission_news', '=', $id)
                ->orderBy('admission_news.created_at')
                ->get();

            $responseData = [];
            foreach ($admission_news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }
            if ($responseData == []) {
                return response()->json(['message' => 'Not found news'], 404);
            }

            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get all admission news', 'error' => $e->getMessage()], 500);
        }
    }
}
