import { useEffect, useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { useCarritoGlobal } from './use_carrito_global'
import { ciudad_logistica } from '../services/constantes_logistica'
import { confirmarPedido } from '../services/servicio_pedidos'
import { buscarPerfilUsuario } from '../services/servicio_usuarios'

export function useCarritoPedidos(origen = 'cliente') {
  const { usuarioActual } = useAutenticacion(); const carrito_global = useCarritoGlobal(); const { carrito, agregar, ajustar, quitar, limpiar } = carrito_global
  const [zonaLogistica, setZonaLogistica] = useState(ciudad_logistica); const [guardando, setGuardando] = useState(false); const [mensaje, setMensaje] = useState(''); const [ticket, setTicket] = useState(null); const [paso, setPaso] = useState('carrito')
  const [direccion_cliente, setDireccionCliente] = useState('')
  useEffect(() => { if (origen !== 'cliente' || !usuarioActual?.uid) return; buscarPerfilUsuario(usuarioActual.uid).then((perfil) => setDireccionCliente(String(perfil?.direccionVivienda || '').trim())).catch(() => setDireccionCliente('')) }, [origen, usuarioActual])
  const total = carrito.reduce((acumulado, item) => acumulado + Number(item.precio || 0) * Number(item.cantidad || 0), 0)
  const irAPagar = async () => {
    if (!carrito.length) return
    if (origen === 'cliente' && direccion_cliente.length < 15) {
      const perfil = usuarioActual?.uid ? await buscarPerfilUsuario(usuarioActual.uid).catch(() => null) : null
      const direccion_actual = String(perfil?.direccionVivienda || '').trim()
      setDireccionCliente(direccion_actual)
      if (direccion_actual.length < 15) { setMensaje('Antes de comprar registra una direccion completa en tu perfil'); return }
    }
    setMensaje(''); setPaso('pago')
  }
  const volverAlCarrito = () => setPaso('carrito')
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
