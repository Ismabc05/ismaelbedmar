<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasFactory;

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
