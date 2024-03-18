<?php

namespace App\Http\Controllers;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    // Lấy tất cả các bản ghi
    public function getAll()
    {
        $programs = Program::where('status', 1)->get();
        return response()->json(['programs' => $programs], 200);
    }

    public function getAllhidden()
    {
        $programs = Program::where('status', 0)->get();
        return response()->json(['programs' => $programs], 200);
    }
    

    // Lấy thông tin của một bản ghi theo ID
    public function getDetails($id)
    {
        $program = Program::findOrFail($id);
        return response()->json(['program' => $program], 200);
    }

    // Thêm một bản ghi mới
    public function create(Request $request)
    {
        $program = new Program();
        $program->id_user = $request->input('id_user');
        $program->id_majors = $request->input('id_majors');
        $program->content = $request->input('content');
        $program->name_program = $request->input('name_program');

        error_log($request);


        $program->status = $request->input('status', true); // Default status is true if not provided
        $program->save();

        return response()->json(['message' => 'Program created successfully', 'program' => $program], 201);
    }

    // Xóa một bản ghi
    public function delete($id)
    {
        $program = Program::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully'], 200);
    }

    // Sửa thông tin một bản ghi
    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);
        $program->id_user = $request->input('id_user');
        $program->id_majors = $request->input('id_majors');
        $program->content = $request->input('content');
        $program->name_program = $request->input('name_program');
        $program->status = $request->input('status', true); 
        $program->save();

        return response()->json(['message' => 'Program updated successfully', 'program' => $program], 200);
    }

    public function updateStatus(Request $request)
    {
        $id_programs = $request->input('id_programs', []);

        foreach ($id_programs as $id_program) {
            $program = Program::findOrFail($id_program);
            $program->status = $request->input('status', true); 
            $program->save();
        }

        return response()->json(['message' => 'Program status updated successfully'], 200);
    }
}
