import { ModalCarrito } from '../components/modal_carrito'

export function ClienteModalCarrito({ modal_carrito, carrito }) {
  return (
    <ModalCarrito
      abierto={modal_carrito.abierto}
      carrito={carrito.carrito}
      al_ajustar={carrito.ajustar}
      al_quitar={carrito.quitar}
      al_ir_a_pagar={carrito.irAPagar}
      al_confirmar={carrito.confirmar}
      guardando={carrito.guardando}
      mensaje={carrito.mensaje}
      al_cerrar={modal_carrito.cerrar}
      ticket={carrito.ticket}
      al_cerrar_ticket={carrito.cerrarTicket}
      paso={carrito.paso}
      total={carrito.total}
      zona_logistica={carrito.zonaLogistica}
      al_volver_carrito={carrito.volverAlCarrito}
    />
  )
}
