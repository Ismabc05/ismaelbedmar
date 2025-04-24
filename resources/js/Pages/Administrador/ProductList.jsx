import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null); // ID del producto que se está editando
    const [editedProduct, setEditedProduct] = useState({}); // Datos del producto editado
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [productToDelete, setProductToDelete] = useState(null); // Producto que se va a eliminar

    // Obtener la lista de productos desde el backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
            });
    };

    // Confirmar eliminación del producto
    const confirmDeleteProduct = (id) => {
        setProductToDelete(id); // Establecer el producto que se va a eliminar
        setShowModal(true); // Mostrar el modal
    };

    // Eliminar un producto
    const deleteProduct = () => {
        axios.delete(`/api/products/${productToDelete}`)
            .then(() => {
                setShowModal(false); // Ocultar el modal
                setProductToDelete(null); // Limpiar el producto a eliminar
                fetchProducts(); // Actualizar la lista de productos
            })
            .catch((error) => {
                console.error("Error al eliminar el producto:", error);
            });
    };

    // Guardar los cambios del producto
    const saveProduct = (id) => {
        axios.put(`/api/products/${id}`, editedProduct)
            .then(() => {
                setEditingProductId(null); // Salir del modo de edición
                fetchProducts(); // Actualizar la lista de productos
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
            });
    };

    // Manejar cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="flex items-center mb-6">
                {/* Flecha para volver al panel de administración */}
                <button
                    onClick={() => (window.location.href = "/admin/dashboard")}
                    className="text-gray-800 hover:text-gray-600 transition mr-4 text-3xl"
                >
                    ←
                </button>
                {/* Título centrado */}
                <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
                    Lista de Productos
                </h1>
            </div>
            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Nombre</th>
                        <th className="py-2 px-4 text-left">Descripción</th>
                        <th className="py-2 px-4 text-left">Precio</th>
                        <th className="py-2 px-4 text-left">Tallas</th>
                        <th className="py-2 px-4 text-left">Colores</th>
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{product.id}</td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={product.name}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="descripcion"
                                        defaultValue={product.descripcion}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    product.descripcion
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input
                                        type="number"
                                        name="precio"
                                        defaultValue={product.precio}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    product.precio
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="tallas"
                                        defaultValue={product.tallas}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    product.tallas
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        name="colores"
                                        defaultValue={product.colores}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    product.colores
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <>
                                        <button
                                            onClick={() => saveProduct(product.id)}
                                            className="mr-2 text-green-600 hover:underline transition"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditingProductId(null)}
                                            className="text-gray-600 hover:underline transition"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingProductId(product.id);
                                                setEditedProduct(product); // Establecer los datos actuales del producto
                                            }}
                                            className="mr-2 text-black hover:underline transition"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteProduct(product.id)}
                                            className="text-black hover:underline transition"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-center text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteProduct}
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
