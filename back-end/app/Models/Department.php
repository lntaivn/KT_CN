<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Department extends Model
{
    protected $primaryKey = 'id_department';

    protected $table = 'departments';

    protected $fillable = [
        'name_department_vi',
        'name_department_en',
    ];
}