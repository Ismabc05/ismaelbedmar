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

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null); // ID del usuario que se está editando
    const [editedUser, setEditedUser] = useState({}); // Datos del usuario editado
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [userToDelete, setUserToDelete] = useState(null); // Usuario que se va a eliminar

    // Obtener la lista de usuarios desde el backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("/api/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los usuarios:", error);
            });
    };

    // Confirmar eliminación del usuario
    const confirmDeleteUser = (id) => {
        setUserToDelete(id); // Establecer el usuario que se va a eliminar
        setShowModal(true); // Mostrar el modal
    };

    // Eliminar un usuario
    const deleteUser = () => {
        axios.delete(`/api/users/${userToDelete}`)
            .then(() => {
                setShowModal(false); // Ocultar el modal
                setUserToDelete(null); // Limpiar el usuario a eliminar
                fetchUsers(); // Actualizar la lista de usuarios
            })
            .catch((error) => {
                console.error("Error al eliminar el usuario:", error);
            });
    };

    // Guardar los cambios del usuario
    const saveUser = (id) => {
        axios.put(`/api/users/${id}`, editedUser)
            .then(() => {
                setEditingUserId(null); // Salir del modo de edición
                fetchUsers(); // Actualizar la lista de usuarios
            })
            .catch((error) => {
                console.error("Error al actualizar el usuario:", error);
            });
    };

    // Manejar cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="flex items-center mb-6">
                {/* Flecha para volver al panel de administración */}
                <button
                    onClick={() => (window.location.href = "/admin/dashboard")}
                    className="text-gray-800 hover:text-gray-600 transition mr-4 text-2xl"
                >
                    ←
                </button>
                {/* Título centrado */}
                <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
                    Lista de Usuarios
                </h1>
            </div>
            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Nombre</th>
                        <th className="py-2 px-4 text-left">Correo</th>
                        <th className="py-2 px-4 text-left">Rol</th>
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user.name}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <input
                                        type="text"
                                        name="rol"
                                        defaultValue={user.rol}
                                        onChange={handleInputChange}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    user.rol
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <>
                                        <button
                                            onClick={() => saveUser(user.id)}
                                            className="mr-2 text-green-600 hover:text-green-800 transition"
                                            title="Guardar"
                                        >
                                            <SaveIcon />
                                        </button>
                                        <button
                                            onClick={() => setEditingUserId(null)}
                                             className="mr-2 text-gray-600 hover:text-gray-800 transition"
                                             title="Cancelar"
                                        >
                                            <CancelIcon />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingUserId(user.id);
                                                setEditedUser(user); // Establecer los datos actuales del usuario
                                            }}
                                            className="mr-2 text-blue-600 hover:text-blue-800 transition"
                                            title="Modificar"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteUser(user.id)}
                                            className="mr-2 text-red-600 hover:text-red-800 transition"
                                            title="Eliminar"
                                        >
                                            <DeleteIcon />
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
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este usuario?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteUser}
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
