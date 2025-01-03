<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasFactory;

    /**
     * Relación con el modelo OrderLine.
     */
    public function orderLines()
    {
        return $this->hasMany(OrderLine::class);
    }
}
