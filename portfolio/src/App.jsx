import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from "./components/Navbar"
import { Inicio } from "./components/Inicio"
import { Sobremi } from "./components/Sobremi"
import { Servicios } from './components/Servicios'
import { Proyectos } from './components/Proyectos'
import { Contacto } from './components/Contacto'

function App() {
  

  return (
    <>
      <Navbar/>
      <Inicio/>
      <Sobremi/>
      <Servicios/>
      <Proyectos/>
      <Contacto/>
    </>
  )
}

export default App
