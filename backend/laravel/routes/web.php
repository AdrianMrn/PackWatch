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
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Register
Route::post('/register','UserController@create');






//DEPRECATED --> USE /API/...
//
//
//
//API routes. All of these require a bearer token (see examples in /backend/authtest)
Route::group(['middleware' => ['auth:api']], function () {
    Route::resources([
        'item' => 'ItemController', // POST to /item with name & color to create a new item: responds with message & id of created item
        'pack' => 'PackController', // POST to /pack with name & color to create a new pack: responds with message & id of created pack
        'schedule' => 'ScheduleController',
        'link' => 'LinkitemspacksController', // POST to /link with pack_id & item_id to link a pack and an item: responds with message & id of link
        /* 'user' => 'UserController' */
    ]);

    Route::get('/getuserpacks', 'UserController@getPacks'); // Returns an array of all of a users' packs without the items, no querystring (user id from token)
    Route::get('/getuseritems', 'UserController@getItems'); // Returns an array of all of a users' items, no querystring (user id from token)

    Route::get('/getpackitems', 'PackController@getPackItems'); // Returns an array of all of a packs' items, querystring: ?id=[pack_id]

    // Route to test if api auth is configured correctly
    Route::get('/authtest', function () {
        return "authentication successful!";
    });
});