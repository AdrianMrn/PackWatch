<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLinkItemsPacksTable extends Migration {

	public function up()
	{
		Schema::create('link_items_packs', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('item_id')->unsigned();
			$table->integer('pack_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('link_items_packs');
	}
}