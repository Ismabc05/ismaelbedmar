import React from "react";
import MainLayout from "../../layouts/MainLayout";

export default function PaymentSuccess() {
    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Completado!</h1>
                <p className="text-gray-600 text-lg">
                    Tu pago ha sido procesado con éxito. Gracias por tu compra.
                </p>
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
