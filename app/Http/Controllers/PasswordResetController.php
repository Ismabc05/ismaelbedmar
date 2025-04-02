<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia; // Si usas Inertia
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;

class PasswordResetController extends Controller
{
    public function showPasswordReset()
    {
        // Renderiza la página de PasswordReset (React/Inertia)
        return Inertia::render('User/PasswordReset');
        // Si usas Blade, utiliza: return view('User.PasswordReset');
    }

    public function sendResetEmail(Request $request)
    {
        $email = $request->input('email');

        if (!$email) {
            return response()->json(['message' => 'Correo electrónico requerido.'], 400);
        }

        // Envía el correo usando el mailable
        Mail::to($email)->send(new ResetPasswordMail($email));

        return response()->json(['message' => 'Se ha enviado un correo para restablecer tu contraseña.']);
    }
}
