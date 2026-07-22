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

  const agregar = (p) => setCarrito(prev => {
    const existe = prev.find(i => i.id === p.id)
    if (existe) return prev.map(i => i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i)
    return [...prev, { id: p.id, nombre: p.nombre, precio: Number(p.precio || 0), cantidad: 1 }]
  })

  const ajustar = (id, delta) => setCarrito(prev => prev
    .map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i))

  const quitar = (id) => setCarrito(prev => prev.filter(i => i.id !== id))

  const confirmar = async () => {
    if (!carrito.length) return
    setGuardando(true)
    try {
      const resultado = await confirmarPedido({ carrito, origen, zonaLogistica, clienteId: usuarioActual?.uid || null })
      setTicket({ folio: resultado.id, fecha: resultado.fecha, total: resultado.total, items: carrito })
      setCarrito([])
      setMensaje('Pedido confirmado')
    } catch (e) { setMensaje(String(e?.message || 'No se pudo confirmar')) }
    setGuardando(false)
  }

  const cerrarTicket = () => { setTicket(null); setMensaje('') }

  return { carrito, agregar, ajustar, quitar, confirmar, guardando, mensaje, zonaLogistica, setZonaLogistica, ticket, cerrarTicket }
}
