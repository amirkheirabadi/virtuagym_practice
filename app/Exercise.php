<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $table = 'exercise';
    protected $primaryKey = 'id';

    public $timestamps = false;

    public function days()
    {
        return $this->belongsToMany('App\PlanDay', 'exercise_instances', 'exercise_id', 'day_id');
    }
}
