<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller {

    public function Cart() {
        $cartItems = [];
        if (Auth::check()) {
            $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        }
        return Inertia::render('Trolley/Cart', ['cart' => $cartItems]);
    }

    public function apiIndex() {
        $cartItems = [];
        if (Auth::check()) {
            $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        }
        return response()->json(['cart' => $cartItems]);
    }

    public function store(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', Auth::id())
                        ->where('product_id', $request->product_id)
                        ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
            return response()->json(['message' => 'Cantidad actualizada'], 200);
        }

        Cart::create([
            'user_id'    => Auth::id(),
            'product_id' => $request->product_id,
            'quantity'   => $request->quantity,
        ]);

        return response()->json(['message' => 'Producto añadido al carrito'], 201);
    }

    public function destroy($id) {
        $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();
        if ($cartItem) {
            $cartItem->delete();
        }
        return redirect()->back();
    }
}
