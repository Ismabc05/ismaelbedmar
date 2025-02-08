<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FavouriteController;


Route::get('test', function() {
    return [
        'name' => 'isma',
        'lastname' => 'bedmar'
    ];
});
Route::get('/', [WelcomeController::class, 'ismael']);

Route::prefix('users')->group(function () {
    Route::get('/', [LoginController::class, 'loginForm'])->name('users.login_form');
    Route::post('/', [LoginController::class, 'login'])->name('users.login');
    Route::get('/create', [LoginController::class, 'create'])->name('users.create');
    Route::post('/store', [LoginController::class, 'store'])->name('users.store');
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::post('/', [ProductController::class, 'store'])->name('products.store');
    Route::get('/{id}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::prefix('payment')->group(function () {
    Route::get('/', [PaymentController::class, 'Pay'])->name('payments.pay');
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'Cart'])->name('carts.cart');
});

Route::prefix('favourite')->group(function () {
    Route::get('/', [FavouriteController::class, 'Favorite'])->name('favourites.favorite');
    Route::post('/', [FavouriteController::class, 'store']);
    Route::delete('/favorites/{id}', [FavouriteController::class, 'destroy']);
});

