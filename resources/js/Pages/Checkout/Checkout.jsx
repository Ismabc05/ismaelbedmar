import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [isShippingSaving, setIsShippingSaving] = useState(false);
    const [isShippingSaved, setIsShippingSaved] = useState(false);
    const [isPaymentSaving, setIsPaymentSaving] = useState(false);
    const [isPaymentSaved, setIsPaymentSaved] = useState(false);

    const [errors, setErrors] = useState({}); // Estado para almacenar errores
    const [cardNumber, setCardNumber] = useState("ES-"); // Estado para el número de tarjeta

    const shippingCost = 0;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + shippingCost;
    };

    const validateShippingForm = (data) => {
        const newErrors = {};

        // Validar fecha de nacimiento (mayor de 18 años)
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || (age === 18 && today < new Date(birthDate.setFullYear(today.getFullYear())))) {
            newErrors.birthDate = "Debes tener al menos 18 años.";
        }

        // Validar correo electrónico
        if (!data.email.includes("@") || !data.email.endsWith(".com")) {
            newErrors.email = "El correo debe contener un '@' y terminar en '.com'.";
        }

        // Validar teléfono (9 números)
        if (!/^\d{9}$/.test(data.phone)) {
            newErrors.phone = "El teléfono debe tener 9 números.";
        }

        return newErrors;
    };

    const validatePaymentForm = (data) => {
        const newErrors = {};

        // Validar número de tarjeta (19 números y debe comenzar con "ES")
        if (!/^ES\d{17}$/.test(data.cardNumber)) {
            newErrors.cardNumber = "El número de tarjeta debe comenzar con 'ES' y tener 19 caracteres en total.";
        }

        return newErrors;
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value;

        // Asegurarse de que el valor siempre comience con "ES-"
        if (!input.startsWith("ES-")) {
            return;
        }

        // Limitar el número total de caracteres a 22 (incluyendo "ES-")
        if (input.length > 22) {
            return;
        }

        // Actualizar el estado con el nuevo valor
        setCardNumber(input);
    };

    const handleShippingSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const newErrors = validateShippingForm(data);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsShippingSaving(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsShippingSaving(false);
        setIsShippingSaved(true);

        setTimeout(() => setIsShippingSaved(false), 2000);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const newErrors = validatePaymentForm(data);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsPaymentSaving(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsPaymentSaving(false);
        setIsPaymentSaved(true);

        localStorage.removeItem('cart');
        setCart([]);

        setTimeout(() => {
            window.location.href = "/payment-success";
        }, 2000);
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Título principal */}
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
                                                src={item.image || "/images/placeholder.png"}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
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
                                            }).format(calculateSubtotal())}
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
                                            }).format(calculateTotal())}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Información adicional */}
                        <div className="mt-8 space-y-6">
                            <div>
                                <h2 className="text-lg font-bold text-black mb-2">Información de Envío</h2>
                                <p className="text-gray-600 text-sm">
                                    Los pedidos se procesan en un plazo de 24 a 48 horas hábiles tras la confirmación del pago.
                                    El tiempo de entrega varía según la ubicación del cliente, con un promedio de 3 a 7 días hábiles.
                                    Realizamos envíos nacionales (y/o internacionales, si aplica).
                                    Una vez enviado tu pedido, recibirás un número de seguimiento por correo electrónico o WhatsApp.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-black mb-2">Política de Devoluciones</h2>
                                <p className="text-gray-600 text-sm">
                                    Aceptamos devoluciones dentro de los primeros 7 días naturales desde la recepción del producto.
                                    El artículo debe estar en su empaque original, sin uso y en perfecto estado.
                                    No se aceptan devoluciones en productos personalizados o en oferta (excepto por defectos de fábrica).
                                    Los costos de envío por devolución corren por cuenta del cliente, salvo en casos de productos defectuosos o errores de nuestro equipo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Formularios */}
                    <div className="space-y-8">
                        {/* Formulario de envío */}
                        <div className="bg-white p-6 rounded-lg border border-black">
                            <h2 className="text-2xl font-bold mb-4 text-black">Información de Envío</h2>
                            <form onSubmit={handleShippingSubmit}>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Apellidos</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Dirección</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Código Postal</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Provincia</label>
                                    <input
                                        type="text"
                                        name="province"
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center"
                                    disabled={isShippingSaving}
                                >
                                    {isShippingSaving ? (
                                        <span className="loader border-t-transparent border-white border-4 w-5 h-5 rounded-full animate-spin"></span>
                                    ) : isShippingSaved ? (
                                        <span>✔</span>
                                    ) : (
                                        "Guardar Información de Envío"
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Formulario de pago */}
                        <div className="bg-white p-6 rounded-lg border border-black">
                            <h2 className="text-2xl font-bold mb-4 text-black">Finalizar Compra</h2>
                            <form onSubmit={handlePaymentSubmit}>
                                <div className="mb-4">
                                    <label className="block text-black font-medium mb-2">Número de Tarjeta</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={cardNumber} // Usar el estado como valor
                                        onChange={handleCardNumberChange} // Controlador para manejar cambios
                                        required
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                                </div>
                                <div className="flex gap-4 mb-4">
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
                                    disabled={isPaymentSaving}
                                >
                                    {isPaymentSaving ? (
                                        <span className="loader border-t-transparent border-white border-4 w-5 h-5 rounded-full animate-spin"></span>
                                    ) : isPaymentSaved ? (
                                        <span>✔</span>
                                    ) : (
                                        "Pagar"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
