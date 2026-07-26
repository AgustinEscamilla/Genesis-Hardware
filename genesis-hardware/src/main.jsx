// aqui maestro yo documente este archivo para mantener trazabilidad
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { inicializarMercadoPago } from './services/servicio_pago_mercadopago'

inicializarMercadoPago()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
