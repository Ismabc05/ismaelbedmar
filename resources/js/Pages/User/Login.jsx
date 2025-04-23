import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Login({ users }) {
    const [forgotHovered, setForgotHovered] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createHovered, setCreateHovered] = useState(false);
    const [guestHovered, setGuestHovered] = useState(false);

    const navStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        borderBottom: '1px solid #ccc',
    };

    const logoStyle = {
        height: '60px',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 60px)',
        padding: '20px',
    };

    const formContainerStyle = {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '30px 20px',
        fontSize: '13px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    };

    const sectionStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '13px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#332f2c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        marginTop: '20px',
        marginBottom: '30px',
    };

    const createButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: createHovered ? 'black' : '#ffffff',
        color: createHovered ? 'white' : 'black',
        border: '1px solid black',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        marginTop: '10px',
    };

    const guestButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: guestHovered ? 'black' : '#ffffff',
        color: guestHovered ? 'white' : 'black',
        border: '1px solid black',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        marginTop: '10px',
    };

    const textStyle = {
        fontSize: '13px',
        marginBottom: '10px',

    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        setErrorMessage('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setErrorMessage('Debes ingresar un nombre válido');
            return;
        }
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*_]).{6,}$/;


        if (!emailPattern.test(email) && false) {
            setErrorMessage('Debes de introducir bien el correo electrónico');
        } else if (!passwordPattern.test(password) && false) {
            setErrorMessage('La contraseña debe contener al menos una letra mayúscula y un símbolo especial');
        } else {

            // Check if the user exists in the database

            axios.get('/sanctum/csrf-cookie').then(response => {


            window.axios.post('/users', {
                nombre: nombre,
                email: email,
                password: password,
            }).then((data) => {

                // Verificar si el usuario existe en la respuesta
                if (data.data) {
                    // Redirigir según el rol del usuario
                    if (data.data.rol === 'administrador') {
                        window.location.href = '/admin/dashboard'; // Redirigir al dashboard del administrador
                    } else {
                        window.location.href = '/products'; // Redirigir a la vista de productos
                    }
                }
            }).finally(() => {
                setIsLoading(false);
            });
        });
            setIsLoading(true)
        }
    };

    // Actualiza la función para login como invitado
    const handleGuestLogin = (e) => {
        e.preventDefault(); // Evita que se envíe el formulario
        localStorage.removeItem('user'); // Limpia cualquier dato de usuario previo
        window.location.href = '/products';
    };

    return (
        <>
            <nav style={navStyle}>
                <img src="/images/logo-1 (1).png" alt="Logo" style={logoStyle} />
            </nav>

            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    {/* Sección de Inicio de Sesión */}
                    <div style={sectionStyle}>
                        <h2 style={textStyle}>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={handleNombreChange}
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={handleEmailChange}
                                style={inputStyle}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                                style={inputStyle}
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {/* Enlace actualizado para restablecer contraseña */}
                            <Link
                                href="/users/password-reset"
                                className="text-xs"
                                onMouseEnter={() => setForgotHovered(true)}
                                onMouseLeave={() => setForgotHovered(false)}
                                style={{
                                    marginTop: '50px',
                                    textAlign: 'left',
                                    textDecoration: 'underline',
                                    textDecorationColor: forgotHovered ? 'black' : '#535b61',
                                    color: forgotHovered ? 'black' : 'inherit'
                                }}>
                                He olvidado mi contraseña
                            </Link>
                            <button type="submit" style={buttonStyle} disabled={isLoading}>
                                Conectarse
                            </button>
                        </form>
                    </div>

                    {/* Sección de Crear Cuenta */}
                    <div style={sectionStyle}>
                        <h2 style={textStyle}>¿Nuevo aquí?</h2>
                        <Link
                            href="/users/create"
                            style={createButtonStyle}
                            onMouseEnter={() => setCreateHovered(true)}
                            onMouseLeave={() => setCreateHovered(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                            Crear Cuenta
                        </Link>
                        {/* Nueva opción para entrar como invitado */}
                        <button
                            type="button" // Evita que el botón actúe como submit
                            onClick={(e) => handleGuestLogin(e)}
                            style={{ ...guestButtonStyle, marginTop: '10px' }}
                            onMouseEnter={() => setGuestHovered(true)}
                            onMouseLeave={() => setGuestHovered(false)}
                        >
                            Entrar como Invitado
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
