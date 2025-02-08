import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { LuHeart, LuArrowLeft } from "react-icons/lu";
import { Link } from '@inertiajs/react'

export default function Show({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!product || !product.id) return;

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === product.id));
    }, [product]);

    const toggleFavorite = () => {
        if (!product) return;

        const newIsFavorite = !isFavorite;
        setIsFavorite(newIsFavorite);

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (newIsFavorite) {
            favorites.push(product);
        } else {
            favorites = favorites.filter(fav => fav.id !== product.id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        // 🔥 Disparar evento para actualizar Navbar
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const addToCart = () => {
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // 🔥 Disparar evento para actualizar el Navbar
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <MainLayout>
            <div className="flex h-full h-[calc(100vh-81px)] relative">
                {/* Flecha de regreso */}
                <Link
                    href = "/products"
                    className="absolute top-4 left-4 text-gray-600 hover:text-black"
                >
                    <LuArrowLeft size={24} />
                </Link>

                <div className="left-side bg-slate-100">
                    <img src={product.images[0]} width="100%" />
                </div>

                <div className="right-side overflow-y-auto px-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">{product.name}</h1>

                        <motion.button
                            onClick={toggleFavorite}
                            className="mt-[-10px] mr-6"
                            whileTap={{ scale: 0.8 }}
                            animate={{ scale: isFavorite ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <LuHeart
                                size={24}
                                color={isFavorite ? "black" : "gray"}
                                fill={isFavorite ? "black" : "none"}
                            />
                        </motion.button>
                    </div>

                    <p className="text-xs mt-1">{product.description}</p>

                    <p className="text-sm mt-6 text-[#212121]">Otros colores:</p>

                    <div className="mt-16 text-xs">
                        <label htmlFor="size" className="block text-sm font-medium mb-2 mt-4 text-[#212121]">
                            Selecciona su talla
                        </label>
                        <select
                            id="size"
                            name="size"
                            className="block w-1/2 p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Seleccione una opción:</option>
                            <option value="s">S - Pequeña</option>
                            <option value="m">M - Mediana</option>
                            <option value="l">L - Grande</option>
                            <option value="xl">XL - Extra Grande</option>
                        </select>
                    </div>

                    <a
                        className="text-xs text-[#212121] mt-2 inline-block hover:underline"
                        href="/Tallas.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Guía de tallas
                    </a>

                    <button className="cart-button cart-button-primary mt-8" onClick={addToCart}>
                        <span>Añadir a la cesta</span>
                        <span className="price">
                            {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(product.price)}
                        </span>
                    </button>

                    <button className="cart-button cart-button-secondary mt-4">
                        <span>Pago Express</span>
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}

