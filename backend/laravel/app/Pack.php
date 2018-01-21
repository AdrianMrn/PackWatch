<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Linkitemspacks;

class Pack extends Model 
{

    protected $table = 'packs';
    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function pack()
    {
        return $this->hasMany('App\Linkitemspacks')->get();
    }

    public function packSchedules()
    {
        return $this->hasMany('Schedule');
    }

    public function packUser()
    {
        return $this->belongsTo('User', 'user_id');
    }

    public function amountOfItems($packid)
    {
        return Linkitemspacks::where('pack_id',$packid)->count();
    }

}