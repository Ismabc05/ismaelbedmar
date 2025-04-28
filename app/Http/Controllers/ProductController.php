<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index() {
        $products = Product::all();
        return Inertia::render('Product/Index', [
            'products' => $products
        ]);
    }

    public function show($id) {
        $product = Product::findOrFail($id);
        return Inertia::render('Product/Show', [
            'product' => $product
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([], 200); // Retorna un array vacío si no hay término de búsqueda
        }

        // Realiza la búsqueda en la tabla `products` y limita los resultados a 10
        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->limit(5) // Limitar a 10 resultados
            ->get();

        return response()->json($products, 200);
    }
}



