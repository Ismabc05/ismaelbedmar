import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("/api/orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los pedidos:", error);
            });
    };

    const confirmDeleteOrder = (id) => {
        setOrderToDelete(id);
        setShowModal(true);
    };

    const deleteOrder = () => {
        axios.delete(`/api/orders/${orderToDelete}`)
            .then(() => {
                setShowModal(false);
                setOrderToDelete(null);
                fetchOrders();
            })
            .catch((error) => {
                console.error("Error al eliminar el pedido:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => (window.location.href = "/admin/dashboard")}
                    className="text-gray-800 hover:text-gray-600 transition mr-4 text-2xl"
                >
                    ←
                </button>
                <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
                    Lista de Pedidos
                </h1>
            </div>
            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">Product ID</th>
                        <th className="py-2 px-4 text-left">User ID</th>
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{order.id}</td>
                            <td className="py-2 px-4">{order.user_id}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => confirmDeleteOrder(order.id)}
                                    className="mr-2 text-red-600 hover:underline transition"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-center text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este pedido?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteOrder}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
