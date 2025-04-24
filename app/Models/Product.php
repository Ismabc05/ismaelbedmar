<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'descripcion', 'precio', 'tallas', 'colores']; // Campos que se pueden llenar

    //TODO: Comentar la funcion casts cuando se ejecuta DB:seed si no el json no funciona bien
    protected function casts(){
        return [
          'images' => 'json',
          'colors' => 'json',
          'sizes' => 'json',
        ];
    }

    /**
     * Relación con el modelo OrderLine.
     */
    public function orderLines()
    {
        return $this->hasMany(OrderLine::class);
    }
}
