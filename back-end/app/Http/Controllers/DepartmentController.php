<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function createDepartment(Request $request)
    {
        $validatedData = $request->validate([
            'name_department_vi' => 'required|string|max:100',
            'name_department_en' => 'required|string|max:100',
        ]);

        $department = Department::create([
            'name_department_vi' => $validatedData['name_department_vi'],
            'name_department_en' => $validatedData['name_department_en'],
        ]);

        return response()->json(['message' => 'Department created successfully', 'department' => $department], 201);
    }
}
