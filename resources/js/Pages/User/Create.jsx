import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import { LuArrowLeft } from "react-icons/lu";

// Iconos de Ojo para contraseña
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: '20px', width: '20px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: '20px', width: '20px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

export default function Create({ user }) {
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrorMessage('');
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setErrorMessage('');
    };

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*_])/;

        if (!emailPattern.test(email)) {
            setErrorMessage('Debes de introducir bien el correo electrónico');
            return;
        }
        if (!passwordPattern.test(password)) {
            setErrorMessage('La contraseña debe contener al menos una letra mayúscula y un símbolo especial');
            return;
        }
        if (phone.length < 9) {
            setErrorMessage('El número de teléfono debe tener al menos 9 caracteres');
            return;
        }

        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        const dayDiff = today.getDate() - birthDateObj.getDate();

        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            setErrorMessage('Debes tener al menos 18 años para registrarte');
            return;
        }

        setIsLoading(true);

        try {
            const response = await window.axios.post('/users/store', {
                name,
                email,
                password,
                phone,
                birthDate
            });

            if (response.status === 200 || response.status === 201) {
                setSuccessMessage('¡Usuario registrado con éxito! Redirigiendo...');
                setName('');
                setEmail('');
                setPassword('');
                setPhone('');
                setBirthDate('');
                setShowPassword(false);
                setTimeout(() => {
                    window.location.href = '/users';
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.errors) {
                const firstErrorKey = Object.keys(error.response.data.errors)[0];
                setErrorMessage(error.response.data.errors[firstErrorKey][0]);
            } else {
                setErrorMessage('Error al comunicarse con el servidor.');
            }
        } finally {
            setIsLoading(false);
        }
    };

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
        boxSizing: 'border-box',
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

    const CreateButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: isHovered ? 'black' : '#ffffff',
        color: isHovered ? 'white' : 'black',
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

    return (
        <>
            <nav style={navStyle}>
                <img src="/images/logo-1 (1).png" alt="Logo" style={logoStyle} />
            </nav>
            <Link
                href="/users"
                style={{ marginLeft: '20px' }}
                className="self-start mb-2 text-gray-500 hover:text-black"
            >
                <LuArrowLeft size={28} />
            </Link>

            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <div style={sectionStyle}>
                        <h2 style={textStyle}>Regístrate Ahora</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                                style={inputStyle}
                                required
                            />
                            <div style={{ position: 'relative', width: '100%', margin: inputStyle.margin }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                                    style={{ ...inputStyle, margin: '0', paddingRight: '40px' }}
                                    required
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
                                    }}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Número de Teléfono"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); setErrorMessage(''); }}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="date"
                                placeholder="Fecha de Nacimiento"
                                value={birthDate}
                                onChange={(e) => { setBirthDate(e.target.value); setErrorMessage(''); }}
                                style={inputStyle}
                                required
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            <button type="submit" style={buttonStyle} disabled={isLoading}>
                                Crear Cuenta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
