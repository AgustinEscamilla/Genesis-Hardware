// aqui maestro yo documente este archivo para mantener trazabilidad
import { useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { confirmarPedido } from '../services/servicio_pedidos'

export function useCarritoPedidos(origen = 'cliente') {
  const { usuarioActual } = useAutenticacion()
  const [carrito, setCarrito] = useState([])
  const [zonaLogistica, setZonaLogistica] = useState('norte')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [ticket, setTicket] = useState(null)
  const [paso, setPaso] = useState('carrito')
  const agregar = (p) => setCarrito(prev => {
    const existe = prev.find(i => i.id === p.id)
    if (existe) return prev.map(i => i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i)
    return [...prev, { id: p.id, nombre: p.nombre, precio: Number(p.precio || 0), cantidad: 1 }]
  })
  const ajustar = (id, delta) => setCarrito(prev => prev
    .map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i))
  const quitar = (id) => setCarrito(prev => prev.filter(i => i.id !== id))
  const total = carrito.reduce((acc, i) => acc + Number(i.precio || 0) * Number(i.cantidad || 0), 0)
  const irAPagar = () => carrito.length && setPaso('pago')
  const volverAlCarrito = () => setPaso('carrito')
  const confirmar = async (datosPago = {}) => {
    if (!carrito.length) return
    if (datosPago.pagoReferencia) {
      setTicket({ folio: datosPago.pedidoId || datosPago.pagoReferencia, fecha: new Date().toISOString(), total, items: carrito, estadoPago: datosPago.estadoPago, urlPago: datosPago.urlPago })
      setCarrito([])
      setPaso('carrito')
      setMensaje(datosPago.estadoPago === 'approved' ? 'Pedido confirmado' : 'Pago pendiente de confirmación')
      return
    }
    setGuardando(true)
    try {
      const resultado = await confirmarPedido({ carrito, origen, zonaLogistica, clienteId: usuarioActual?.uid || null, ...datosPago })
      setTicket({ folio: resultado.id, fecha: resultado.fecha, total: resultado.total, items: carrito, estadoPago: 'approved' })
      setCarrito([])
      setPaso('carrito')
      setMensaje('Pedido confirmado')
    } catch (e) { setMensaje(String(e?.message || 'No se pudo confirmar')) }
    setGuardando(false)
  }
  const cerrarTicket = () => { setTicket(null); setMensaje('') }
  return {
    carrito, agregar, ajustar, quitar, confirmar, guardando, mensaje,
    zonaLogistica, setZonaLogistica, ticket, cerrarTicket,
    paso, irAPagar, volverAlCarrito, total
  }
}
