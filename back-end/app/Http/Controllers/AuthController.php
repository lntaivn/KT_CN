<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cookie;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'logout']]);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');

        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json(0);
        }

        $token = JWTAuth::fromUser($user, ['ttl' => 3600]);
        $cookie = Cookie::make('jwt_token', $token, 60); // Cookie expires in 60 minutes

        return response()->json(compact('user'))->withCookie($cookie);
    }

    
    public function logout(Request $request)
    {
        try {
            // Xóa cookie 'jwt_token'
            $cookie = Cookie::forget('jwt_token');

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Đăng xuất thành công'])->withCookie($cookie);
        } catch (\Exception $e) {
            // Xử lý nếu có lỗi xảy ra
            return response()->json(['error' => 'Đã có lỗi xảy ra khi đăng xuất'], 500);
        }
    }
}
