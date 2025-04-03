<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Favourite extends Model
{
    use HasFactory;

    protected $table = 'favourites'; // Nombre de la tabla en la BD

    protected $fillable = [
        'user_id', // ID del usuario que marcó como favorito
        'product_id', // ID del producto favorito
    ];

    // Relación con el usuario
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Relación con el producto
    public function product() {
        return $this->belongsTo(Product::class);
    }
}

