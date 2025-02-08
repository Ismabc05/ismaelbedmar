<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Welcome;
use Inertia\Inertia;

class WelcomeController extends Controller {

    public function ismael() {

        return Inertia::render('Welcome/Ismael');
    }
}
