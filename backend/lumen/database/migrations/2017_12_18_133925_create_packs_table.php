<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePacksTable extends Migration {

	public function up()
	{
		Schema::create('packs', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->softDeletes();
			$table->string('name', 255);
			$table->string('color', 255);
			$table->integer('user_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('packs');
	}
}