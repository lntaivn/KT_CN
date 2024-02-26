<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewEn extends Model
{
    protected $table = 'new_en'; 
    protected $primaryKey = 'id_en'; 

    protected $fillable = [
        'title',
        'count_view',
        'thumbnail',
        'status'
    ];
}
