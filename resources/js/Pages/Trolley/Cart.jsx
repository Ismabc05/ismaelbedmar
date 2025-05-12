import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";
import { FaTrash } from "react-icons/fa"; // Importa el icono de la papelera

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState('cart'); // 'cart' o 'orders'

    useEffect(() => {
        // Recuperar los productos del carrito desde el localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
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
            <div className="p-6 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="flex gap-4 mb-8">
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold ${view === 'cart' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setView('cart')}
                        >
                            Carrito
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold ${view === 'orders' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setView('orders')}
                        >
                            Mis Pedidos
                        </button>
                    </div>

                    {view === 'cart' ? (
                        <>
                            <Link
                                href="/products"
                                className="inline-flex items-center mb-8 text-gray-600 hover:text-black transition font-medium"
                            >
                                <LuArrowLeft size={24} className="mr-2" />
                                <span>Volver a productos</span>
                            </Link>

                            <h1 className="text-4xl font-extrabold mb-10 text-center text-black tracking-tight drop-shadow-sm">
                                Mis Pedidos
                            </h1>

                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-lg">
                                    <p className="text-gray-400 text-5xl mb-2">🛒</p>
                                    <p className="text-gray-500 text-lg font-medium">No tienes productos en el carrito.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col lg:flex-row gap-10">
                                    {/* Lista de productos */}
                                    <div className="flex-1 space-y-6">
                                        {cart.map((item) => (
                                            <div
                                                key={`${item.id}-${item.size}`}
                                                className="flex items-center bg-white shadow-xl rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition group"
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={item.image || `https://picsum.photos/600?random=${Math.random()}`}
                                                        alt={item.name}
                                                        className="w-28 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                                                    />
                                                </div>
                                                <div className="flex-1 ml-6">
                                                    <h2
                                                        className="font-bold text-lg text-black cursor-pointer hover:underline transition"
                                                        onClick={() => window.location.href = `/products/${item.id}`}
                                                    >
                                                        {item.name}
                                                    </h2>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                                            Talla: {item.size}
                                                        </span>
                                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                                            Cantidad: {item.quantity}
                                                        </span>
                                                    </div>
                                                    <p className="font-bold text-xl text-gray-900 mt-3">
                                                        {new Intl.NumberFormat("es-ES", {
                                                            style: "currency",
                                                            currency: "EUR",
                                                        }).format(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="ml-4 text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-gray-100"
                                                    title="Eliminar"
                                                >
                                                    <FaTrash size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Resumen del carrito */}
                                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between min-h-[340px] w-full lg:w-[350px] mt-10 lg:mt-0">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-6 text-black text-center">Resumen del Pedido</h2>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Subtotal</span>
                                                    <span className="font-bold text-gray-900">
                                                        {new Intl.NumberFormat("es-ES", {
                                                            style: "currency",
                                                            currency: "EUR",
                                                        }).format(calculateTotal())}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Envío</span>
                                                    <span className="font-bold text-green-600">Gratis</span>
                                                </div>
                                                <div className="flex justify-between items-center border-t pt-4 mt-4">
                                                    <span className="text-lg font-bold">Total</span>
                                                    <span className="text-lg font-bold text-black">
                                                        {new Intl.NumberFormat("es-ES", {
                                                            style: "currency",
                                                            currency: "EUR",
                                                        }).format(calculateTotal())}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href="/checkout"
                                            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition mt-8 text-center block shadow-md"
                                        >
                                            Proceder al Pago
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-black text-center">Pedidos Realizados</h2>
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl shadow-lg">
                                    <p className="text-gray-400 text-5xl mb-2">📦</p>
                                    <p className="text-gray-500 text-lg font-medium">No has realizado ningún pedido.</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {orders.map((order, idx) => (
                                        <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                                            <div className="mb-2 text-gray-500 text-sm">
                                                Pedido realizado el {new Date(order.date).toLocaleString()}
                                            </div>
                                            <div className="space-y-2">
                                                {order.cart.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4">
                                                        <img src={item.image || `https://picsum.photos/600?random=${i}`} alt={item.name} className="w-14 h-14 object-cover rounded-lg border" />
                                                        <div className="flex-1">
                                                            <div className="font-semibold">{item.name}</div>
                                                            <div className="text-xs text-gray-500">Talla: {item.size} | Cantidad: {item.quantity}</div>
                                                        </div>
                                                        <div className="font-bold text-gray-900">
                                                            {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(item.price * item.quantity)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}


