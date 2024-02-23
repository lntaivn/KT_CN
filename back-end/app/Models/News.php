<?php

namespace App\Models;

<<<<<<< HEAD
use Illuminate\Database\Eloquent\Model;


class News extends Model
{
    protected $primaryKey = 'id_new';

    public function newEn()
    {
        return $this->hasOne(NewEn::class, 'id_new');
    }
}

=======
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    public $timestamps = false;
    protected $table = 'news'; 
}
>>>>>>> 953b3e70e3e3c9fa03c8b30615825db1f9ee3db4
