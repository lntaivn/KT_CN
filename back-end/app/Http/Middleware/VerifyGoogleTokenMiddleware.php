<?php

namespace App\Http\Middleware;
use Firebase\JWT\JWT;

use Closure;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class VerifyGoogleTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $uid = $request->headers('uid');

        if (!$token || !preg_match('/Bearer\s(\S+)/', $token, $matches)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $token = $matches[1];
      
        try {
            // Giải mã token để lấy dữ liệu
            $decoded = JWT::decode($token, 'your_secret_key', ['HS256']);
            
            // Lấy dữ liệu từ token
            $uid = $decoded->uid;

            // Gán dữ liệu vào request để sử dụng ở các middleware và controller khác
            $request->merge(['uid' => $uid]);

            return $next($request);
        } catch (\Exception $e) {
            // Token không hợp lệ, trả về lỗi 401 Unauthorized
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
