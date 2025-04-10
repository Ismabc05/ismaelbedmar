import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { LuHeart, LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";

export default function Show({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!product || !product.id) return;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === product.id));
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (newIsFavorite) {
      favorites.push(product);
    } else {
      favorites = favorites.filter((fav) => fav.id !== product.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const addToCart = () => {
    if (!product) return;
    const selectedSize = document.getElementById("size").value; // Get the selected size
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id && item.size === selectedSize);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, size: selectedSize });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center bg-gray-100 min-h-[calc(100vh-81px)] p-6">
        <Link
          href="/products"
          className="self-start mb-4 text-gray-600 hover:text-black"
        >
          <LuArrowLeft size={28} />
        </Link>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
          <div className="md:w-1/2 bg-gray-200 flex justify-center items-center p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover max-h-96 rounded"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h1>
                <motion.button
                  onClick={toggleFavorite}
                  whileTap={{ scale: 0.85 }}
                  animate={{ scale: isFavorite ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="focus:outline-none"
                >
                  <LuHeart
                    size={28}
                    color={isFavorite ? "#dc2626" : "#9ca3af"}
                    fill={isFavorite ? "#dc2626" : "none"}
                  />
                </motion.button>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mt-6">
              <label htmlFor="size" className="block text-gray-700 font-medium mb-2">
                Selecciona una talla:
              </label>
              <select
                id="size"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black text-black"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size} className="text-black">
                    {size}
                  </option>
                ))}
              </select>
              <button
                onClick={addToCart}
                className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Añadir a la cesta
              </button>
              <p className="mt-4 text-right text-lg font-semibold text-gray-800">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(product.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

