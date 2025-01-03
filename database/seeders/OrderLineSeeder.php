<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;

class OrderLineSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::all();

        foreach ($orders as $order) {
            $products = Product::inRandomOrder()->take(rand(2, 5))->get(); // Selecciona entre 2 y 5 productos aleatorios

            foreach ($products as $product) {
                OrderLine::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => rand(1, 5),
                ]);
            }
        }
    }
}
