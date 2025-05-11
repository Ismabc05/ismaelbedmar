import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";

export default function Favorite() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Recuperar los favoritos desde el localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    return (
        <MainLayout>
            <Link
                href="/products"
                className="self-start mb-4 text-gray-600 hover:text-black flex items-center"
            >
                <LuArrowLeft size={28} className="mr-2" />
                <span>Volver a productos</span>
            </Link>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Mis Favoritos</h1>

                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No tienes favoritos aún.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map(fav => (
                            <div
                                key={fav.id}
                                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={fav.image || `https://picsum.photos/600?random=${Math.random()}`}
                                    alt={fav.name}
                                    className="w-full h-96 object-cover mb-4"
                                />
                                <h2
                                    className="text-lg font-semibold mb-2 text-black hover:underline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `/products/${fav.id}`;
                                    }}
                                >
                                    {fav.name}
                                </h2>
                                <p className="text-center text-gray-700 mb-4">
                                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(fav.price)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

