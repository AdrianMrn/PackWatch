<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserController extends Controller 
{

  public function getPacks(Request $request)
  {
    $user_id = $request->user()->id;
    $user_packs = User::find($user_id)->packs();
    return $user_packs;
  }

  public function getItems(Request $request)
  {
    $user_id = $request->user()->id;
    $user_items = User::find($user_id)->user_items();
    return $user_items;
  }

  // Registering a user
  public function create(Request $request)
  {
    $v = validator($request->only('email', 'name', 'password'), [
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:6',
    ]);

    if ($v->fails()) {
        return response()->json($v->errors()->all(), 400);
    }
    $data = request()->only('email','name','password');

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
    ]);

    $client = \Laravel\Passport\Client::where('password_client', 1)->first();

    $request->request->add([
        'grant_type'    => 'password',
        'client_id'     => $client->id,
        'client_secret' => $client->secret,
        'username'      => $data['email'],
        'password'      => $data['password'],
        'scope'         => null,
    ]);
    
    // Fire off the internal request. 
    $proxy = Request::create(
        'oauth/token',
        'POST'
    );

    return \Route::dispatch($proxy);
  }

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index()
  {
    
  }

  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store(Request $request)
  {
    
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return Response
   */
  public function edit($id)
  {
    
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    
  }
  
}

?>