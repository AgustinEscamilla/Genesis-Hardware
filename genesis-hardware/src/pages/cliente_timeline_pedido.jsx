import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClienteApartadoRastreo } from '../components/cliente_apartado_rastreo'
import { ClienteComprobanteEntrega } from './cliente_comprobante_entrega'
import { TicketCompra } from '../components/TicketCompra'
import { formatear_precio } from '../services/formato_moneda'

// aqui maestro yo dejo las etiquetas visibles para cada estado del pedido
const etiquetasPorEstado = {
  recibido: 'Recibido',
  pendiente_recoleccion: 'Pendiente de recoleccion',
  en_empaque: 'En empaque',
  listo_despacho: 'Listo para despacho',
  en_reparto: 'En reparto',
  entregado: 'Entregado'
}

// aqui maestro yo genero el archivo de texto descargable con el detalle del pedido
const descargar_ticket = (pedido) => {
  const items = pedido?.items || pedido?.carrito || []
  const lineas = [
    'GENESIS HARDWARE',
    `Orden: ${pedido?.id || ''}`,
    `Fecha: ${pedido?.fecha ? new Date(pedido.fecha).toLocaleString('es-MX') : ''}`,
    '',
    ...items.map((it) => `${it.nombre || 'Articulo'} x${Number(it.cantidad || 0)}  ${formatear_precio(Number(it.precio || 0) * Number(it.cantidad || 0))}`),
    '',
    `Total: ${formatear_precio(pedido?.total || 0)}`,
    '',
    'Gracias por tu compra. Conserva este ticket para validar tu garantia.'
  ]
  const blob = new Blob([lineas.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = `ticket_${String(pedido?.id || 'pedido').slice(0, 8)}.txt`
  enlace.click()
  URL.revokeObjectURL(url)
}

// aqui maestro yo abro el cliente de correo del usuario con el ticket ya redactado
const enviar_ticket_correo = (pedido) => {
  const items = pedido?.items || pedido?.carrito || []
  const cuerpo = [
    `Ticket de compra - Orden ${pedido?.id || ''}`,
    ...items.map((it) => `${it.nombre || 'Articulo'} x${Number(it.cantidad || 0)}: ${formatear_precio(Number(it.precio || 0) * Number(it.cantidad || 0))}`),
    `Total: ${formatear_precio(pedido?.total || 0)}`
  ].join('\r\n')
  window.location.href = `mailto:?subject=${encodeURIComponent('Mi ticket de compra - Genesis Hardware')}&body=${encodeURIComponent(cuerpo)}`
}

// esto sirve para pintar la linea de tiempo de un pedido del cliente
export function ClienteTimelinePedido({ pedido }) {
  const historial = pedido.historialEstados || []
  const [mostrarTicket, setMostrarTicket] = useState(false)

  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs text-primario">Pedido {pedido.id.slice(0, 8)}</p>
      <div className="flex flex-col gap-2">
        {historial.map((paso, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${idx === historial.length - 1 ? 'bg-primario' : 'bg-borde'}`} />
            <p className="text-xs text-texto">{etiquetasPorEstado[paso.estado] || paso.estado}</p>
            <p className="text-[10px] text-mutado ml-auto">{new Date(paso.fecha).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <ClienteApartadoRastreo pedido={pedido} />
      {pedido.estado === 'entregado' && <ClienteComprobanteEntrega pedidoId={pedido.id} />}
      {pedido.estado === 'entregado' && (
        <Link to={`/clientes/reclamos?pedido=${pedido.id}`} className="text-[10px] text-primario border border-primario rounded px-2 py-1 self-start hover:bg-primario hover:text-fondo transition-colors">
          Levantar reclamo
        </Link>
      )}
      <button onClick={() => setMostrarTicket((v) => !v)} className="text-[10px] text-mutado border border-borde rounded px-2 py-1 self-start hover:border-primario hover:text-primario transition-colors">
        {mostrarTicket ? 'Ocultar mi ticket de compra' : 'Ver mi ticket de compra'}
      </button>
      {mostrarTicket && <TicketCompra pedido={pedido} descargar_ticket={descargar_ticket} enviar_ticket_correo={enviar_ticket_correo} />}
    </div>
  )
}
