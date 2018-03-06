<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "user";
    protected $primaryKey = "id";

    public $timestamps = false;

    public function plans()
    {
        return $this->belongsToMany('App\Plan', 'plans_users', 'user_id', 'plan_id');
    }
}
