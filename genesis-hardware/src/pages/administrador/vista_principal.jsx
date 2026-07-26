// aqui maestro yo documente este archivo para mantener trazabilidad
import { Outlet, useNavigate } from 'react-router-dom'
import { BarraNavegacionAdministrador } from './barra_navegacion_administrador'
import { cerrarSesion } from '../../services/servicio_autenticacion'
import { Boton } from '../../components/boton'
import { AlertaStockAdmin } from './alerta_existencias_administrador'
import { useAlertasStock } from '../../hooks/use_alertas_existencias'
import { RutaProtegida } from '../../components/ruta_protegida'

export function VistaPrincipalAdministrador() {
  const navegar = useNavigate()
  const { alertas } = useAlertasStock()

  const manejarSalida = async () => {
    await cerrarSesion()
    navegar('/')
  }

  return (
    <RutaProtegida rolPermitido="administrador">
      <div className="flex min-h-screen w-full flex-col gap-6 bg-fondo p-4 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-texto mb-1">Panel de Dirección</h2>
            <p className="text-mutado text-sm tracking-wide">VISIÓN GENERAL DE LA FÁBRICA</p>
          </div>
          <Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={manejarSalida}>
            Cerrar sesión
          </Boton>
        </div>
        <AlertaStockAdmin alertas={alertas} />
        <BarraNavegacionAdministrador />
        <Outlet />
      </div>
    </RutaProtegida>
  )
}
