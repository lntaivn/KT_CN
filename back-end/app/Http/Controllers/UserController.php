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
        try {
            $users = User::all();
            
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching users'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.

     * Thêm một user mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users,email',
            ]);

            $user = User::create([
                'email' => $request->input('email'),
            ]);
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while processing your request.'], 500);
        }
    }
    public function updateRole(Request $request)
    {
        try {
            $role = $request->input('role');
            $id = $request->input('id_user');

            $user = User::find($id);

            if ($user) {
                // Set the role based on the value of the $role variable
                if ($role === 'admin') {
                    $user->role = 1;
                } elseif ($role === 'user') {
                    $user->role = 0;
                } else {
                    // Invalid role provided
                    return response()->json(['message' => 'Invalid role provided'], 400);
                }

                $user->save();
                return response()->json([
                    'message' => 'Role updated successfully',
                    'id_user' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Invalid user ID'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the role'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found or could not be deleted'], 404);
        }
    }

    public function findByIdUser($id_user)
    {
        try {
            $user = User::findOrFail($id_user);
            
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    // public function update(Request $request, $id)
    // {
    //     // Validate dữ liệu đầu vào
    //     $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users,email,' . $id,
    //     ]);

    //     // Tìm người dùng cần cập nhật
    //     $user = User::findOrFail($id);

    //     // Cập nhật thông tin người dùng
    //     $user->name = $request->name;
    //     $user->email = $request->email;
    //     $user->save();

    //     // Trả về thông tin của người dùng đã cập nhật
    //     return response()->json($user, 200);
    // }

}