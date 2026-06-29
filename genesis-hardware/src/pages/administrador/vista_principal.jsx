import { Outlet, useNavigate } from 'react-router-dom'
import { BarraNavegacionAdministrador } from './barra_navegacion_administrador'
import { cerrarSesion } from '../../services/servicio_autenticacion'
import { Boton } from '../../components/boton'

// aqui maestro yo agregue el boton para cerrar sesion en la parte superior derecha
export function VistaPrincipalAdministrador() {
  const navegar = useNavigate()

  // esto sirve para borrar la sesion local o de firebase y sacarnos de la ruta protegida
  const manejarSalida = async () => {
    await cerrarSesion()
    navegar('/login')
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full p-8 bg-fondo min-h-screen">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-texto mb-1">Panel de Dirección</h2>
          <p className="text-mutado text-sm tracking-wide">VISIÓN GENERAL DE LA FÁBRICA</p>
        </div>
        <Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={manejarSalida}>
          Cerrar sesión
        </Boton>
      </div>
      <BarraNavegacionAdministrador />
      <Outlet />
    </div>
  )
}