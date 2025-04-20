<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\OrderDetailsMail;

class CheckoutController extends Controller
{
    public function index()
    {
        // Puedes pasar datos adicionales si es necesario
        return Inertia::render('Checkout/Checkout');
    }
}
