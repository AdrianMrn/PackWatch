<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Linkitemspacks extends Model 
{

    protected $table = 'link_items_packs';
    public $timestamps = true;

    public function items()
    {
        return $this->hasMany('Item', 'item_id');
    }

    public function packs()
    {
        return $this->belongsToMany('Pack', 'pack_id');
    }

}