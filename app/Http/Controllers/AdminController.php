<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Mostrar el dashboard del administrador.
     */

     public function dashboard()
    {
        return Inertia::render('Administrador/Dashboard');
    }
}
