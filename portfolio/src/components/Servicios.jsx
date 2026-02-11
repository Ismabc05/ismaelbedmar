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
                        <p>Creación de sitios web y aplicaciones web sencillas, con enfoque en funcionalidad y experiencia de usuario.</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>React</li>
                            <li>API Rest</li>
                            <li>Progressive Web Apps</li>
                            <li>JavaScript</li>
                        </ul>
                    </div>
                    <p className="solicitar-info">Solicitar información →</p>
                </div>

                <div className="contenido-rectangulos">
                    <div className="icono-servicio">🎨</div>
                    <div className="parrafos-rectangualos">
                        <p>Diseño & Experiencia de Usuario</p>
                        <p>Diseño de interfaces básicas y prototipos interactivos, centrados en la usabilidad y la experiencia del usuario.</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>UI Design</li>
                            <li>UX Research inicial</li>
                            <li>Wireframes simpless</li>
                            <li>Prototipos funcionales</li>
                        </ul>
                    </div>
                    <p className="solicitar-info">Solicitar información →</p>
                </div>

                <div className="contenido-rectangulos">
                    <div className="icono-servicio">⚙️</div>
                    <div className="parrafos-rectangualos">
                        <p>Automatización</p>
                        <p>Pequeñas soluciones para automatizar tareas repetitivas y mejorar flujos de trabajo de manera práctica.</p>
                    </div>
                    <div className="lista-rectngulos">
                        <p>Incluye:</p>
                        <ul>
                            <li>APIs</li>
                            <li>Node.js básico</li>
                            <li>Scripts simples</li>
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