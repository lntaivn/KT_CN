<?php

namespace App\Http\Middleware;
use Exception;
use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Illuminate\Support\Facades\DB; 
class CheckJwtToken
{
    public function handle($request, Closure $next)
    {
        try {
            $token = $request->header('Authorization');
            if (!$token) {
                throw new Exception('Token not found in header.');
            }
            $token = explode(" ", $token)[1];

            $payload = JWTAuth::setToken($token)->authenticate();
           

            $email = str_replace('\\', '', $payload['email']);
            $id_user = str_replace('\\', '', $payload['id_user']);

            $user = DB::table('users')->where('id_user', $id_user)->where('email', $email)->first();
            if (!$user) {
                throw new Exception('User not authenticated.');
            }
            return $next($request);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}
