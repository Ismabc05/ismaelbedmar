import React, { useState } from 'react';

export default function Create({ user }) {
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        setIsLoading(true); // Bloquea el botón

        try {
            const response = await window.axios.post('/users/store', {
                name,
                email,
                password
            });

            if (response.status === 200) {
                window.location.href = '/users';
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Error al comunicarse con el servidor.');
        } finally {
            setIsLoading(false); // Asegura que se desbloquee el botón después de la respuesta
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

            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <div style={sectionStyle}>
                        <h2 style={textStyle}>Regístrate Ahora</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={handleNameChange}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={handleEmailChange}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                                style={inputStyle}
                                required
                            />
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            <a className="text-xs" href="" style={{ marginTop: '50px', textAlign: 'left', textDecoration: 'underline', textDecorationColor: '#535b61' }}>He olvidado mi contraseña</a>
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
