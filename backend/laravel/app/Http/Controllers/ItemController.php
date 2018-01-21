<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Item, App\Linkitemspacks;

class ItemController extends Controller 
{

  /* public function __construct() {
  } */

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index(Request $request)
  {
    $user_id = $request->user()->id;
    return($user_id);
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
      'color' => 'required|string|max:255',
      'nfcId' => 'string|max:255'
    ]);

    $nfcId = null;
    if ($request->nfcId)
    {
      $nfcId = $request->nfcId;
    }

    $user_id = $request->user()->id;

    $item = new Item;
    $item->name = $request->name;
    $item->color = $request->color;
    $item->nfcId = $nfcId;
    $item->user_id = $user_id;
    $item->save();

    return response()->json([
      'message' => 'OK',
      'id' => $item->id
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
  public function update(Request $request, $id)
  {
    $this->validate($request, [
      'name' => 'required|string|max:255',
      'color' => 'required|string|max:255'
    ]);

    $user_id = $request->user()->id;
    $item = Item::where('id', $id)->first();
    if ($item->user_id != $user_id)
    {
      return response()->json([
        'message' => 'incorrect request'
      ]);
    }

    $item->name = $request->name;
    $item->color = $request->color;
    $item->user_id = $user_id;
    $item->save();

    return response()->json([
      'message' => 'OK',
      'id' => $item->id
    ]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy(Request $request, $id)
  {
    $user_id = $request->user()->id;
    $item = Item::where('id', $id)->first();
    if (!$item || $item->user_id != $user_id)
    {
      return response()->json([
        'message' => 'incorrect request'
      ]);
    }
    
    Linkitemspacks::where('item_id', '=', $id)->delete();
    $item->delete();

    return response()->json([
      'message' => 'OK'
    ]);
  }

  public function getNextNfcId(Request $request) {
    $max = Item::where('user_id', $request->user()->id)->max('nfcId');
    if (!$max)
    {
      return 0;
    }

    return $max;
  }

  public function translateNfcId(Request $request, $nfcId) {
    $item = Item::where([['user_id', $request->user()->id], ['nfcId', $nfcId]])->first();

    return $item->id;
  }
  
}

?>