<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\PaymentConfirmationMail;
use App\Models\Payment;

class PaymentController extends Controller {

    public function Pay() {
        return Inertia::render('Payment/Pay');
    }

    public function success()
    {
        return Inertia::render('Checkout/PaymentSuccess');
    }

    public function sendPaymentConfirmation(Request $request)
    {
        $data = $request->all();

        // Enviar el correo al usuario
        Mail::to($data['email'])->send(new PaymentConfirmationMail($data));

        return response()->json(['message' => 'Correo enviado correctamente.']);
    }
}
