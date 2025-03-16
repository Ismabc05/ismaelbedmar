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

}



