import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";

export default function Pay() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Recuperar los productos del carrito desde el localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

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

                <h1 className="text-3xl font-bold mb-6 text-center">Resumen del Pedido</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No hay productos en el carrito.</p>
                ) : (
                    <div className="space-y-6">
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
                                        <p style={{ color: "#000000" }} className="font-medium text-lg">{item.name}</p>
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

                        <div className="text-right font-bold text-2xl mt-6 text-black">
                            Total:{" "}
                            {new Intl.NumberFormat("es-ES", {
                                style: "currency",
                                currency: "EUR",
                            }).format(
                                cart.reduce((total, item) => total + item.price * item.quantity, 0)
                            )}
                        </div>

                        <button
                            className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Reservar
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
