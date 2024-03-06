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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'logout', 'getCurrentUser']]);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $UID = $request->input('uid');
        $photoURL = $request->input('photoURL');
        $user = User::where('email', $email)->first();
        if ($user) {
            if ($user->UID) {
                if ($user->UID !== $UID) {
                    return response()->json("UId fail", 404);
                }
                if ($user->photoURL !== $photoURL) {
                    $user->photoURL = $photoURL;
                    $user->save();
                }
            } else {
                $user->UID = $UID;
                $user->photoURL = $photoURL;
                $user->photoURL = $photoURL;
                $user->save();
                if ($user->photoURL !== $photoURL) {
                    $user->photoURL = $photoURL;
                    $user->save();
                }
            }

            // Tạo token với TTL là 30 ngày
            $token = JWTAuth::fromUser($user, ['ttl' => 2592000]);

            if ($token) {
                // Tạo cookie với TTL là 30 ngày
                $cookie = Cookie::make('jwt_token', $token, 2592000);
                return response()->json(compact('user'))->withCookie($cookie);
            } else {
                return response()->json("Token error", 500);
            }
        } else {
            return response()->json("Error", 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $cookie = Cookie::forget('jwt_token');

            return response()->json(['message' => 'Đăng xuất thành công'])->withCookie($cookie);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đã có lỗi xảy ra khi đăng xuất'], 500);
        }
    }

    public function getCurrentUser(Request $request)
    {
        try {
            // Trả về phản hồi thành công
            return response()->json($request->user_info);
        } catch (\Exception $e) {
            // Xử lý nếu có lỗi xảy ra
            return response()->json(['error' => 'Đã có lỗi xảy ra'], 500);
        }
    }
}
