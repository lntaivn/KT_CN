<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admission_news extends Model
{
    protected $table = 'admission_news'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_admission_news'; // Tên của cột khóa chính

    protected $fillable = [
        'id_user',
        'id_department',
        'title_en',
        'title_vi',
        'content_en',
        'content_vi',
        'is_deleted',
        'status_vi',
        'status_en',
        'thumbnail',
        'is_deleted',
        'view_count',
        'update_by',
        'type_university_en',
        'type_university_vi'
    ];

    // Xác định mối quan hệ với các model khác
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'id_department');
    }
}