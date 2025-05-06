import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";

export default function PaymentSuccess() {
    // Extraer la información pasada en la URL (no se muestra en pantalla)
    const params = new URLSearchParams(window.location.search);
    const infoParam = params.get("info");
    let invoiceInfo = null;

    try {
        if (infoParam) {
            invoiceInfo = JSON.parse(decodeURIComponent(infoParam));
            console.log("Información recibida en PaymentSuccess:", invoiceInfo);
            // Aquí podrías almacenar la información si lo requieres.
        }
    } catch (error) {
        console.error("Error al parsear la información:", error);
    }

    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [invoiceEmail, setInvoiceEmail] = useState("");
    const [invoiceSent, setInvoiceSent] = useState(false);

    const handleSendInvoice = async () => {
        if (!invoiceInfo) {
            console.error("No hay información de factura guardada");
            return;
        }

        // Filtrar la información: del carrito solo obtener nombre, descripción, cantidad, talla y precio; además los datos del formulario.
        const filteredInvoiceData = {
            formData: invoiceInfo.formData,
            cart: invoiceInfo.cart.map(item => ({
                name: item.name,
                description: item.description, // Asegúrate de que 'description' exista en cada item
                quantity: item.quantity,
                size: item.size,
                price: item.price
            }))
        };

        try {
            const response = await axios.post("/api/send-invoice", {
                email: invoiceEmail,
                invoiceData: filteredInvoiceData
            });
            console.log("Factura enviada correctamente:", response.data);
        } catch (error) {
            console.error("Error al enviar factura:", error);
        }
        setInvoiceSent(true);
        setShowInvoiceForm(false);
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Completado!</h1>
                <p className="text-gray-600 text-lg">
                    Tu pago ha sido procesado con éxito. Gracias por tu compra.
                </p>

                <div className="mt-6">
                    <button
                        onClick={() => setShowInvoiceForm(prev => !prev)}
                        className="mx-auto block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition active:border active:border-black"

                    >
                        {showInvoiceForm ? "Cancelar Factura" : "Enviar Factura por Correo"}
                    </button>
                </div>

                {showInvoiceForm && (
                    <div className="mt-4">
                        <input
                            type="email"
                            placeholder="Introduce tu correo electrónico"
                            value={invoiceEmail}
                            onChange={(e) => setInvoiceEmail(e.target.value)}
                            className="mx-auto block w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"

                        />
                        <button
                            onClick={handleSendInvoice}
                            className="mx-auto block mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition active:border active:border-black"
                        >
                            Enviar Factura
                        </button>
                    </div>
                )}

                {invoiceSent && (
                    <div className="mt-4 text-green-600 font-medium">
                        ¡La factura ha sido enviada a tu correo!
                    </div>
                )}

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
