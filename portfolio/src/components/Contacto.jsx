import React from "react";
import "../estilos/contacto.css";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import emailjs from "@emailjs/browser";

function Contacto() {
  const datosFormulario = {
    nombre: "",
    apellido: "",
    email: "",
    cuentame: "",
  };

  const [formulario, setFormulario] = React.useState(datosFormulario);
  const [errores, setErrores] = React.useState({});
  const [mensaje, setMensaje] = React.useState(false);

  const enviarFormulario = (event) => {
    event.preventDefault();

    const erroresTemp = {};

    if (!formulario.nombre.trim())
      erroresTemp.nombre = "Debes ingresar tu nombre";
    if (!formulario.apellido.trim())
      erroresTemp.apellido = "Debes ingresar tus apellidos";
    if (!formulario.email.trim()) 
      erroresTemp.email = "Debes ingresar tu email";
    if (!formulario.cuentame.trim())
      erroresTemp.cuentame = "Debes escribir un mensaje";

    if (Object.keys(erroresTemp).length > 0) { // Si erroresTemp tiene alguna propiedad
      setErrores(erroresTemp); // se asigna a errores
      return; // No se envía el formulario si hay errores
    }

    setErrores({}); // limpia errores si todo está correcto

    emailjs
      .send(
        "service_ismael",
        "template_xkj1h5p",
        formulario,
        "SgteicFmlxXDXyTPk",
      )
      .then((respuesta) => {
        console.log("Email enviado ✅", respuesta);
        setFormulario(datosFormulario); // limpia el formulario
        setMensaje(true);
      })
      .catch((error) => {
        console.log("Error al enviar el email ❌", error);
      });
  };

  return (
    <section className="seccion-contacto" id="contacto">
      <h2 className="titulo-contacto">Contacto</h2>
      <p className="contacto-subtitulo">
        ¿Quieres saber más sobre mi o quieres más información? Completa el
        formulario y te responderé lo antes posible.
      </p>

      <div className="contacto-contenedor">
        <form className="contacto-form" onSubmit={enviarFormulario}>
          <h3>Envíame un mensaje</h3>

          <div className="contacto-grid-nombrecompleto">
            <div className="campo">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="tu nombre"
                value={formulario.nombre}
                onChange={(event) => {
                  setFormulario({
                    ...formulario, // se hace una copia para que react no borre todos los demas
                    nombre: event.target.value,
                  });
                }}
              />
                {errores.nombre && <p className="error">{errores.nombre}</p>}
            </div>

            <div className="campo">
              <label>Apellidos</label>
              <input
                type="text"
                placeholder="tus apellidos"
                value={formulario.apellido}
                onChange={(event) => {
                  setFormulario({
                    ...formulario,
                    apellido: event.target.value,
                  });
                }}
              />
                {errores.apellido && <p className="error">{errores.apellido}</p>}
            </div>
          </div>

          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={formulario.email}
              onChange={(event) => {
                setFormulario({
                  ...formulario,
                  email: event.target.value,
                });
              }}
            />
              {errores.email && <p className="error">{errores.email}</p>}
          </div>

          <div className="campo">
            <label>Cúentame</label>
            <textarea
              rows="4"
              value={formulario.cuentame}
              onChange={(event) => {
                setFormulario({
                  ...formulario,
                  cuentame: event.target.value,
                });
              }}
            ></textarea>
              {errores.cuentame && <p className="error">{errores.cuentame}</p>}
          </div>

          <button type="submit" className="btn-enviar">
            Enviar mensaje
          </button>

          {mensaje && (
            <p className="mensaje-exito">¡Correo enviado correctamente!</p>
          )}
        </form>

        <div className="contacto-info">
          <div className="bloque-info">
            <h3>Contacto directo</h3>
            <div className="contenedor-lista">
              <ul className="ul-lista">
                <li>
                  <span className="info-titulo">Email</span>
                  <a href="mailto:tu@email.com" className="contact-link">
                    <CgMail className="icono-contacto" />
                    ismaelbedmarcejas@gmail.com
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
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contacto };
