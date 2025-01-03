<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderLine>
 */
class OrderLineFactory extends Factory
{
    protected $model = \App\Models\OrderLine::class;

    public function definition()
    {
        return [
            'order_id' => Order::factory(), // Relación con pedidos
            'product_id' => Product::factory(), // Relación con productos
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => function (array $attributes) {
                return Product::find($attributes['product_id'])->price;
            },
        ];
    }
}
