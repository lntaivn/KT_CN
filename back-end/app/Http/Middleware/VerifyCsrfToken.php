<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */

    protected $addHttpCookie = true;
    protected $except = [
<<<<<<< HEAD
        //
        'http://127.0.0.1:8000/users'
=======
        '*'
>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
    ];
}
