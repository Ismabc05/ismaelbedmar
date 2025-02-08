<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('favourites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relación con usuarios
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Relación con productos
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('favourites');
    }
};

