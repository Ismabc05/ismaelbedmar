<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\CartController;

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


});
