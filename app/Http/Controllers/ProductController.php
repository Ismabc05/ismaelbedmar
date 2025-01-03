<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product; 

class ProductController extends Controller
{
    public function show($id) {
        // Buscar el producto por ID
        $product = Product::findOrFail($id);
        return view('products.show')->with(['product' => $product]);
    }

    public function create() {
        
    }
}
