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
    public function getAll()
    {
        try {
            $department = Department::all();
            return response()->json($department, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getDepartmentById($id)
    {
        try {
            $Department = Department::findOrFail($id);
            return response()->json($Department, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không tìm thấy danh mục'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name_department_vi' => 'required|string',
                'name_department_en' => 'required|string',
            ]);

            $department_vi = $validatedData['name_department_vi'];
            $department_en = $validatedData['name_department_en'];

            $Department = Department::find($id);

            $Department->name_department_vi = $department_vi;
            $Department->name_department_en = $department_en;
            $Department->save();

            return response()->json([
                'message' => 'Cập nhật Department thành công',
                'id_department' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật Department', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function updateManyDeleted(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_department' => 'required|array',
                'deleted' => 'required|boolean',
            ]);
    
            $id_department_list = $validatedData['id_department'];
            $deleted = $validatedData['deleted'];
    
            foreach ($id_department_list as $id_department) {
                $Department = Department::where('id_department', $id_department)->exists();
    
                if (!$Department) {
                    $category = Department::find($id_department);
                    if ($category) {
                        $category->delete();
                    }
                }
            }
    
            return response()->json([
                'message' => 'Cập nhật trạng thái xóa thành công',
                'id_department_list' => $id_department_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

}
