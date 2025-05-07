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

// Iconos de Ojo para contraseña
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Estados para añadir nuevo usuario
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        rol: "usuario", // Default rol
    });
    const [newUserErrors, setNewUserErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensaje de éxito

    // Estados para visibilidad de contraseña
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

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

    const confirmDeleteUser = (id) => {
        setUserToDelete(id);
        setShowModal(true);
    };

    const deleteUser = () => {
        axios.delete(`/api/users/${userToDelete}`)
            .then(() => {
                setShowModal(false);
                setUserToDelete(null);
                fetchUsers();
                setSuccessMessage("Usuario eliminado correctamente."); // Mensaje de éxito para eliminación
                setTimeout(() => setSuccessMessage(""), 3000); // Limpiar mensaje después de 3 segundos
            })
            .catch((error) => {
                console.error("Error al eliminar el usuario:", error);
            });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const saveEditedUser = (id) => {
        const { password, password_confirmation, ...userDataToUpdate } = editedUser;
        axios.put(`/api/users/${id}`, userDataToUpdate)
            .then(() => {
                setEditingUserId(null);
                fetchUsers();
                setSuccessMessage("Usuario actualizado correctamente.");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((error) => {
                console.error("Error al actualizar el usuario:", error.response ? error.response.data : error);
            });
    };

    const handleNewUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
        if (newUserErrors[name]) {
            setNewUserErrors({ ...newUserErrors, [name]: null });
        }
        if (successMessage) setSuccessMessage(""); // Limpiar mensaje de éxito si se empieza a editar de nuevo
    };

    const saveNewUser = () => {
        setNewUserErrors({});
        setSuccessMessage("");

        // Validaciones del lado del cliente
        const currentErrors = {};
        if (!newUserData.email.includes('@')) {
            currentErrors.email = ['El correo debe contener una "@".'];
        }
        if (newUserData.password.length < 6) {
            currentErrors.password = [...(currentErrors.password || []), 'La contraseña debe tener al menos 6 caracteres.'];
        }
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(newUserData.password)) {
            currentErrors.password = [...(currentErrors.password || []), 'La contraseña debe contener al menos un símbolo especial.'];
        }
        if (newUserData.password !== newUserData.password_confirmation) {
            currentErrors.password = [...(currentErrors.password || []), 'La confirmación de contraseña no coincide.'];
        }

        if (Object.keys(currentErrors).length > 0) {
            setNewUserErrors(currentErrors);
            return;
        }

        axios.post("/api/users", newUserData)
            .then(() => {
                fetchUsers();
                setIsAddingUser(false);
                setNewUserData({ name: "", email: "", password: "", password_confirmation: "", rol: "usuario" });
                setSuccessMessage("Usuario creado correctamente.");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((error) => {
                console.error("Error al crear el usuario:", error.response ? error.response.data : error);
                if (error.response && error.response.data && error.response.data.errors) {
                    // Traducir errores comunes del backend si es posible, o mostrar los que vienen
                    const backendErrors = error.response.data.errors;
                    const translatedErrors = {};
                    for (const key in backendErrors) {
                        translatedErrors[key] = backendErrors[key].map(err => {
                            if (err.includes("The email has already been taken.")) {
                                return "Este correo electrónico ya está registrado.";
                            }
                            if (err.includes("The password field confirmation does not match.")) {
                                return "La confirmación de contraseña no coincide."; // Aunque ya lo validamos en cliente
                            }
                            // Añadir más traducciones si es necesario para otros errores comunes del backend
                            return err; // Devolver el error original si no hay traducción
                        });
                    }
                    setNewUserErrors(translatedErrors);
                } else {
                    setNewUserErrors({ form: ['No se pudo crear el usuario. Por favor, revisa los datos e inténtalo de nuevo.'] });
                }
            });
    };

    const cancelNewUser = () => {
        setIsAddingUser(false);
        setNewUserData({ name: "", email: "", password: "", password_confirmation: "", rol: "usuario" });
        setNewUserErrors({});
        setSuccessMessage(""); // Limpiar mensaje de éxito al cancelar
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
                    Lista de Usuarios
                </h1>
                <button
                    onClick={() => { setIsAddingUser(true); setNewUserErrors({}); setSuccessMessage(""); }}
                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition"
                >
                    Añadir Usuario
                </button>
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {/* Mensaje de error general del formulario */}
            {newUserErrors.form && !successMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {newUserErrors.form.join(', ')}
                </div>
            )}

            <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Nombre</th>
                        <th className="py-2 px-4 text-left">Correo</th>
                        <th className="py-2 px-4 text-left">Rol</th>
                        <th className="py-2 px-4 text-left">Contraseña</th>
                        <th className="py-2 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {isAddingUser && (
                        <tr className="border-b bg-green-50">
                            <td className="py-2 px-4 italic text-gray-500">Nuevo</td>
                            <td className="py-2 px-4">
                                <input type="text" name="name" value={newUserData.name} onChange={handleNewUserInputChange} className={`border rounded px-2 py-1 w-full ${newUserErrors.name ? 'border-red-500' : ''}`} placeholder="Nombre"/>
                                {newUserErrors.name && <p className="text-red-500 text-xs italic">{newUserErrors.name.join(', ')}</p>}
                            </td>
                            <td className="py-2 px-4">
                                <input type="email" name="email" value={newUserData.email} onChange={handleNewUserInputChange} className={`border rounded px-2 py-1 w-full ${newUserErrors.email ? 'border-red-500' : ''}`} placeholder="Correo"/>
                                {newUserErrors.email && <p className="text-red-500 text-xs italic">{newUserErrors.email.join(', ')}</p>}
                            </td>
                            <td className="py-2 px-4">
                                <select name="rol" value={newUserData.rol} onChange={handleNewUserInputChange} className={`border rounded px-2 py-1 w-full ${newUserErrors.rol ? 'border-red-500' : ''}`}>
                                    <option value="usuario">Usuario</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                                {newUserErrors.rol && <p className="text-red-500 text-xs italic">{newUserErrors.rol.join(', ')}</p>}
                            </td>
                            <td className="py-2 px-4">
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="password"
                                        value={newUserData.password}
                                        onChange={handleNewUserInputChange}
                                        className={`border rounded px-2 py-1 w-full pr-10 ${newUserErrors.password ? 'border-red-500' : ''}`} // pr-10 para espacio para el icono
                                        placeholder="Contraseña"
                                    />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
                                        {showNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {newUserErrors.password && <p className="text-red-500 text-xs italic mt-1">{newUserErrors.password.join(' ')}</p>}

                                <div className="relative mt-1">
                                    <input
                                        type={showNewPasswordConfirmation ? "text" : "password"}
                                        name="password_confirmation"
                                        value={newUserData.password_confirmation}
                                        onChange={handleNewUserInputChange}
                                        className={`border rounded px-2 py-1 w-full pr-10 ${newUserErrors.password ? 'border-red-500' : ''}`} // pr-10 para espacio para el icono
                                        placeholder="Confirmar Contraseña"
                                    />
                                    <button type="button" onClick={() => setShowNewPasswordConfirmation(!showNewPasswordConfirmation)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700">
                                        {showNewPasswordConfirmation ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                <button onClick={saveNewUser} className="mr-2 text-green-600 hover:text-green-800 transition" title="Guardar Nuevo"><SaveIcon /></button>
                                <button onClick={cancelNewUser} className="text-gray-600 hover:text-gray-800 transition" title="Cancelar"><CancelIcon /></button>
                            </td>
                        </tr>
                    )}
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{user.id}</td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <input type="text" name="name" defaultValue={user.name} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( user.name )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <input type="email" name="email" defaultValue={user.email} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full"/>
                                ) : ( user.email )}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                     <select name="rol" defaultValue={user.rol} onChange={handleEditInputChange} className="border rounded px-2 py-1 w-full">
                                        <option value="usuario">Usuario</option>
                                        <option value="administrador">Administrador</option>
                                    </select>
                                ) : ( user.rol )}
                            </td>
                            <td className="py-2 px-4 italic text-gray-400">
                                {editingUserId === user.id ? "No se edita aquí" : "********"}
                            </td>
                            <td className="py-2 px-4">
                                {editingUserId === user.id ? (
                                    <>
                                        <button onClick={() => saveEditedUser(user.id)} className="mr-2 text-green-600 hover:text-green-800 transition" title="Guardar"><SaveIcon /></button>
                                        <button onClick={() => setEditingUserId(null)} className="mr-2 text-gray-600 hover:text-gray-800 transition" title="Cancelar"><CancelIcon /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditingUserId(user.id); setEditedUser(user); setSuccessMessage("");}} className="mr-2 text-blue-600 hover:text-blue-800 transition" title="Modificar"><EditIcon /></button>
                                        <button onClick={() => confirmDeleteUser(user.id)} className="mr-2 text-red-600 hover:text-red-800 transition" title="Eliminar"><DeleteIcon /></button>
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
                        <p className="mb-4">¿Estás seguro de que deseas eliminar este usuario?</p>
                        <div className="flex justify-between">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">Cancelar</button>
                            <button onClick={deleteUser} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
