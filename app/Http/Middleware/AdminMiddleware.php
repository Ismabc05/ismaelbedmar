<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Verificar si el usuario está autenticado y tiene el rol de administrador
        if (Auth::check() && Auth::user()->rol === 'administrador') {
            return $next($request); // Permitir acceso
        }

        // Redirigir si no es administrador, pero evitar redirección infinita
        if ($request->path() !== '/') {
            //return redirect('/')->with('error', 'No tienes permiso para acceder a esta página.');
        }

        return $next($request);
    }
}
