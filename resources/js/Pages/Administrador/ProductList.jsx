import React, { useEffect, useState } from "react";
import axios from "axios";

// Icono de Lápiz (Modificar)
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

// Icono de Papelera (Eliminar)
const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

// Icono de Guardar (Check)
const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

// Icono de Cancelar (X)
const CancelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Estados para añadir nuevo producto
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [newProductData, setNewProductData] = useState({
        name: "",
        description: "",
        price: "",
        sizes: "", // Se manejarán como strings separados por comas
        colors: "", // Se manejarán como strings separados por comas
        images: '[]', // Default a un array JSON vacío para imágenes
    });

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

    const confirmDeleteProduct = (id) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const deleteProduct = () => {
        axios.delete(`/api/products/${productToDelete}`)
            .then(() => {
                setShowModal(false);
                setProductToDelete(null);
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error al eliminar el producto:", error);
            });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const saveEditedProduct = (id) => {
        const productDataToSave = { ...editedProduct };
        if (typeof productDataToSave.sizes === 'string') {
            productDataToSave.sizes = productDataToSave.sizes.split(',').map(s => s.trim()).filter(s => s);
        } else if (!Array.isArray(productDataToSave.sizes)) {
            productDataToSave.sizes = [];
        }

        if (typeof productDataToSave.colors === 'string') {
            productDataToSave.colors = productDataToSave.colors.split(',').map(s => s.trim()).filter(s => s);
        } else if (!Array.isArray(productDataToSave.colors)) {
            productDataToSave.colors = [];
        }
        // Asegurar que images sea un array JSON válido, incluso si está vacío o es un string
        try {
            let imagesArray = typeof productDataToSave.images === 'string' ? JSON.parse(productDataToSave.images) : productDataToSave.images;
            if (!Array.isArray(imagesArray)) imagesArray = [];
            productDataToSave.images = JSON.stringify(imagesArray);
        } catch (e) {
            productDataToSave.images = '[]'; // Default a array vacío si hay error de parseo
        }


        axios.put(`/api/products/${id}`, productDataToSave)
            .then(() => {
                setEditingProductId(null);
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
            });
    };

    // Manejar cambios para el nuevo producto
    const handleNewProductInputChange = (e) => {
        const { name, value } = e.target;
        setNewProductData({ ...newProductData, [name]: value });
    };

    // Guardar el nuevo producto
    const saveNewProduct = () => {
        const productToSend = {
            ...newProductData,
            // Convertir strings de tallas y colores a arrays de strings
            sizes: newProductData.sizes.split(',').map(s => s.trim()).filter(s => s),
            colors: newProductData.colors.split(',').map(s => s.trim()).filter(s => s),
            // Asegurar que images sea un array JSON válido
            images: (() => {
                try {
                    const parsed = JSON.parse(newProductData.images);
                    return Array.isArray(parsed) ? JSON.stringify(parsed) : '[]';
                } catch (e) {
                    return '[]'; // Default si no es un JSON válido
                }
            })()
        };

        axios.post("/api/products", productToSend)
            .then(() => {
                fetchProducts();
                setIsAddingProduct(false);
                setNewProductData({ name: "", description: "", price: "", sizes: "", colors: "", images: '[]' }); // Reset form
            })
            .catch((error) => {
                console.error("Error al crear el producto:", error.response ? error.response.data : error);
                // Aquí podrías mostrar errores de validación si tu API los devuelve
            });
    };

    // Cancelar añadir nuevo producto
    const cancelNewProduct = () => {
        setIsAddingProduct(false);
        setNewProductData({ name: "", description: "", price: "", sizes: "", colors: "", images: '[]' }); // Reset form
    };


    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => (window.location.href = "/admin/dashboard")}
                    className="text-gray-800 hover:text-gray-600 transition text-3xl"
                >
                    ←
                </button>
                <h1 className="text-3xl font-bold text-gray-800">
                    Lista de Productos
                </h1>
                <button
                    onClick={() => setIsAddingProduct(true)}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition"
                >
                    Añadir Producto
                </button>
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
                        {/* <th className="py-2 px-4 text-left">Imágenes (JSON)</th> */}
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {isAddingProduct && (
                        <tr className="border-b bg-green-50">
                            <td className="py-2 px-4 italic text-gray-500">Nuevo</td>
                            <td className="py-2 px-4">
                                <input type="text" name="name" value={newProductData.name} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder="Nombre"/>
                            </td>
                            <td className="py-2 px-4">
                                <input type="text" name="description" value={newProductData.description} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder="Descripción"/>
                            </td>
                            <td className="py-2 px-4">
                                <input type="number" name="price" value={newProductData.price} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder="Precio"/>
                            </td>
                            <td className="py-2 px-4">
                                <input type="text" name="sizes" value={newProductData.sizes} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder="S,M,L"/>
                            </td>
                            <td className="py-2 px-4">
                                <input type="text" name="colors" value={newProductData.colors} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder="Rojo,Azul"/>
                            </td>
                            {/* <td className="py-2 px-4">
                                <input type="text" name="images" value={newProductData.images} onChange={handleNewProductInputChange} className="border rounded px-2 py-1 w-full" placeholder='["url1","url2"]'/>
                            </td> */}
                            <td className="py-2 px-4">
                                <button onClick={saveNewProduct} className="mr-2 text-green-600 hover:text-green-800 transition" title="Guardar Nuevo"><SaveIcon /></button>
                                <button onClick={cancelNewProduct} className="text-gray-600 hover:text-gray-800 transition" title="Cancelar"><CancelIcon /></button>
                            </td>
                        </tr>
                    )}
                    {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{product.id}</td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="text" name="name" defaultValue={product.name} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( product.name )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="text" name="description" defaultValue={product.description} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( product.description )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="number" name="price" defaultValue={product.price} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( product.price )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="text" name="sizes" defaultValue={Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || '')} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || '') )}
                            </td>
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="text" name="colors" defaultValue={Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || '')} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( Array.isArray(product.colors) ? product.colors.join(', ') : (product.colors || '') )}
                            </td>
                            {/* <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <input type="text" name="images" defaultValue={typeof product.images === 'string' ? product.images : JSON.stringify(product.images || [])} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( typeof product.images === 'string' ? product.images.substring(0,30)+'...' : JSON.stringify(product.images || []).substring(0,30)+'...' )}
                            </td> */}
                            <td className="py-2 px-4">
                                {editingProductId === product.id ? (
                                    <>
                                        <button onClick={() => saveEditedProduct(product.id)} className="mr-2 text-green-600 hover:text-green-800 transition" title="Guardar"><SaveIcon /></button>
                                        <button onClick={() => setEditingProductId(null)} className="text-gray-600 hover:text-gray-800 transition" title="Cancelar"><CancelIcon /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditingProductId(product.id); setEditedProduct(product);}} className="mr-2 text-blue-600 hover:text-blue-800 transition" title="Modificar"><EditIcon /></button>
                                        <button onClick={() => confirmDeleteProduct(product.id)} className="text-red-600 hover:text-red-800 transition" title="Eliminar"><DeleteIcon /></button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-center text-xl font-bold mb-4">Confirmar eliminación</h2>
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este producto?</p>
                        <div className="flex justify-between">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">Cancelar</button>
                            <button onClick={deleteProduct} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
