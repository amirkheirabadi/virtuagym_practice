<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = "plan";
    protected $primaryKey = "id";

    public $timestamps = false;

    public function users()
    {
        return $this->belongsToMany('App\User', 'plan_users', 'plan_id', 'user_id');
    }

    public function days()
    {
        return $this->hasMany('App\PlanDay', 'plan_id', 'id');
    }
}
