import React from 'react';

export default function Ismael() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
    };

    const sectionStyle = {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '10%',
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black', // Fondo negro
        zIndex: 0,
    };

    const imageStyle = {
        objectFit: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    };

    const textStyle = {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        marginBottom: '0.5rem',
    };

    const linkStyle = {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        fontSize: '1rem',
        textDecoration: 'underline',
        cursor: 'pointer',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px 20px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    };

    const handleLinkHover = (e) => {
        e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
    };

    const handleLinkLeave = (e) => {
        e.target.style.backgroundColor = 'rgba(0,0,0,0.5)';
    };

    // Función para manejar redirección al hacer clic en "Descubrir"
    const handleDiscoverClick = () => {
        window.location.href = '/users'; // Redirige a la página /users
    };

    const centralImageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        height: '150px',
        objectFit: 'cover',
        zIndex: 3,
    };

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <div style={backgroundStyle}></div>
                <img src="/images/mujer-removebg-preview.png" alt="Sección Izquierda" style={imageStyle} />
                <div style={textStyle}>ROPA MUJER</div>
                <div
                    style={linkStyle}
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkLeave}
                    onClick={handleDiscoverClick} // Redirige al hacer clic
                >
                    Descubrir
                </div>
            </div>

            <img
                src="/images/logo1_1.png"
                alt="Imagen Central"
                style={centralImageStyle}
            />

            <div style={sectionStyle}>
                <div style={backgroundStyle}></div>
                <img src="/images/hombre.png" alt="Sección Derecha" style={imageStyle} />
                <div style={textStyle}>ROPA HOMBRE</div>
                <div
                    style={linkStyle}
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkLeave}
                    onClick={handleDiscoverClick} // Redirige al hacer clic
                >
                    Descubrir
                </div>
            </div>
        </div>
    );
}
