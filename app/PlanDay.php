<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanDay extends Model
{
    protected $table = "plan_days";
    protected $primaryKey = "id";

    public $timestamps = false;

    public function exercises()
    {
        return $this->belongsToMany('App\Exercise', 'exercise_instances', 'day_id', 'exercise_id')->withPivot('exercise_duration', 'order');
    }

    public function plan()
    {
        return $this->belongsTo('App\Plan', 'plan_id');
    }
}
