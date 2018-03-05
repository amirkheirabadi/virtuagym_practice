<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $table = 'exercise';
    protected $primaryKey = 'id';

    public $timestamps = false;
}
