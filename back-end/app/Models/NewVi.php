<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewVi extends Model
{
    protected $table = 'new_vi';
    protected $primaryKey = 'id_vi'; 

    protected $fillable = [
        'title',
        'content',
        'status'
    ];
}
