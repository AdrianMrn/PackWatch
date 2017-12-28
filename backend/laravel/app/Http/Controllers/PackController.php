<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Pack, App\Linkitemspacks, App\Item;

class PackController extends Controller 
{

  public function getPackItems(Request $request)
  {
    // Protecting against other users getting someone's items
    $pack_id = $request->query('id');
    $user_id = $request->user()->id;
    $pack = Pack::where('id', $pack_id)->firstOrFail();
    if ($pack->user_id != $user_id)
    {
      return response()->json([
        'message' => 'incorrect request'
      ]);
    }

    $pack_items_ids = Linkitemspacks::select('item_id')->where('pack_id', $pack_id)->get();
    $arr_items = [];
    foreach ($pack_items_ids as $item_id)
    {
      $item = Item::where('id', $item_id->item_id)->firstOrFail();
      array_push($arr_items, $item);
    }

    return $arr_items;
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
    $this->validate($request, [
      'name' => 'required|string|max:255',
      'color' => 'required|string|max:255'
    ]);

    $user_id = $request->user()->id;

    $pack = new Pack;
    $pack->name = $request->name;
    $pack->color = $request->color;
    $pack->user_id = $user_id;
    $pack->save();

    return response()->json([
      'message' => 'OK',
      'id' => $pack->id
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