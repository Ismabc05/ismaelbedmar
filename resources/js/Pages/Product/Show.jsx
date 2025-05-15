import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import { LuHeart, LuArrowLeft, LuShoppingCart, LuChevronDown } from "react-icons/lu";
import { Link } from "@inertiajs/react";

export default function Show({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!product || !product.id) return;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === product.id));

    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (newIsFavorite) {
      favorites.push(product);
      setNotification(`${product.name} añadido a favoritos`);
    } else {
      favorites = favorites.filter((fav) => fav.id !== product.id);
      setNotification(`${product.name} eliminado de favoritos`);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
    setTimeout(() => setNotification(''), 3000);
  };

  const addToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      setNotification('Por favor, selecciona una talla.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id && item.size === selectedSize);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, size: selectedSize });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setNotification(`${product.name} (Talla: ${selectedSize}) añadido a la cesta`);
    setTimeout(() => setNotification(''), 3000);
  };

  if (!product || !product.images || !product.sizes) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-81px)] p-6 text-gray-600">
          <p>Cargando producto o producto no disponible.</p>
          <Link href="/products" className="mt-4 text-indigo-600 hover:underline">
            Volver a productos
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Contenedor de Notificación Mejorado */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed top-24 right-5 z-50 flex items-center p-3 rounded-lg shadow-xl text-sm font-medium
                        ${notification.includes('Por favor') || notification.includes('Error') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center min-h-[calc(100vh-81px)] p-6">
        <Link
          href="/products"
          className="self-start mb-4 text-gray-600 hover:text-black flex items-center"
        >
          <LuArrowLeft size={24} className="mr-1" />
          <span className="text-sm">Volver</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl lg:max-w-6xl">
          <div className="md:w-1/2 lg:w-3/5 bg-gray-200 flex justify-center items-center p-4 sm:p-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-contain max-h-[70vh] md:max-h-[calc(100vh-200px)] rounded-lg"
            />
          </div>
          <div className="md:w-1/2 lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                  {product.name}
                </h1>
                <motion.button
                  onClick={toggleFavorite}
                  whileTap={{ scale: 0.85 }}
                  animate={{ scale: isFavorite ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="p-1 focus:outline-none text-gray-400 hover:text-red-500"
                  aria-label="Añadir a favoritos"
                >
                  <LuHeart
                    size={26}
                    className={`transition-all duration-200 ${isFavorite ? "text-red-500 fill-red-500" : "fill-transparent"}`}
                  />
                </motion.button>
              </div>
              <p className="mt-1 mb-4 text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
            <div className="mt-auto">
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1.5">
                Selecciona una talla:
              </label>
              <div className="relative mb-1">
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none py-2.5 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 text-gray-900 text-sm"
                >
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
                      <option key={size} value={size} className="text-black">
                        {size}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No hay tallas disponibles</option>
                  )}
                </select>
                <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="mb-4 text-right">
                <a
                  href="/Tallas.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-gray-800 underline focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                >
                  Guía de Tallas
                </a>
              </div>
              <button
                onClick={addToCart}
                className="w-full py-3 px-5 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-700 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <LuShoppingCart size={18} className="mr-2" />
                  <span>Añadir a la cesta</span>
                </div>
                <span className="text-base">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

