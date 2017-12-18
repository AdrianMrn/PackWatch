<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
    /* return ("kek"); */
});

Route::get('/kek', function () {
    return "kek";
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource('item', 'ItemController');
Route::resource('pack', 'PackController');
Route::resource('linkitemspacks', 'LinkitemspacksController');
Route::resource('schedule', 'ScheduleController');
Route::resource('user', 'UserController');
