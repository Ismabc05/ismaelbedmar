<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // Relación con el pedido
            $table->unsignedBigInteger('product_id'); // Relación con el producto
            $table->integer('quantity');
            $table->decimal('price', 8, 2); // Precio del producto
            $table->decimal('total', 10, 2)->storedAs('quantity * price'); // Total de la línea (price * quantity)

            $table->timestamps();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_lines');
    }
};
