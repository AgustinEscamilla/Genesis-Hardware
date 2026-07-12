// aqui maestro yo documente este archivo para mantener trazabilidad
import { useState } from 'react'
import { confirmarPedido } from '../services/servicio_pedidos'

export function useCarritoPedidos(origen = 'cliente') {
  const [carrito, setCarrito] = useState([])
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const agregar = (p) => setCarrito(prev => {
    const existe = prev.find(i => i.id === p.id)
    if (existe) return prev.map(i => i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i)
    return [...prev, { id: p.id, nombre: p.nombre, cantidad: 1 }]
  })

  const ajustar = (id, delta) => setCarrito(prev => prev
    .map(i => i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i))

  const quitar = (id) => setCarrito(prev => prev.filter(i => i.id !== id))

  const confirmar = async () => {
    if (!carrito.length) return
    setGuardando(true)
    try { await confirmarPedido({ carrito, origen }); setCarrito([]); setMensaje('Pedido confirmado') }
    catch (e) { setMensaje(String(e?.message || 'No se pudo confirmar')) }
    setGuardando(false)
  }

  return { carrito, agregar, ajustar, quitar, confirmar, guardando, mensaje }
}
