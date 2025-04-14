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

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Actualizar el localStorage
    };

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
                                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <img
                                    src={fav.image || "/images/placeholder.png"}
                                    alt={fav.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-lg font-semibold mb-2 text-black">{fav.name}</h2>
                                <p className="text-gray-500 mb-4">
                                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(fav.price)}
                                </p>
                                <button
                                    onClick={() => removeFromFavorites(fav.id)}
                                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

