import { useAutenticacion } from '../../hooks/use_autenticacion'
import { useSeguimientoPedidos } from '../../hooks/use_seguimiento_pedidos'
import { ClientePanelSeguimiento } from '../cliente_panel_seguimiento'
import { CabeceraFirstpc } from '../../components/navegacion/cabecera_firstpc'
import { BotonSalida } from '../../components/formularios/boton_salida'

export function VistaPedidosCliente() {
  const { usuarioActual } = useAutenticacion()
  const { pedidos } = useSeguimientoPedidos(usuarioActual?.uid)

  return (
    <div className="min-h-screen bg-fondo text-texto">
      <CabeceraFirstpc autenticado mostrar_carrito={false} acciones_extra={<BotonSalida />} />
      <main className="px-4 py-8"><ClientePanelSeguimiento pedidos={pedidos} /></main>
    </div>
  )
}
