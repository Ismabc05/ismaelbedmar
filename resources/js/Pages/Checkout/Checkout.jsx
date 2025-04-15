import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const shippingCost = 5.99; // Coste fijo de envío

    useEffect(() => {
        // Recuperar los productos del carrito desde el localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + shippingCost;
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        alert("Información de envío guardada con éxito");
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        alert("Pago realizado con éxito");
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-4xl mx-auto">
                {/* Botón para volver a la vista anterior */}
                <Link
                    href="/payment" // Cambia esto a la ruta de la vista anterior
                    className="flex items-center mb-6 text-gray-600 hover:text-black transition w-full justify-start"
                >
                    <span className="mr-2">←</span> Volver a tus pedidos
                </Link>

                <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

                {/* Resumen del pedido */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-lg">No hay productos en el carrito.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={`${item.id}-${item.size}`}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image || "/images/placeholder.png"}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div>
                                            <p className="font-medium text-lg text-black">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Talla: {item.size} | Cantidad: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-lg">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-bold text-gray-800">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(calculateSubtotal())}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Envío:</span>
                                    <span className="font-bold text-gray-800">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(shippingCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-lg font-bold text-black">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(calculateTotal())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Formulario de envío */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Información de Envío</h2>
                    <form onSubmit={handleShippingSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Apellidos</label>
                            <input
                                type="text"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Teléfono</label>
                            <input
                                type="tel"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Guardar Información de Envío
                        </button>
                    </form>
                </div>

                {/* Formulario de pago */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Formulario de Pago</h2>
                    <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Número de Tarjeta</label>
                            <input
                                type="text"
                                maxLength="16"
                                required
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    placeholder="MM/AA"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">CVV</label>
                                <input
                                    type="text"
                                    maxLength="3"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Pagar
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
