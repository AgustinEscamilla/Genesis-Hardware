import { useNavigate } from 'react-router-dom'
import { cerrarSesion } from '../services/servicio_autenticacion'

// aqui maestro yo encapsulo el cierre de sesion y la redireccion al menu principal
export function useCerrarSesion() {
  const navegar = useNavigate()

  const salir = async () => {
    // esto sirve para cerrar sesion en firebase y limpiar la sesion local antes de redirigir
    await cerrarSesion()
    navegar('/', { replace: true })
  }

  return { salir }
}
