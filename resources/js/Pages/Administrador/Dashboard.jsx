import React from "react";

export default function Dashboard() {
    const handleLogout = () => {
        axios.post('/users/logout')
            .then(() => {
                localStorage.clear();
                window.location.href = "/users";
            })
            .catch(err => {
                console.error("Error closing session", err);
                localStorage.clear();
                window.location.href = "/users";
            });
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center">
            {/* Título centrado arriba */}
            <header className="w-full bg-gray-200 py-4 px-8 flex flex-col items-center relative">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
                    <p className="text-gray-600">Bienvenido al panel de administración</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="absolute right-8 top-4 text-black hover:underline transition"
                >
                    Cerrar Sesión
                </button>
            </header>

            {/* Contenido centrado */}
            <div className="flex-grow flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl">
                    {/* Cuadrado 1 */}
                    <button
                        onClick={() => (window.location.href = "/admin/users")}
                        className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition w-[300px] h-40 border hover:border-black hover:border-2"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Usuarios</h2>
                        <p>Gestión de usuarios registrados</p>
                    </button>
                    {/* Cuadrado 2 */}
                    <button
                        onClick={() => (window.location.href = "/admin/products")}
                        className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition w-[300px] h-40 border hover:border-black hover:border-2"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Productos</h2>
                        <p>Gestión de productos disponibles en la tienda</p>
                    </button>
                    {/* Cuadrado 3 */}
                    <div className="col-span-2 flex justify-center">
                        <button
                            onClick={() => (window.location.href = "/admin/orders")}
                            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition w-[300px] h-40 border hover:border-black hover:border-2"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedidos</h2>
                            <p>Revisión y control de pedidos realizados</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
