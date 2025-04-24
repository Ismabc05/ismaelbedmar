import React, { useEffect, useState } from "react";
import axios from "axios";

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
                                            className="mr-2 text-green-600 hover:underline transition"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditingUserId(null)}
                                             className="mr-2 text-black hover:underline transition"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingUserId(user.id);
                                                setEditedUser(user); // Establecer los datos actuales del usuario
                                            }}
                                            className="mr-2 text-black hover:underline transition"
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteUser(user.id)}
                                            className="mr-2 text-red-600 hover:underline transition"
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
