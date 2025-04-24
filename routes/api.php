<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // GET endpoints existentes
    Route::get('/favourites', [FavouriteController::class, 'apiIndex']);
    Route::get('/cart', [CartController::class, 'apiIndex']);

    // Nuevos endpoints POST para agregar productos
    Route::post('/favourites', [FavouriteController::class, 'store']);
    Route::post('/cart', [CartController::class, 'store']);

    // Endpoints para usuarios
    Route::get('/users', [UserController::class, 'apiIndex']); // Obtener usuariosCrear usuario
    Route::put('/users/{id}', [UserController::class, 'update']); // Modificar usuario
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Eliminar usuario

    // Endpoints para productos
    Route::get('/products', [AdminProductController::class, 'apiIndex']); // Obtener productos
    Route::post('/products', [AdminProductController::class, 'store']); // Crear producto
    Route::put('/products/{id}', [AdminProductController::class, 'update']); // Modificar producto
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']); // Eliminar producto
});
