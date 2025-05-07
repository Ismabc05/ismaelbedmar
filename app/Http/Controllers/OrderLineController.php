<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderLineController extends Controller
{
    public function index()
    {
        $orders = Order::with(['orderLines.product', 'user'])->get();

        return Inertia::render('Administrador/OrderLineList', [
            'orders' => $orders
        ]);
    }
}
