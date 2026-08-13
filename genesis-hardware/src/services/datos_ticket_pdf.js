import { formatear_direccion } from './formato_direccion'

export const obtener_datos_ticket = (pedido) => {
  const items = Array.isArray(pedido?.items) ? pedido.items : Array.isArray(pedido?.carrito) ? pedido.carrito : []
  const fecha_raw = pedido?.fecha?.toDate ? pedido.fecha.toDate() : pedido?.fecha
  const fecha = fecha_raw ? new Date(fecha_raw) : null
  const fecha_texto = fecha && !Number.isNaN(fecha.getTime())
    ? fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
    : 'NO DISPONIBLE'
  const direccion_cliente = formatear_direccion(pedido?.direccionEntrega) || 'DIRECCION NO DISPONIBLE'
  const total = Number(pedido?.total)
  const total_seguro = Number.isFinite(total) ? total : 0
  const subtotal = Number((total_seguro / 1.16).toFixed(2))
  const iva = Number((total_seguro - subtotal).toFixed(2))
  const folio = String(pedido?.id || pedido?.folio || pedido?.pagoReferencia || 'pedido').slice(0, 10).toUpperCase()
  const metodo_pago_raw = String(pedido?.metodoPago || '').toLowerCase().trim()
  const metodo_pago = metodo_pago_raw.includes('credit') || metodo_pago_raw.includes('tarjeta')
    ? 'TARJETA DE CREDITO'
    : metodo_pago_raw.includes('debit')
      ? 'TARJETA DE DEBITO'
      : metodo_pago_raw
        ? metodo_pago_raw.replace(/_/g, ' ').toUpperCase()
        : 'MERCADO PAGO'
  return { items, fecha_texto, direccion_cliente, total_seguro, subtotal, iva, folio, metodo_pago }
}
