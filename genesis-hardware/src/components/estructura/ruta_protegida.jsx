// aqui maestro yo documente este archivo para mantener trazabilidad
import { Navigate } from 'react-router-dom'
import { useAutenticacion } from '../../hooks/use_autenticacion'

export function RutaProtegida({ children, rolPermitido }) {
  const { usuarioActual, cargando, rol } = useAutenticacion()

  if (cargando) {
    return (
      <div className="min-h-screen bg-fondo flex items-center justify-center text-texto">
        Cargando sistema
      </div>
    )
  }

  if (!usuarioActual) {
    return <Navigate to="/" replace />
  }

  // esto sirve para esperar el rol real antes de decidir si bloqueo el paso
  if (rolPermitido && rol === undefined) {
    return (
      <div className="min-h-screen bg-fondo flex items-center justify-center text-texto">
        Cargando sistema
      </div>
    )
  }

  // aqui maestro yo bloqueo el acceso si el rol guardado en firestore no coincide
  if (rolPermitido && rol !== rolPermitido) {
    return <Navigate to="/" replace />
  }

  return children
}
