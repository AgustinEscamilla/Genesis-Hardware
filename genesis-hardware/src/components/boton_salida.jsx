// aqui maestro yo documente este archivo para mantener trazabilidad
import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../services/servicio_autenticacion'

export function BotonSalida() {
  const navegar = useNavigate()

  const manejarCierre = async () => {
    try {
      await cerrarSesion()
      navegar('/', { replace: true })
    } catch (error) {
      console.error("Error al cerrar sesión", error)
    }
  }

  return (
    <button
      onClick={manejarCierre}
      className="rounded-lg border border-borde bg-panel px-3 py-1.5 text-sm font-medium text-texto transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/70 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-primario"
    >
      Salir del Sistema
    </button>
  )
}
