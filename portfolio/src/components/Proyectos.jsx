import React from "react";
import "../estilos/proyectos.css";
import { FaGithub } from "react-icons/fa";

function Proyectos() {
  return (
    <section className="seccion-proyecto" id="proyectos">
      <h2>Proyectos Destacados</h2>
      <p className="parrafo-proyecto">
        Estos son mis dos proyectos que dice durante mi aprendizaje.
      </p>
      <div className="contenedor-tarjetas">
        <div className="tarjeta">
          <div className="tarjeta-header">
            <span className="tag">Web</span>
            <h3>Lista de Tareas</h3>
          </div>

          <div className="tarjeta-body">
            <h4>App de Tareas</h4>
            <p>
              Aplicación para crear, editar y eliminar tareas con almacenamiento
              localstorage.
            </p>
            <p>
              <strong>Tecnologías:</strong>
            </p>

            <div className="tecnologias">
              <span>JSX</span>
              <span>CSS</span>
              <span>React</span>
            </div>
          </div>
        </div>

        <div className="tarjeta">
          <div className="tarjeta-header">
            <span className="tag">Juego</span>
            <h3>Mokepon</h3>
          </div>

          <div className="tarjeta-body">
            <h4>Juego Web</h4>
            <p>
              Juego inspirado en Pokémon con combates y selección de personajes.
            </p>
            <p>
              <strong>Tecnologías:</strong>
            </p>

            <div className="tecnologias">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
      </div>

      <div className="more-projects">
        <h3 className="more-projects--title">¿Quieres ver más proyectos?</h3>
        <p className="more-projects--text">
          Estos son solo algunos ejemplos. Tengo muchas mas practicas realizadas
          durante mi proceso de aprendizaje.
        </p>
        <div className="more-projects--botones">
          <button
            className="btn btn--primero"
            onClick={() => {
              const seccionContacto = document.getElementById("contacto");
              seccionContacto.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver más proyectos
          </button>
          <button className="btn btn--segundo" 
            onClick={() => { 
              window.open("https://github.com/Ismabc05", "_blank", "noopener,noreferrer",);
              }}
            > <FaGithub/> Github</button>
        </div>
      </div>
    </section>
  );
}

export { Proyectos };
