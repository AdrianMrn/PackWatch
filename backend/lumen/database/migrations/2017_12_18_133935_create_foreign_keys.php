<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('packs', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('users')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('link_items_packs', function(Blueprint $table) {
			$table->foreign('item_id')->references('id')->on('items')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('link_items_packs', function(Blueprint $table) {
			$table->foreign('pack_id')->references('id')->on('packs')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('schedules', function(Blueprint $table) {
			$table->foreign('pack_id')->references('id')->on('packs')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
	}

	public function down()
	{
		Schema::table('packs', function(Blueprint $table) {
			$table->dropForeign('packs_user_id_foreign');
		});
		Schema::table('link_items_packs', function(Blueprint $table) {
			$table->dropForeign('link_items_packs_item_id_foreign');
		});
		Schema::table('link_items_packs', function(Blueprint $table) {
			$table->dropForeign('link_items_packs_pack_id_foreign');
		});
		Schema::table('schedules', function(Blueprint $table) {
			$table->dropForeign('schedules_pack_id_foreign');
		});
	}
}