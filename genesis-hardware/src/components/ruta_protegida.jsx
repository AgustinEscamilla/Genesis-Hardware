import { Navigate } from 'react-router-dom'
import { useAutenticacion } from '../hooks/use_autenticacion'

export function RutaProtegida({ children }) {
  const { usuarioActual, cargando } = useAutenticacion()

  if (cargando) {
    return (
      <div className="min-h-screen bg-fondo flex items-center justify-center text-texto">
        Cargando sistema
      </div>
    )
  }

  if (!usuarioActual) {
    return <Navigate to="/login" replace />
  }

  return children
}