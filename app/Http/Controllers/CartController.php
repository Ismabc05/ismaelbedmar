<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;


class CartController extends Controller {

    public function Cart() {

        return Inertia::render('Trolley/Cart');
    }
}
