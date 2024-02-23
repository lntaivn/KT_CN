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
<<<<<<< HEAD
     * Store a newly created resource in storage.
=======
     * Thêm một user mới.
>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
<<<<<<< HEAD
        // Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
        ]);

        // Tạo một người dùng mới
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        // Trả về thông tin của người dùng vừa tạo
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        // Tìm người dùng cần cập nhật
        $user = User::findOrFail($id);

        // Cập nhật thông tin người dùng
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        // Trả về thông tin của người dùng đã cập nhật
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function findByIdUser($id)
    {
        $user = User::findOrFail($id);


        return response()->json($user);
=======
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
>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
    }
}
