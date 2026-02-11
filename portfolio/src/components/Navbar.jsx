import React from "react";
import '../estilos/navbar.css';

function Navbar() {
    return (
        <nav className="navbar"> 
            <div className="logo" onClick={() => {
                window.location.reload()
            }}>Ismael Bedmar</div>
            <ul className="lista-navbar">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#sobremi">Sobre mi</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#proyectos">Proyectos</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    )
}


export { Navbar } ;