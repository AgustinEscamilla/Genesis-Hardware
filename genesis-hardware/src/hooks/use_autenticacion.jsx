import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { autenticacion } from '../services/servicio_autenticacion'

// aqui maestro yo arme el gancho para ver si el empleado ya entro al sistema
export function useAutenticacion() {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [cargando, setCargando] = useState(true)

  // esto sirve para que firebase nos avise en todo momento si la persona sigue adentro
  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(autenticacion, (usuario) => {
      setUsuarioActual(usuario)
      setCargando(false)
    })
    
    return () => cancelarSuscripcion()
  }, [])

  return { usuarioActual, cargando }
}