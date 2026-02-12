import React from "react";
import "../estilos/footer.css";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { CgMail } from "react-icons/cg";

function Footer () {
    return(
        <footer className="footer">
            <div className="contenedor-footer">
                <div className="contenedores">
                    <div className="contenedor-info">
                        <h3>Ismael Bedmar</h3>
                        <p>Ingeniero de software especializado en desarrollo web y móvil a medida, automatización de procesos y consultoría técnica.</p>
                        <div className="contenedor-iconos">
                        <a className="gmail-footer"><CgMail/></a>
                        <a href="https://www.linkedin.com/in/ismaelbedmar/" target="_blank" rel="noreferrer" className="linkedin-footer"><IoLogoLinkedin/></a>
                        <a href="https://github.com/Ismabc05" target="_blank" rel="noreferrer" className="github-footer"><FaGithub/></a>
                        </div>
                    </div>
                    <div className="contenedor-links">
                        <h4>Navegacion</h4>
                        <ul>
                            <a href="#inicio">Inicio</a>
                            <a href="#sobremi">Sobre mi</a>
                            <a href="#servicios">Servicios</a>
                            <a href="#proyectos">Proyectos</a>
                            <a href="#contacto">Contacto</a>
                        </ul>
                    </div>
                    <div className="contenedor-servicios">
                        <h4 className="Servicios">Servicios</h4>
                        <ul>
                            <li>Desarrollo web</li>
                            <li>Diseño y experiencia del usuario</li>
                            <li>Automatización</li>
                        </ul>
                    </div>
                    <div className="contenedor-creditos">
                        <div className="contenedor-copyright">
                            <p>© 2025 Ismael Bedmar. Todos los derechos reservados.</p>
                        </div>
                        <div>
                            <a href="/politica" className="politica">Politica de privacidad</a>
                            <a href="/terminos" className="terminos">Terminos de uso</a>
                            <span>Hecho con ❤️ en España</span>
                        </div>
                    </div>

                </div>

            </div>

        </footer>
    )
}

export { Footer }