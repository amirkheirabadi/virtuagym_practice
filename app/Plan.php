<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = "plan";
    protected $primaryKey = "id";

    public $timestamps = false;
}
