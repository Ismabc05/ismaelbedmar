import React from "react";
import "../estilos/proyectos.css";

function Proyectos() {
  return (
    <section className="projects" id="proyectos">
      <h2>Proyectos Destacados</h2>
      <p className="parrafo-proyecto">Estos son mis dos proyectos que dice durante mi aprendizaje.</p>
      <div className="cards">

        <div className="card">
          <div className="card-header">
            <span className="tag">Web</span>
            <h3>Lista de Tareas</h3>
          </div>

          <div className="card-body">
            <h4>App de Tareas</h4>
            <p>Aplicación para crear, editar y eliminar tareas con almacenamiento local.</p>
            <p><strong>Tecnologías:</strong></p>

            <div className="tech">
              <span>JSX</span>
              <span>CSS</span>
              <span>React</span>
            </div>
          </div>
        </div>


        <div className="card">
          <div className="card-header">
            <span className="tag">Juego</span>
            <h3>Mokepon</h3>
          </div>

          <div className="card-body">
            <h4>Juego Web</h4>
            <p>Juego inspirado en Pokémon con combates y selección de personajes.</p>
            <p><strong>Tecnologías:</strong></p>

            <div className="tech">
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
            Estos son solo algunos ejemplos. Tengo experiencia en una amplia variedad de sectores
            y tecnologías. Puedo compartir más detalles y casos de estudio específicos según tu
            área de interés.
        </p>
        <div className="more-projects--actions">
            <button className="btn btn--primary">Ver más proyectos</button>
            <button className="btn btn--ghost">Github</button>
        </div>
        </div>

    </section>
  );
}


export {Proyectos }