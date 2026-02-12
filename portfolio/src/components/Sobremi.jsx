import React from "react";
import "../estilos/sobremi.css";
import foto from "../assets/foto-perfil.jpeg";
import { GrDocumentDownload } from "react-icons/gr";

function Sobremi() {
    return (
        <section className="seccion-sobremi" id="sobremi">
            <h2>Sobre mí</h2>

            <div className="contenedor-sobre-mi">

                <img src={foto} alt="Foto perfil" className="foto-sobre-mi"/>

                <div className="contenedor-parrafos">

                    <p>Pasión por el desarrollo web y la innovación digital</p>

                    <p>
                        Como estudiante de desarrollo web, me enfoco en crear experiencias digitales
                        funcionales, atractivas y centradas en el usuario. Mi interés va más allá de
                        diseñar páginas: busco comprender cómo la tecnología puede potenciar proyectos,
                        marcas y negocios en el entorno digital.
                    </p>

                    <p>
                        He trabajado en proyectos académicos y personales que incluyen sitios web
                        responsivos, aplicaciones interactivas y plataformas dinámicas, siempre
                        priorizando el rendimiento, la accesibilidad y las buenas prácticas de
                        desarrollo. Mi objetivo es seguir aprendiendo y creciendo profesionalmente,
                        aportando soluciones creativas y eficientes en cada desafío.
                    </p>

                    <div className="lista-especialidades">

                        <div>
                            <h4>Desarrollo</h4>
                            <ul>
                                <li>Aplicaciones web full-stack</li>
                                <li>Sitios web responsivos</li>
                                <li>Proyectos académicos y personales</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Especialización</h4>
                            <ul>
                                <li>Automatización básica y uso de IA</li>
                                <li>Optimización de rendimiento</li>
                                <li>Aprendizaje continuo</li>
                            </ul>
                        </div>

                    </div>

                    {/* Botón AQUÍ */}
                    <div className="contenedor-boton">
                        <button className="boton-cv" onClick={() => {
                            const link = document.createElement("a"); // crea una a
                            link.href = "/Currículum.pdf" // le decimos la ruta
                            link.download = "MiCV.pdf" // el nommbre de la descarga
                            link.click(); // Disparar la descarga
                        }}> <GrDocumentDownload className="icono-descargar" /> Descargar CV</button>
                    </div>

                </div>

            </div>

        </section>
    );
}

export { Sobremi };
