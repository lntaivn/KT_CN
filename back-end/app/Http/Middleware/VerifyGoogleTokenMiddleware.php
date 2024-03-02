<?php

namespace App\Http\Middleware;

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
        // Lấy giá trị của token từ header Authorization
        $token = $request->header('Authorization');

        // Nếu token không tồn tại hoặc không có định dạng đúng, trả về lỗi 401 Unauthorized
        if (!$token || !preg_match('/Bearer\s(\S+)/', $token, $matches)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Tiếp tục xử lý request
        return $next($request);
    }
}
