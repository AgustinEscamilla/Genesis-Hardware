import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { ClienteApartadoRastreo } from '../components/cliente_apartado_rastreo'
import { ClienteComprobanteEntrega } from './cliente_comprobante_entrega'
import { TicketCompra } from '../components/TicketCompra'
import { formatear_precio } from '../services/formato_moneda'
import { formatear_direccion } from '../services/formato_direccion'

// aqui maestro yo dejo las etiquetas visibles para cada estado del pedido
const etiquetasPorEstado = {
  recibido: 'Recibido',
  pendiente_recoleccion: 'Pendiente de recoleccion',
  en_empaque: 'En empaque',
  listo_despacho: 'Listo para despacho',
  en_reparto: 'En reparto',
  entregado: 'Entregado'
}

// aqui maestro yo genero un PDF descargable con el detalle del pedido
const descargar_ticket = (pedido) => {
  const items = pedido?.items || pedido?.carrito || []
  const fechaRaw = pedido?.fecha?.toDate ? pedido.fecha.toDate() : pedido?.fecha
  const fecha = fechaRaw ? new Date(fechaRaw) : null
  const fechaTexto = fecha && !Number.isNaN(fecha.getTime())
    ? fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
    : 'NO DISPONIBLE'
  const direccionCliente = formatear_direccion(pedido?.direccionEntrega) || 'DIRECCION NO DISPONIBLE'
  const total = Number(pedido?.total || 0)
  const subtotal = Number((total / 1.16).toFixed(2))
  const iva = Number((total - subtotal).toFixed(2))
  const folio = String(pedido?.id || pedido?.folio || pedido?.pagoReferencia || 'pedido').slice(0, 10).toUpperCase()
  const metodoPagoRaw = String(pedido?.metodoPago || '').toLowerCase().trim()
  const metodoPago = metodoPagoRaw.includes('credit') || metodoPagoRaw.includes('tarjeta')
    ? 'TARJETA DE CREDITO'
    : metodoPagoRaw.includes('debit')
      ? 'TARJETA DE DEBITO'
      : metodoPagoRaw
        ? metodoPagoRaw.replace(/_/g, ' ').toUpperCase()
        : 'MERCADO PAGO'

  const documento = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = 210
  const margin = 14
  const panelX = margin
  const panelY = 12
  const panelWidth = pageWidth - margin * 2

  documento.setFillColor(20, 22, 31)
  documento.rect(panelX, panelY, panelWidth, 272, 'F')
  documento.setDrawColor(83, 89, 105)
  documento.setLineWidth(0.4)
  documento.roundedRect(panelX, panelY, panelWidth, 272, 3, 3, 'S')

  documento.setTextColor(209, 213, 219)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(18)
  documento.text('GENESIS', 105, 27, { align: 'center' })
  documento.setFontSize(9)
  documento.text('HARDWARE', 105, 32, { align: 'center' })

  documento.setFontSize(8.5)
  documento.setFont('helvetica', 'normal')
  documento.text('CALLE 10, NO. 5, COL. CENTRO,', 20, 44)
  documento.text('CAMPECHE, MEX.', 20, 48)
  documento.text('RFC: GEN98010THV1', 20, 52)

  documento.setFont('helvetica', 'bold')
  documento.setTextColor(244, 114, 182)
  documento.setFontSize(15)
  documento.text('NOTA DE COMPRA', 105, 52, { align: 'center' })

  documento.setTextColor(209, 213, 219)
  documento.setFont('helvetica', 'normal')
  documento.setFontSize(9)
  documento.text(`NO. GHW-${folio}`, 161, 44)
  documento.text(`FECHA: ${fechaTexto}`, 161, 49)

  documento.setDrawColor(99, 106, 124)
  documento.roundedRect(20, 57, 170, 18, 2, 2, 'S')
  documento.setTextColor(255, 255, 255)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(9.5)
  documento.text('INFORMACION DEL CLIENTE', 23, 63.5)
  documento.setFont('helvetica', 'normal')
  documento.setFontSize(9)
  documento.setTextColor(229, 231, 235)
  const direccionLineas = documento.splitTextToSize(`DIRECCION: ${direccionCliente.toUpperCase()}`, 164)
  documento.text(direccionLineas.slice(0, 2), 23, 70)

  const tablaX = 20
  const tablaY = 80
  const tablaW = 170
  const colDesc = 84
  const colCant = 24
  const colUnit = 34
  const colTotal = 28
  const altoFila = 11

  documento.setFillColor(30, 34, 46)
  documento.roundedRect(tablaX, tablaY, tablaW, altoFila, 2, 2, 'FD')
  documento.setDrawColor(99, 106, 124)
  documento.setTextColor(56, 189, 248)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(9.2)
  documento.text('DESCRIPCION DE ARTICULO', tablaX + 3, tablaY + 7)
  documento.text('CANTIDAD', tablaX + colDesc + 2, tablaY + 7)
  documento.text('PRECIO UNITARIO', tablaX + colDesc + colCant + 2, tablaY + 7)
  documento.text('TOTAL', tablaX + tablaW - 4, tablaY + 7, { align: 'right' })

  documento.setDrawColor(99, 106, 124)
  documento.setTextColor(232, 234, 238)
  documento.setFont('helvetica', 'normal')
  documento.setFontSize(9)

  let yFila = tablaY + altoFila
  items.slice(0, 10).forEach((it) => {
    const cantidad = Number(it.cantidad || 0)
    const unitario = Number(it.precio || 0)
    const totalItem = Number((unitario * cantidad).toFixed(2))
    documento.rect(tablaX, yFila, tablaW, altoFila, 'S')
    documento.line(tablaX + colDesc, yFila, tablaX + colDesc, yFila + altoFila)
    documento.line(tablaX + colDesc + colCant, yFila, tablaX + colDesc + colCant, yFila + altoFila)
    documento.line(tablaX + colDesc + colCant + colUnit, yFila, tablaX + colDesc + colCant + colUnit, yFila + altoFila)

    const descripcion = String(it.nombre || 'ARTICULO').toUpperCase()
    const nombreRecortado = descripcion.length > 38 ? `${descripcion.slice(0, 37)}...` : descripcion
    documento.text(nombreRecortado, tablaX + 3, yFila + 7)
    documento.text(String(cantidad), tablaX + colDesc + colCant - 3, yFila + 7, { align: 'right' })
    documento.text(formatear_precio(unitario), tablaX + colDesc + colCant + colUnit - 3, yFila + 7, { align: 'right' })
    documento.setTextColor(244, 114, 182)
    documento.setFont('helvetica', 'bold')
    documento.text(formatear_precio(totalItem), tablaX + tablaW - 3, yFila + 7, { align: 'right' })
    documento.setTextColor(232, 234, 238)
    documento.setFont('helvetica', 'normal')
    yFila += altoFila
  })

  const resumenY = yFila + 6
  documento.setTextColor(243, 244, 246)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(10)
  documento.text('SUBTOTAL:', 145, resumenY, { align: 'right' })
  documento.text(formatear_precio(subtotal), 188, resumenY, { align: 'right' })
  documento.text('IVA (16%):', 145, resumenY + 7, { align: 'right' })
  documento.text(formatear_precio(iva), 188, resumenY + 7, { align: 'right' })

  documento.setFillColor(43, 48, 66)
  documento.roundedRect(124, resumenY + 12, 66, 12, 2, 2, 'FD')
  documento.setTextColor(244, 114, 182)
  documento.setFontSize(13)
  documento.text('TOTAL GENERAL:', 126, resumenY + 20)
  documento.setTextColor(34, 211, 238)
  documento.text(formatear_precio(total), 188, resumenY + 20, { align: 'right' })

  const pieY = resumenY + 38
  documento.setTextColor(229, 231, 235)
  documento.setFontSize(9.5)
  documento.setFont('helvetica', 'bold')
  documento.text('DETALLES DE PAGO', 20, pieY)
  documento.setFont('helvetica', 'normal')
  documento.text(`METODO: ${metodoPago}`, 76, pieY)
  documento.setFont('helvetica', 'bold')
  documento.text('DETALLES DE ENVIO', 160, pieY, { align: 'center' })
  documento.setTextColor(244, 114, 182)
  documento.text('LOCAL CAMPECHE', 160, pieY + 6, { align: 'center' })

  documento.setTextColor(229, 231, 235)
  documento.setFont('helvetica', 'bold')
  documento.setFontSize(18)
  documento.text('GRACIAS POR SU COMPRA', 105, pieY + 22, { align: 'center' })
  documento.save(`ticket_${String(pedido?.id || 'pedido').slice(0, 8)}.pdf`)
}

// esto sirve para pintar la linea de tiempo de un pedido del cliente
export function ClienteTimelinePedido({ pedido }) {
  const historial = pedido.historialEstados || []
  const estadoVisible = historial.at(-1)?.estado || pedido.estado
  const pedidoVisible = { ...pedido, estado: estadoVisible }
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
      <ClienteApartadoRastreo pedido={pedidoVisible} />
      {estadoVisible === 'entregado' && <ClienteComprobanteEntrega pedidoId={pedido.id} />}
      {estadoVisible === 'entregado' && (
        <Link to={`/clientes/reclamos?pedido=${pedido.id}`} className="text-[10px] text-primario border border-primario rounded px-2 py-1 self-start hover:bg-primario hover:text-fondo transition-colors">
          Levantar reclamo
        </Link>
      )}
      <button onClick={() => setMostrarTicket((v) => !v)} className="text-[10px] text-mutado border border-borde rounded px-2 py-1 self-start hover:border-primario hover:text-primario transition-colors">
        {mostrarTicket ? 'Ocultar mi ticket de compra' : 'Ver mi ticket de compra'}
      </button>
      {mostrarTicket && <TicketCompra pedido={pedido} descargar_ticket={descargar_ticket} />}
    </div>
  )
}
