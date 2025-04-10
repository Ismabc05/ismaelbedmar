import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import { usePage } from '@inertiajs/react';
import {LuArrowLeft } from "react-icons/lu";
import { Link } from "@inertiajs/react";

export default function Cart() {
    const { carts = [] } = usePage().props; // Provide a default value for carts

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`/cart/${id}`); // Llama a la API para eliminar
            router.reload(); // Recargar la página para actualizar la lista sin hacer un refresh completo
        } catch (error) {
            console.error("Error al eliminar el favorito", error);
        }
    };

    return (
        <MainLayout>
            <Link
                href="/products"
                className="self-start mb-4 text-gray-600 hover:text-black"
            >
                <LuArrowLeft size={28} />
            </Link>
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Mi Carrito</h1>

                {carts.length === 0 ? (
                    <p style={{ fontSize: "1.5rem", color: "#666" }}>No tienes carrito aún.</p>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px"
                    }}>
                        {carts.map(car => (
                            <div key={car.id} style={{
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                backgroundColor: "#fff",
                                transition: "transform 0.3s ease",
                            }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                               onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                                <h2 style={{ fontSize: "1.8rem", marginBottom: "10px", cursor: "pointer" }}>
                                    {car.product.name}
                                </h2>
                                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
                                    {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(car.product.price)}
                                </p>
                                <button onClick={() => removeFromCart(car.id)} style={{
                                    marginTop: "10px",
                                    padding: "10px 15px",
                                    backgroundColor: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease"
                                }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#cc0000"}
                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "red"}>
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


