import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios'; // Asegúrate de que axios esté importado

// Iconos de Ojo para contraseña
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ height: '20px', width: '20px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ height: '20px', width: '20px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export default function Login({ users }) {
    const [forgotHovered, setForgotHovered] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createHovered, setCreateHovered] = useState(false);
    const [guestHovered, setGuestHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Estado para visibilidad de contraseña

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
        setErrorMessage(''); // Limpiar cualquier mensaje de error previo

        if (!nombre.trim()) {
            setErrorMessage('Debes ingresar un nombre válido');
            return;
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*_]).{6,}$/;

        if (!emailPattern.test(email)) {
            setErrorMessage('Debes introducir un correo electrónico válido');
            return;
        }

        if (!passwordPattern.test(password)) {
            setErrorMessage('La contraseña debe contener al menos una letra mayúscula y un símbolo especial');
            return;
        }

        setIsLoading(true);

        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/users', {
                nombre: nombre,
                email: email,
                password: password,
            })
            .then((data) => {
                if (data.data) {
                    if (data.data.rol === 'administrador') {
                        window.location.href = '/admin/dashboard';
                    } else {
                        window.location.href = '/products';
                    }
                }
            })
            .catch((error) => {
                console.error('Error al iniciar sesión:', error);
                setErrorMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            })
            .finally(() => {
                setIsLoading(false);
            });
        });
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
                            <div style={{ position: 'relative', width: '100%', margin: '10px 0' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    style={{ ...inputStyle, margin: 0, paddingRight: '40px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        color: '#333'
                                    }}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {errorMessage && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errorMessage}</p>}
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
                        <button
                            type="button"
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
