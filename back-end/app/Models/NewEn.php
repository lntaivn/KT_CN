<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class NewEn extends Model
{
    protected $primaryKey = 'id_en';

    public function news()
    {
        return $this->belongsTo(News::class, 'id_new');
    }
}
