<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
    protected $primaryKey = 'id_category';

    public function news()
    {
        return $this->belongsTo(News::class, 'id_new');
    }
}
