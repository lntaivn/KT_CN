<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $table = 'news'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_new'; // Tên của cột khóa chính

    protected $fillable = [
        'id_user',
        'id_category',
        'title_en',
        'title_vi',
        'content_en',
        'content_vi',
        'status_vi',
        'status_en',
        'thumbnail',
        'view_count',
    ];

    // Xác định mối quan hệ với các model khác
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}