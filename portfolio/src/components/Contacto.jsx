import React from "react";
import "../estilos/contacto.css";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { CgMail } from "react-icons/cg";

function Contacto() {
  return (
    <section className="contacto" id="contacto">
      <h2 className="titulo-contacto">Contacto</h2>
      <p className="contacto-subtitulo">
        ¿Tienes una idea o necesitas ayuda con un proyecto existente? 
        Completa el formulario y te responderé lo antes posible.
      </p>

      <div className="contacto-contenedor">
        {/* Columna izquierda: formulario */}
        <form className="contacto-form">
          <h3>Envíame un mensaje</h3>

          <div className="contacto-grid-dos">
            <div className="campo">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" />
            </div>

            <div className="campo">
              <label>Apellidos</label>
              <input type="text" placeholder="Tus apellidos" />
            </div>
          </div>

          <div className="campo">
            <label>Email</label>
            <input type="email" placeholder="tu@email.com" />
          </div>

          <div className="campo">
            <label>Cúentame</label>
            <textarea
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">
            Enviar mensaje
          </button>
        </form>

        {/* Columna derecha: contacto directo / info extra */}
        <div className="contacto-info">
          <div className="bloque-info">
            <h3>Contacto directo</h3>
            <ul className="ul-lista">
              <li>
                <span className="info-titulo">Email</span>
                <a href="mailto:tu@email.com" className="contact-link">
                  <CgMail className="icono-contacto" />
                  ismaelbedmar@gmail.com
                </a>
              </li>
              <li>
                <span className="info-titulo">LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/ismaelbedmar/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <IoLogoLinkedin className="icono-contacto" />
                  linkedin.com/in/ismaelbedmar
                </a>
              </li>
              <li>
                <span className="info-titulo">GitHub</span>
                <a
                  href="https://github.com/Ismabc05"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <FaGithub className="icono-contacto" />
                  github.com/ismaelbedmar
                </a>
              </li>
            </ul>
          </div>

          <div className="bloque-info">
            <h3>Tiempo de respuesta</h3>
            <p>Siempre responder entre 1 a 2 horas</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contacto };
