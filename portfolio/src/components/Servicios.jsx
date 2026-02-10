import React from "react";
import "../estilos/servicios.css";

function Servicios () {
    return(
        <section className="seccion-servicios" id="servicios">
            <div className="titulos-servicios">
                <h2>Servicios</h2>
                <p>
                  Creo soluciones web y proyectos digitales prácticos, aplicando mis conocimientos en desarrollo y aprendiendo constantemente para mejorar cada proyecto.
                </p>
            </div>

            <div className="rectangulos">

                <div className="contenido-rectangulos">
                    <div className="icono-servicio">🌐</div>
                    <div className="parrafos-rectangualos">
                        <p>Desarrollo Web</p>
                        <p>Aplicaciones web modernas y escalables con las últimas tecnologías</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>React</li>
                            <li>API Rest</li>
                            <li>Progressive Web Apps</li>
                            <li>Laravel</li>
                        </ul>
                    </div>
                    <p className="solicitar-info">Solicitar información →</p>
                </div>

                <div className="contenido-rectangulos">
                    <div className="icono-servicio">🎨</div>
                    <div className="parrafos-rectangualos">
                        <p>Diseño & Experiencia de Usuario</p>
                        <p>Diseño de interfaces intuitivas y atractivas</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>UI Design</li>
                            <li>UX Research</li>
                            <li>Wireframes</li>
                            <li>Prototipos</li>
                        </ul>
                    </div>
                    <p className="solicitar-info">Solicitar información →</p>
                </div>

                <div className="contenido-rectangulos">
                    <div className="icono-servicio">⚙️</div>
                    <div className="parrafos-rectangualos">
                        <p>Automatización</p>
                        <p>Optimización de procesos digitales y flujos de trabajo</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>APIs</li>
                            <li>Integraciones</li>
                            <li>Scripts</li>
                            <li>Optimización</li>
                        </ul>
                    </div>
                    <p className="solicitar-info">Solicitar información →</p>
                </div>

            </div>
        </section>
    )
}

export { Servicios }