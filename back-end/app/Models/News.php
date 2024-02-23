<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class News extends Model
{
    protected $primaryKey = 'id_new';

    public function newEn()
    {
        return $this->hasOne(NewEn::class, 'id_new');
    }
}

