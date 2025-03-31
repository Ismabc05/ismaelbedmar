<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->buildName(),
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 100),
            'images' => json_encode(['https://picsum.photos/600?random='.$this->faker->randomFloat(0, 10, 100), 'https://picsum.photos/600?random='.$this->faker->randomFloat(0, 10, 100)]),
            'sizes' => json_encode(['S', 'M', 'L', 'XL']),
            'colors' => json_encode(['Red', 'Blue', 'Green', 'Yellow']),
        ];
    }

    public function buildName(): string
    {
        $categories = self::getCategories();
        $styles = ['Slim fit', 'Oversize', 'Recto', 'Ajustado', 'Holgado', 'Cropped', 'Skinny', 'Regular fit', 'Boyfriend', 'Mom fit'];
        $materials = ['Algodón', 'Lino', 'Denim', 'Seda', 'Lana', 'Cuero', 'Punto', 'Popelín', 'Terciopelo', 'Satén'];
        $details = ['con botones', 'con cremallera', 'con cuello mao', 'con volantes', 'con bordados', 'con lentejuelas', 'con estampado', 'de rayas', 'de cuadros', 'con bolsillos'];
        $colors = self::getColors();
        $collections = ['Limited Edition', 'Studio', 'Basic', 'TRF', 'Join Life', 'Premium'];
        $tallas = self::getTallas();

        $name = $this->faker->randomElement($categories) . ' ';
        $name .= $this->faker->randomElement($styles) . ' ';
        $name .= 'de ' . $this->faker->randomElement($materials) . ' ';
        $name .= $this->faker->randomElement($details) . ' ';
        $name .= 'en ' . $this->faker->randomElement($colors);

        // Añadir colección aleatoriamente (50% de probabilidad)
        if ($this->faker->boolean(50)) {
            $name .= ' | ' . $this->faker->randomElement($collections);
        }


        return ucfirst($name);
    }

    // Nuevo: método para obtener las categorías
    public static function getCategories(): array
    {
        return ['Camisa', 'Pantalón', 'Jersey', 'Vestido', 'Chaqueta', 'Abrigo', 'Falda', 'Blazer', 'Top', 'Sudadera'];
    }

    // Nuevo: método para obtener los colores
    public static function getColors(): array
    {
        return ['negro', 'blanco', 'gris', 'azul marino', 'beige', 'verde oliva', 'burdeos', 'camel', 'rosa palo', 'lavanda'];
    }

    public static function getTallas(): array
    {
        return ['S', 'M', 'L', 'XL'];
    }

}
