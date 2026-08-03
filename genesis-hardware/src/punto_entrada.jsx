// aqui maestro yo documento el punto de entrada de la aplicacion
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilos_globales.css'
import Aplicacion from './aplicacion.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aplicacion />
  </StrictMode>,
)
