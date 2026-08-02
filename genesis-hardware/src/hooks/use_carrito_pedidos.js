import { useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { useCarritoGlobal } from './use_carrito_global'
import { confirmarPedido } from '../services/servicio_pedidos'

export function useCarritoPedidos(origen = 'cliente') {
  const { usuarioActual } = useAutenticacion(); const carrito_global = useCarritoGlobal(); const { carrito, agregar, ajustar, quitar, limpiar } = carrito_global
  const [zonaLogistica, setZonaLogistica] = useState('norte'); const [guardando, setGuardando] = useState(false); const [mensaje, setMensaje] = useState(''); const [ticket, setTicket] = useState(null); const [paso, setPaso] = useState('carrito')
  const total = carrito.reduce((acumulado, item) => acumulado + Number(item.precio || 0) * Number(item.cantidad || 0), 0)
  const irAPagar = () => carrito.length && setPaso('pago'); const volverAlCarrito = () => setPaso('carrito')
  const confirmar = async (datosPago = {}) => {
    if (!carrito.length) return
    if (datosPago.pagoReferencia) { setTicket({ folio: datosPago.pedidoId || datosPago.pagoReferencia, fecha: new Date().toISOString(), total, items: carrito, estadoPago: datosPago.estadoPago, urlPago: datosPago.urlPago }); limpiar(); setPaso('carrito'); setMensaje('Pedido confirmado'); return }
    setGuardando(true)
    try { const resultado = await confirmarPedido({ carrito, origen, zonaLogistica, clienteId: usuarioActual?.uid || null, ...datosPago }); setTicket({ folio: resultado.id, fecha: resultado.fecha, total: resultado.total, items: carrito, estadoPago: 'approved' }); limpiar(); setPaso('carrito'); setMensaje('Pedido confirmado') } catch (error) { setMensaje(String(error?.message || 'No se pudo confirmar')) }
    setGuardando(false)
  }
  const cerrarTicket = () => { setTicket(null); setMensaje('') }
  return { carrito, agregar, ajustar, quitar, confirmar, guardando, mensaje, zonaLogistica, setZonaLogistica, ticket, cerrarTicket, paso, irAPagar, volverAlCarrito, total }
}
