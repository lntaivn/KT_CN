<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_new'; // Tên của cột khóa chính

    protected $fillable = [
        'id_user',
        'id_en',
        'id_vi',
        'id_category',
        'time_upload',
        'time_update',
        'thumbnail',
        'view_count',
        'status'
    ];

    // Xác định mối quan hệ với các model khác
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function englishNews()
    {
        return $this->belongsTo(NewEn::class, 'id_en');
    }

    public function vietnameseNews()
    {
        return $this->belongsTo(NewVi::class, 'id_vi');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}