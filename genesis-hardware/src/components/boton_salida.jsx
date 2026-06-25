import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../services/servicio_autenticacion'

// aqui maestro yo arme la pieza independiente para poder salir del sistema
export function BotonSalida() {
  const navegar = useNavigate()

  // maestro funciona asi yo prepare esta accion para terminar la sesion de la persona
  const manejarCierre = async () => {
    try {
      // esto sirve para destruir los datos de entrada en firebase y mandarlo al login
      await cerrarSesion()
      navegar('/login')
    } catch (error) {
      console.error("Error al cerrar sesión", error)
    }
  }

  return (
    // aqui puse profe el diseño del boton para que cambie a color rojo al pasar el raton
    <button
      onClick={manejarCierre}
      className="px-3 py-1.5 text-sm font-medium bg-panel border border-borde text-texto hover:border-red-500 hover:text-red-500 transition-colors"
    >
      Salir del Sistema
    </button>
  )
}