<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    protected $model = \App\Models\Order::class;

    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(), // Elige un usuario existente o crea uno nuevo si no hay usuarios
            'state' => $this->faker->randomElement(['pending', 'out_for_delivery', 'delivered']),
        ];
    }
}
