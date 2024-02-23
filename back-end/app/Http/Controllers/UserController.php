<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Hiển thị danh sách các users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all(); // Lấy tất cả các users từ model User
        return response()->json($users); // Trả về view với dữ liệu users
    }

    /**
     * Thêm một user mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            //Thêm validation rules khác nếu cần thiết
        ]);

        // Tạo một user mới với dữ liệu từ request
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            //Thêm các trường khác nếu cần thiết
        ]);

        // Trả về thông báo và dữ liệu user đã được tạo
        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }
}
