import React from "react";

export default function Dashboard() {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Bienvenido al Dashboard del Administrador</h1>
            <button
                onClick={() => (window.location.href = "/users")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Volver a Usuarios
            </button>
        </div>
    );
}
