import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        address: '',
        postalCode: '',
        province: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const validateForm = () => {
        let newErrors = {};

        // Validar teléfono
        if (!/^\d{9}$/.test(formData.phone)) {
            newErrors.phone = "El teléfono debe tener exactamente 9 números.";
        }

        // Validar fecha de nacimiento (mayor de 18 años)
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (isNaN(birthDate.getTime()) || age < 18) {
            newErrors.birthDate = "Debes tener al menos 18 años.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Detener el envío si hay errores de validación
        }

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.email}
                                    onChange={handleInputChange}
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
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                />
                                {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Código Postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-black font-medium mb-2">Provincia</label>
                                <input
                                    type="text"
                                    name="province"
                                    required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    value={formData.province}
                                    onChange={handleInputChange}
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
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
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
                                        value={formData.expirationDate}
                                        onChange={handleInputChange}
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
                                        value={formData.cvv}
                                        onChange={handleInputChange}
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
