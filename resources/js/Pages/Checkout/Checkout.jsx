import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: 1, // Reemplaza con el ID del usuario autenticado
            cart: cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
        };

        console.log("Payload enviado:", payload); // Depuración

        try {
            setIsSaving(true);
            const response = await axios.post("/api/orders", payload);
            console.log("Pedido guardado:", response.data);

            setIsSaving(false);
            setIsSaved(true);

            // Limpiar el carrito
            localStorage.removeItem("cart");
            setCart([]);

            // Redirigir a la página de éxito
            setTimeout(() => {
                window.location.href = "/payment-success";
            }, 2000);
        } catch (error) {
            console.error("Error al guardar el pedido:", error);
            setIsSaving(false);
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Resumen del pedido */}
                    <div className="lg:pr-8">
                        <Link
                            href="/cart"
                            className="flex items-center mb-6 text-gray-600 hover:text-black transition w-full justify-start"
                        >
                            <span className="mr-2">←</span> Volver a tus pedidos
                        </Link>

                        <h1 className="text-3xl font-bold mb-6 text-left">Resumen del Pedido</h1>

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
                                                src={item.image || `https://picsum.photos/600?random=${Math.random()}`}
                                                alt={item.name}
                                                className="w-40 h-40 object-cover"
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
                                        <span className="text-black">Subtotal:</span>
                                        <span className="font-bold text-gray-800">
                                            {new Intl.NumberFormat("es-ES", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-black">Envío:</span>
                                        <span className="font-bold text-gray-800">Gratis</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="text-lg font-bold text-black">Total:</span>
                                        <span className="text-lg font-bold text-black">
                                            {new Intl.NumberFormat("es-ES", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Formulario combinado */}
                    <div className="bg-white p-6 rounded-lg border border-black">
                        <h2 className="text-2xl font-bold mb-4 text-center text-black">Información de Envío y Pago</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Información de envío */}
                            <div>
                                <label className="block text-black font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Código Postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Provincia</label>
                                <input
                                    type="text"
                                    name="province"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Información de pago */}
                            <div>
                                <label className="block text-black font-medium mb-2">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    maxLength="16"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-black font-medium mb-2">Fecha de Expiración</label>
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        placeholder="MM/AA"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-black font-medium mb-2">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        maxLength="3"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <span className="loader border-t-transparent border-white border-4 w-5 h-5 rounded-full animate-spin"></span>
                                ) : isSaved ? (
                                    <span>✔</span>
                                ) : (
                                    "Finalizar Compra"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
