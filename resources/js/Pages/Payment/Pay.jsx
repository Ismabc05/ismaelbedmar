import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import {LuArrowLeft } from "react-icons/lu";
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
             <Link
                            href="/products"
                            className="self-start mb-4 text-gray-600 hover:text-black"
                        >
                            <LuArrowLeft size={28} />
                        </Link>

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Resumen del Pedido</h1>
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex justify-between items-center border-b pb-2">
                                <p className="font-medium">{item.name} (x{item.quantity}) - Talla: {item.size}</p>
                                <p className="font-bold">
                                    {new Intl.NumberFormat("es-ES", {
                                        style: "currency",
                                        currency: "EUR",
                                    }).format(item.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                        <div className="text-right font-bold text-lg mt-4">
                            Total:{" "}
                            {new Intl.NumberFormat("es-ES", {
                                style: "currency",
                                currency: "EUR",
                            }).format(
                                cart.reduce((total, item) => total + item.price * item.quantity, 0)
                            )}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
