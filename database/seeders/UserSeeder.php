<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 50 usuarios normales usando la fábrica
        User::factory()->count(50)->create();

        // Crear un usuario administrador manualmente
        User::updateOrCreate(
            ['email' => 'admin@admin.com'], // Identificar por correo
            [
                'name' => 'Administrador',
                'password' => Hash::make('Admin_123'), // Contraseña por defecto
                'rol' => 'administrador', // Asignar el rol de administrador
            ]
        );
    }
}
