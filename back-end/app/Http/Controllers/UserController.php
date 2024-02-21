<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Psy\Readline\Hoa\Console;

class UserController extends Controller
{
    public function index(Request $request)
{
    $users = User::all();
    $response = response()->json($users);

    // Đính kèm CSRF token vào header của phản hồi
    $response->withCookie(Cookie::forever('XSRF-TOKEN', $request->session()->token()));

    return $response;
}

    public function NewOB(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ]);

        // Create a new user object
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;

        // Save the user object to the database
        $user->save();

        return response()->json(['message' => 'User created successfully'], 201);
    }
    public function LoadOB(Request $request, $id)
    {   
        // Tìm người dùng theo id
        $user = User::find($id);
        if (!$user) {
        
            return response()->json(['error' => 'User not found'], 404);
        }
        $response = response()->json($user);
        return $response;
    }

    
    public function UpdateOB(Request $request, $id)
    {
        // Tìm người dùng cần cập nhật
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        // In ra thông tin người dùng trước khi cập nhật
        dd($user->toArray());
    
        // Cập nhật thông tin người dùng từ dữ liệu gửi từ frontend
        $user->update($request->all());
    
        // In ra thông tin người dùng sau khi cập nhật
        dd($user->toArray());
    
        return response()->json($user);
    }
    
}
