<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        // Puedes pasar datos adicionales si es necesario
        return Inertia::render('Checkout/Checkout');
    }
}
