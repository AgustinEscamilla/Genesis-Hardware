import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntradaTexto } from './entrada_texto'
import { BotonPrincipal } from './boton_principal'
import { iniciarSesion } from '../services/servicio_autenticacion'

export function FormularioLogin() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const navegar = useNavigate()

  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    try {
      await iniciarSesion(correo, contrasena)
      navegar('/')
    } catch (error) {
      console.error("Error en credenciales", error)
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="w-full max-w-sm bg-panel p-8 border border-borde shadow-xl">
      <h2 className="text-2xl font-bold text-texto mb-6 text-center">Acceso a Planta</h2>
      
      <div className="flex flex-col gap-4">
        <EntradaTexto
          id="correo"
          tipo="email"
          etiqueta="Correo Electrónico"
          valor={correo}
          alCambiar={(e) => setCorreo(e.target.value)}
        />
        
        <EntradaTexto
          id="contrasena"
          tipo="password"
          etiqueta="Contraseña"
          valor={contrasena}
          alCambiar={(e) => setContrasena(e.target.value)}
        />
        
        <BotonPrincipal texto="Ingresar" tipo="submit" />
      </div>
    </form>
  )
}