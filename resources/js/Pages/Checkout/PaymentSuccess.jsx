import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

export default function PaymentSuccess() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSendInvoice = async () => {
        if (!email.includes("@") || !email.endsWith(".com")) {
            setMessage("Por favor, introduce un correo electrónico válido.");
            return;
        }

        setMessage("Enviando factura...");
        try {
            // Simular envío de factura
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setMessage("Factura enviada correctamente.");
        } catch (error) {
            setMessage("Hubo un error al enviar la factura.");
        }
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Completado!</h1>
                <p className="text-gray-600 text-lg">
                    Tu pago ha sido procesado con éxito. Gracias por tu compra.
                </p>

                {/* Input para correo electrónico */}
                <div className="mt-6">
                    <input
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-md"
                    />
                    <button
                        onClick={handleSendInvoice}
                        className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
                    >
                        Enviar Factura
                    </button>
                    {message && <p className="mt-4 text-gray-600">{message}</p>}
                </div>

                <a
                    href="/products"
                    className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Volver al Inicio
                </a>
            </div>
        </MainLayout>
    );
}
