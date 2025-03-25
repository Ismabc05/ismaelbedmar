import React, { useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

export default function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f4f4f4',
        padding: '20px'
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '8px',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        margin: '15px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px'
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#332f2c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        marginTop: '10px'
    };

    const linkStyle = {
        display: 'block',
        marginTop: '20px',
        color: linkHover ? '#000' : '#332f2c',
        textDecoration: 'underline'
    };

    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px'
    };

    const messageStyle = {
        margin: '10px 0',
        fontSize: '14px'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        axios.post('/users/password-reset', { email }) // Ruta actualizada
            .then((response) => {
                setMessage('Se ha enviado un correo para restablecer tu contraseña.');
            })
            .catch((error) => {
                setError('Error al enviar el correo. Inténtalo nuevamente.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    {error && <p style={{ ...messageStyle, color: 'red' }}>{error}</p>}
                    {message && <p style={{ ...messageStyle, color: 'green' }}>{message}</p>}
                    <button type="submit" disabled={isLoading} style={buttonStyle}>
                        {isLoading ? 'Enviando...' : 'Enviar Correo'}
                    </button>
                </form>
                <Link
                    href="/users"
                    style={linkStyle}
                    onMouseEnter={() => setLinkHover(true)}
                    onMouseLeave={() => setLinkHover(false)}
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
