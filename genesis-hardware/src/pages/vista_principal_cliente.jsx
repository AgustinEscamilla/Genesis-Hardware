// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCarritoPedidos } from '../hooks/use_carrito_pedidos'
import { useAutenticacion } from '../hooks/use_autenticacion'
import { useNotificaciones } from '../hooks/use_notificaciones'
import { useSeguimientoPedidos } from '../hooks/use_seguimiento_pedidos'
import { use_modal_carrito } from '../hooks/use_modal_carrito'
import { ClienteBarraCatalogo } from './cliente_barra_catalogo'
import { SeccionCatalogoCliente } from './seccion_catalogo_cliente'
import { ClientePanelSeguimiento } from './cliente_panel_seguimiento'
import { ClienteModalCarrito } from './cliente_modal_carrito'

export function VistaPrincipalCliente() {
  const { usuarioActual } = useAutenticacion()
  const carrito = useCarritoPedidos('cliente')
  const modal_carrito = use_modal_carrito()
  const { notificaciones, marcarLeida } = useNotificaciones(usuarioActual?.uid)
  const { pedidos } = useSeguimientoPedidos(usuarioActual?.uid)

  return (
    <div className="min-h-screen bg-fondo text-texto flex flex-col">
      <ClienteBarraCatalogo
        alAbrirCarrito={modal_carrito.alternar}
        total={carrito.carrito.length}
        zonaLogistica={carrito.zonaLogistica}
        alCambiarZona={carrito.setZonaLogistica}
        notificaciones={notificaciones}
        alMarcarLeida={marcarLeida}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="m-4 overflow-hidden rounded-xl border border-borde bg-panel shadow-vidrio">
          <div className="h-1 w-full bg-degradado-vino" />
          <div className="p-6">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-vino">Zona de clientes</p>
            <h1 className="text-2xl font-bold texto-degradado">Bienvenido a Genesis Hardware</h1>
            <p className="mt-2 text-xs text-mutado">Explora nuestro catalogo y confirma tu pedido seguro.</p>
          </div>
        </div>
        <SeccionCatalogoCliente al_agregar={carrito.agregar} />
        <ClientePanelSeguimiento pedidos={pedidos} />
      </div>
      <ClienteModalCarrito modal_carrito={modal_carrito} carrito={carrito} />
    </div>
  )
}
