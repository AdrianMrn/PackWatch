<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pack extends Model 
{

    protected $table = 'packs';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function pack()
    {
        return $this->hasMany('Linkitemspacks');
    }

    public function packSchedules()
    {
        return $this->hasMany('Schedule');
    }

    public function packUser()
    {
        return $this->belongsTo('User', 'user_id');
    }

}