import { Link } from 'react-router-dom'
import { ClienteComprobanteEntrega } from '../../pages/cliente_comprobante_entrega'
import { TicketCompra } from '../carrito/TicketCompra'
import { descargar_ticket } from '../../services/servicio_ticket_pdf'

export function AccionesPedido({ pedido, estado_visible, mostrar_ticket, al_alternar_ticket }) {
  const pedido_entregado = estado_visible === 'entregado'
  return (
    <>
      {pedido_entregado && <ClienteComprobanteEntrega pedidoId={pedido.id} />}
      {pedido_entregado && (
        <Link to={`/clientes/reclamos?pedido=${pedido.id}`} className="self-start rounded border border-cyan-400 px-2 py-1 text-[10px] text-cyan-300 transition-colors hover:bg-cyan-400 hover:text-slate-950">
          Levantar reclamo
        </Link>
      )}
      <button type="button" onClick={al_alternar_ticket} className="self-start rounded border border-slate-700 px-2 py-1 text-[10px] text-slate-400 transition-colors hover:border-cyan-400 hover:text-cyan-300">
        {mostrar_ticket ? 'Ocultar mi ticket de compra' : 'Ver mi ticket de compra'}
      </button>
      {mostrar_ticket && <TicketCompra pedido={pedido} descargar_ticket={descargar_ticket} />}
    </>
  )
}
