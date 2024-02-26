<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewEn;

class NewEnController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'status' => 'boolean'
        ]);

        $newEn = NewEn::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'status' => $request->input('status', true)
        ]);

        return response()->json($newEn, 201);
    }



}