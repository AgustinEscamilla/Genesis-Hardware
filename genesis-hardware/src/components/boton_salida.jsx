import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../services/servicio_autenticacion'

export function BotonSalida() {
  const navegar = useNavigate()

  const manejarCierre = async () => {
    try {
      await cerrarSesion()
      navegar('/login')
    } catch (error) {
      console.error("Error al cerrar sesión", error)
    }
  }

  return (
    <button
      onClick={manejarCierre}
      className="px-3 py-1.5 text-sm font-medium bg-panel border border-borde text-texto hover:border-red-500 hover:text-red-500 transition-colors"
    >
      Salir del Sistema
    </button>
  )
}