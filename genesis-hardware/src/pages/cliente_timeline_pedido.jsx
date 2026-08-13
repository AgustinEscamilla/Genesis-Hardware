import { useState } from 'react'
import { ClienteApartadoRastreo } from '../components/cliente_apartado_rastreo'
import { HistorialPedido } from '../components/pedidos/historial_pedido'
import { AccionesPedido } from '../components/pedidos/acciones_pedido'

export function ClienteTimelinePedido({ pedido }) {
  const historial_pedido = pedido.historialEstados || []
  const estado_visible = historial_pedido.at(-1)?.estado || pedido.estado
  const pedido_visible = { ...pedido, estado: estado_visible }
  const pedido_id = String(pedido.id || pedido.folio || 'pedido')
  const [mostrar_ticket, set_mostrar_ticket] = useState(false)
  const alternar_ticket = () => set_mostrar_ticket((visible) => !visible)

  return (
    <article className="flex flex-col gap-2 border border-slate-800 bg-slate-900 p-3 text-slate-100">
      <p className="text-xs text-cyan-300">Pedido {pedido_id.slice(0, 8)}</p>
      <HistorialPedido historial_pedido={historial_pedido} />
      <ClienteApartadoRastreo pedido={pedido_visible} />
      <AccionesPedido
        pedido={pedido}
        estado_visible={estado_visible}
        mostrar_ticket={mostrar_ticket}
        al_alternar_ticket={alternar_ticket}
      />
    </article>
  )
}
