<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'cart' => 'required|array',
                'cart.*.product_id' => 'required|exists:products,id',
                'cart.*.quantity' => 'required|integer|min:1',
            ]);

            // Calcular el total del pedido
            $total = 0;
            foreach ($request->input('cart') as $line) {
                $product = Product::find($line['product_id']);
                if (!$product) {
                    \Log::error("Producto no encontrado con ID: " . $line['product_id']);
                    return response()->json(['message' => 'Producto no encontrado', 'product_id' => $line['product_id']], 400);
                }
                $total += $product->price * $line['quantity'];
            }

            // Crear el pedido
            $order = Order::create([
                'user_id' => $request->input('user_id'),
                'product_id' => $line['product_id'],
                'quantity' => $line['quantity'],
                'price' => $product->price, // Obtener el precio del producto
                'total' => $total, // Proporcionar el total calculado
            ]);

            foreach ($request->input('cart') as $line) {
                $product = Product::find($line['product_id']);
                if (!$product) {
                    \Log::error("Producto no encontrado con ID: " . $line['product_id']);
                    return response()->json(['message' => 'Producto no encontrado', 'product_id' => $line['product_id']], 400);
                }

                OrderLine::create([
                    'order_id' => $order->id,
                    'product_id' => $line['product_id'],
                    'quantity' => $line['quantity'],
                    'price' => $product->price, // Obtener el precio del producto
                ]);
            }

            return response()->json(['message' => 'Pedido guardado correctamente', 'order_id' => $order->id], 201);
        } catch (\Exception $e) {
            \Log::error("Error al guardar el pedido: " . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json(['message' => 'Error al guardar el pedido', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        $orders = Order::with('user')->get(); // Obtener todos los pedidos con la relación usuario
        return Inertia::render('Administrador/OrderList', ['orders' => $orders]);
    }

    public function apiIndex()
    {
        return response()->json(Order::with('user')->get());
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}
