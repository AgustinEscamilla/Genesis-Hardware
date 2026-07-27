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
      <div className="min-h-screen w-full bg-fondo p-4 md:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-borde pb-5">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Centro de control</p>
            <h2 className="text-3xl font-black text-texto">Operacion Genesis</h2>
            <p className="mt-1 text-sm text-mutado">Gestiona catalogo inventario cuentas y resultados desde un solo lugar</p>
          </div>
          <Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={manejarSalida}>
            Cerrar sesión
          </Boton>
          </div>
          <AlertaStockAdmin alertas={alertas} />
          <BarraNavegacionAdministrador />
          <Outlet />
        </div>
      </div>
    </RutaProtegida>
  )
}
