<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Linkitemspacks, App\Pack, App\Item;

class LinkitemspacksController extends Controller 
{

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index()
  {
    
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return Response
   */
  public function create()
  {
    
  }

  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store(Request $request)
  {
    // Protecting against other users changing someone's packs/items
    $user_id = $request->user()->id;
    $item = Item::where('id', $request->item_id)->firstOrFail();
    $pack = Pack::where('id', $request->pack_id)->firstOrFail();
    if ($item->user_id != $user_id || $pack->user_id != $user_id)
    {
      return response()->json([
        'message' => 'incorrect request'
      ]);
    }

    $link = new Linkitemspacks;
    $link->item_id = $request->item_id;
    $link->pack_id = $request->pack_id;
    $link->save();

    return response()->json([
      'message' => 'OK',
      'id' => $link->id
    ]);
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