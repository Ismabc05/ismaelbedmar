import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from "./components/Navbar"
import { Inicio } from "./components/Inicio"
import { Sobremi } from "./components/Sobremi"

function App() {
  

  return (
    <>
      <Navbar/>
      <Inicio/>
      <Sobremi/>
    </>
  )
}

export default App
