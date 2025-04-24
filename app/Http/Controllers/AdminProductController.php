<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::all(); // Obtener todos los productos
        return Inertia::render('Administrador/ProductList', [
            'products' => $products
        ]);
    }

    public function apiIndex()
    {
        try {
            $products = Product::all(); // Obtener todos los productos
            return response()->json($products, 200); // Devolver los productos en formato JSON
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los productos'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $product = Product::create($request->all());
            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el producto'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id); // Buscar el producto por ID
            $product->update($request->all()); // Actualizar los datos del producto
            return response()->json($product, 200); // Devolver el producto actualizado
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el producto'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el producto'], 500);
        }
    }
}
