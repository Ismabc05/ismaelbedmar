<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller {

    public function Favorite() {
        $favorites = Favourite::where('user_id', Auth::id())->with('product')->get();
        return Inertia::render('Favourite/Favorite', ['favorites' => $favorites]);
    }

    public function store(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $exists = Favourite::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Este producto ya está en tus favoritos'], 409);
        }
        Favourite::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Producto agregado a favoritos'], 201);
    }

    public function destroy($id) {
        $favorite = Favourite::where('id', $id)->where('user_id', Auth::id())->first();
        if ($favorite) {
            $favorite->delete();
        }
        return redirect()->back();
    }



}


