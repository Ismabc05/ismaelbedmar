<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderLineController;
use App\Http\Controllers\PaymentController;

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
    Route::get('/users', [UserController::class, 'apiIndex']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Endpoints para productos
    Route::get('/products', [AdminProductController::class, 'apiIndex']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::put('/products/{id}', [AdminProductController::class, 'update']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);

    // Endpoints para orders
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'apiIndex']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

    // Endpoint para enviar factura
    Route::post('/send-invoice', [PaymentController::class, 'sendInvoice']);
});

Route::get('/productos/search', [ProductController::class, 'search']);
