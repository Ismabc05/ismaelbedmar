<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\PaymentConfirmationMail;
use App\Mail\InvoiceMail; // Make sure to create this Mailable
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

    public function sendInvoice(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'invoiceData' => 'required|array',
        ]);

        try {
            // Send the invoice email using a dedicated Mailable.
            Mail::to($data['email'])->send(new InvoiceMail($data['invoiceData']));
            return response()->json(['message' => 'Factura enviada correctamente.'], 200);
        } catch (\Exception $e) {
            \Log::error("Error al enviar factura: " . $e->getMessage());
            return response()->json(['message' => 'Error al enviar factura.'], 500);
        }
    }
}
