<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    public $timestamps = true;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    

    public function packs()
    {
        $packs = $this->hasMany('App\Pack')->get();
        foreach ($packs as $pack)
        {
            $pack->amountOfItems = $pack->amountOfItems($pack->id);
        }

        return $packs;
    }

    public function user_items()
    {
        return $this->hasMany('App\Item')->get();
    }
}
