<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model 
{

    protected $table = 'schedules';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function schedule()
    {
        return $this->belongsTo('Pack', 'pack_id');
    }

}