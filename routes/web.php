<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\OrderLineController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', [WelcomeController::class, 'ismael']);

Route::prefix('users')->group(function () {
    Route::get('/', [LoginController::class, 'loginForm'])->name('users.login_form');
    Route::post('/', [LoginController::class, 'login'])->name('users.login');
    Route::get('/create', [LoginController::class, 'create'])->name('users.create');
    Route::post('/store', [LoginController::class, 'store'])->name('users.store');
    Route::get('/password/edit', [LoginController::class, 'editPassword'])->name('users.edit_password');
    Route::post('/password/update', [LoginController::class, 'updatePassword'])->name('users.update_password');
    Route::post('/logout', [LoginController::class, 'logout'])->name('users.logout');

    Route::get('/password-reset', [PasswordResetController::class, 'showPasswordReset'])->name('users.password.reset');
    Route::post('/password-reset', [PasswordResetController::class, 'sendResetEmail'])->name('users.password.sendReset');
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

Route::post('/send-payment-confirmation', [PaymentController::class, 'sendPaymentConfirmation']);

Route::get('/payment-success', [PaymentController::class, 'success'])->name('payment.success');

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'Cart'])->name('carts.cart');
});

Route::prefix('favourite')->group(function () {
    Route::get('/', [FavouriteController::class, 'Favorite'])->name('favourites.favorite');
    Route::post('/', [FavouriteController::class, 'store']);
    Route::delete('/favorites/{id}', [FavouriteController::class, 'destroy']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/users/email/edit', [LoginController::class, 'editEmail'])->name('users.email.edit');
    Route::post('/users/email/update', [LoginController::class, 'updateEmail'])->name('users.email.update');
    Route::get('/users/name/edit', [LoginController::class, 'editName'])->name('users.name.edit');
    Route::post('/users/name/update', [LoginController::class, 'updateName'])->name('users.name.update');
    Route::get('/users/password/update', [LoginController::class, 'editPassword'])->name('users.password.edit');
    Route::post('/users/password/update', [LoginController::class, 'updatePassword'])->name('users.password.update');

    Route::get('/cart', [CartController::class, 'Cart'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/favourites', [FavouriteController::class, 'Favorite'])->name('favourites.index');
    Route::post('/favourites', [FavouriteController::class, 'store'])->name('favourites.store');
    Route::delete('/favourites/{id}', [FavouriteController::class, 'destroy'])->name('favourites.destroy');

});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/products', [AdminProductController::class, 'index'])->name('admin.products.index');
    Route::get('/admin/orders', [OrderLineController::class, 'index'])->name('admin.orders.index');
});
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
