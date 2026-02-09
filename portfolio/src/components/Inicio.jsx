import React from "react";
import '../estilos/inicio.css';

function Inicio() {
    return(
        <section className="section-inicio">

            <div className="titulos-inicio">
                <h1 className="titulo-inicio">Hola, soy <span className="nombre">Ismael Bedmar</span></h1>
                <p className="segundo-titulo-inicio">Desarrollador web junior</p>
                <p className="tercer-titulo-inicio">Apasionado por crear experiencias web limpias y funcionales</p>
            </div>

            <div className="cuadrado">
                <p>Me especializo en desarrollo web y creación de aplicaciones modernas, con atención al rendimiento, buenas prácticas y experiencia de usuario. Me esfuerzo en cada proyecto para entregar soluciones limpias, escalables y mantenibles.</p>
            </div>

            <div className="contenedor-botones">
                <button className="boton1">Trabajemos juntos</button>
                <button className="boton2">Conoce más sobre mi</button>
            </div>
            
            <div className="contenedor-tecno">
                <p>Tecnologías con las que trabajo</p>
                <div className="contenedor-aptitudes">
                    <span className="java">JavaScript</span>
                    <span className="react">React</span>
                    <span className="html">Html</span>
                    <span className="css">CSS</span>
                    <span className="laravel">Laravel</span>
                    <span className="php">Php</span>
                </div>
            </div>

        </section>
    )
}




export { Inicio }