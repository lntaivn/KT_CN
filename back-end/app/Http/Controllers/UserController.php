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

}
