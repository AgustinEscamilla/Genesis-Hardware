import { Navigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/use_autenticacion'

// aqui puse profe la barrera para que nadie entre a las pantallas sin permiso
export function RutaProtegida({ children }) {
  const { usuarioActual, cargando } = useAutenticacion()

  // maestro funciona asi yo puse este mensaje mientras firebase revisa los datos
  if (cargando) {
    return (
      <div className="min-h-screen bg-fondo flex items-center justify-center text-texto">
        Cargando sistema
      </div>
    )
  }

  // pos esto funciona para mandar al empleado al inicio si no tiene llave
  if (!usuarioActual) {
    return <Navigate to="/login" replace />
  }

  return children
}