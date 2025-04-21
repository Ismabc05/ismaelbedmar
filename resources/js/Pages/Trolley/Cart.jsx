import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa"; // Importa el icono de la papelera

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Recuperar los productos del carrito desde el localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualizar el localStorage
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <MainLayout>
            <div className="p-6">
                <Link
                    href="/products"
                    className="flex items-center mb-6 text-gray-600 hover:text-black transition"
                >
                    <LuArrowLeft size={28} className="mr-2" />
                    <span>Volver a productos</span>
                </Link>

                <h1 className="text-3xl font-bold mb-6 text-center text-black">Mis Pedidos</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No tienes productos en el carrito.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista de productos */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div
                                    key={`${item.id}-${item.size}`}
                                    className="flex items-center bg-white shadow-md rounded-lg p-4"
                                >
                                    <img
                                        src={item.image || `https://picsum.photos/600?random=${Math.random()}`}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                        <h2
                                            className="font-semibold text-lg text-black cursor-pointer hover:underline"
                                            onClick={() => window.location.href = `/products/${item.id}`}
                                        >
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Talla: {item.size} | Cantidad: {item.quantity}
                                        </p>
                                        <p className="font-bold text-gray-800 mt-2">
                                            {new Intl.NumberFormat("es-ES", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(item.price * item.quantity)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-black hover:text-gray-800 transition"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={20} /> {/* Icono de papelera */}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Resumen del carrito */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 text-black">Resumen del Pedido</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-bold text-gray-800">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(calculateTotal())}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Envío:</span>
                                    <span className="font-bold text-gray-800">Gratis</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-lg font-bold text-gray-800">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(calculateTotal())}
                                    </span>
                                </div>
                            </div>
                            <Link
                                href="/checkout"
                                className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition mt-6 text-center block"
                            >
                                Proceder al Pago
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}


