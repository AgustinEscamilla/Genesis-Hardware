// aqui maestro yo documente este archivo para mantener trazabilidad
import { useCarritoPedidos } from '../hooks/use_carrito_pedidos'
import { useAutenticacion } from '../hooks/use_autenticacion'
import { useNotificaciones } from '../hooks/use_notificaciones'
import { useSeguimientoPedidos } from '../hooks/use_seguimiento_pedidos'
import { use_modal_carrito } from '../hooks/use_modal_carrito'
import { ClienteBarraCatalogo } from './cliente_barra_catalogo'
import { SeccionCatalogoCliente } from './seccion_catalogo_cliente'
import { ClientePanelSeguimiento } from './cliente_panel_seguimiento'
import { ModalCarrito } from '../components/modal_carrito'

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
      <div className="bg-panel border border-borde p-6 m-4 rounded-lg">
        <h1 className="text-2xl font-bold text-texto">Bienvenido a Genesis Hardware</h1>
        <p className="text-xs text-mutado mt-2">Explora nuestro catalogo y confirma tu pedido seguro.</p>
      </div>
      <SeccionCatalogoCliente al_agregar={carrito.agregar} />
      <ClientePanelSeguimiento pedidos={pedidos} />
      <ModalCarrito
        abierto={modal_carrito.abierto}
        carrito={carrito.carrito}
        al_ajustar={carrito.ajustar}
        al_quitar={carrito.quitar}
        al_confirmar={carrito.confirmar}
        guardando={carrito.guardando}
        mensaje={carrito.mensaje}
        al_cerrar={modal_carrito.cerrar}
        ticket={carrito.ticket}
        al_cerrar_ticket={carrito.cerrarTicket}
      />
    </div>
  )
}