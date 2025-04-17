<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;

class PaymentController extends Controller {

    public function Pay() {
        return Inertia::render('Payment/Pay');
    }

    public function success()
    {
        return Inertia::render('Checkout/PaymentSuccess');
    }
}
