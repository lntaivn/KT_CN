<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewEn extends Model
{
    protected $table = 'new_vi';
    protected $primaryKey = 'id_vi'; 

    protected $fillable = [
        'title',
        'count_view',
        'thumbnail',
        'status'
    ];
}
