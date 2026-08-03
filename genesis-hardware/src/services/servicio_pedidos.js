// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { ESTADOS_PEDIDO, mensajesPorEstado } from './servicio_flujo_pedidos'
import { crearNotificacion } from './servicio_notificaciones'
import { buscarPerfilUsuario } from './servicio_usuarios'
import { ciudad_logistica, nombre_ciudad_logistica } from './constantes_logistica'
export const ZONAS_LOGISTICAS = [ciudad_logistica]

// pos esto funciona para crear el pedido cobrar el total y avisar al cliente dueno
export const confirmarPedido = async ({ carrito = [], origen = 'empleado', zonaLogistica = ciudad_logistica, clienteId = null, metodoPago = null, pagoReferencia = null }) => {
  const estadoInicial = origen === 'cliente' ? ESTADOS_PEDIDO.PENDIENTE_RECOLECCION : ESTADOS_PEDIDO.EN_EMPAQUE
  const perfil_cliente = clienteId ? await buscarPerfilUsuario(clienteId).catch(() => null) : null
  const direccion_base = String(perfil_cliente?.direccionVivienda || '').trim()
  if (origen === 'cliente' && (!clienteId || direccion_base.length < 15)) throw new Error('El cliente debe registrar una direccion completa antes de comprar')
  const direccion_entrega = direccion_base.toLowerCase().includes(ciudad_logistica) ? direccion_base : `${direccion_base}, ${nombre_ciudad_logistica}, Mexico`
  const codigo_postal_entrega = String(perfil_cliente?.codigoPostal || '').trim()
  const fecha = new Date().toISOString()
  const total = carrito.reduce((acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0), 0)
  const idPedido = await runTransaction(db, async (tx) => {
    const reservas = []
    for (const item of carrito) {
      // aqui maestro yo descuento el stock ligado directo por el id del producto del catalogo
      const inventarioRef = doc(db, 'inventario', item.id)
      const catalogoRef = doc(db, 'catalogo', item.id)
      const snap = await tx.get(inventarioRef)
      const catalogo = await tx.get(catalogoRef)
      if (!snap.exists() || !catalogo.exists()) throw new Error('Producto no disponible')
      const actual = Number(snap.data()?.volumen || 0)
      const cantidad = Number(item.cantidad || 0)
      if (cantidad <= 0 || actual < cantidad) throw new Error('Stock insuficiente')
      reservas.push({ inventarioRef, catalogoRef, actual, cantidad })
    }
    for (const reserva of reservas) {
      tx.update(reserva.inventarioRef, { volumen: reserva.actual - reserva.cantidad })
      tx.update(reserva.catalogoRef, { stockVisible: reserva.actual - reserva.cantidad })
    }
    const pedidoRef = doc(collection(db, 'pedidos'))
    tx.set(pedidoRef, {
      carrito, origen, zonaLogistica, clienteId, total,
      direccionEntrega: direccion_entrega,
      codigoPostalEntrega: codigo_postal_entrega,
      estado: estadoInicial, fecha,
      pagado: !!pagoReferencia, metodoPago, pagoReferencia,
      historialEstados: [{ estado: estadoInicial, fecha }]
    })
    return pedidoRef.id
  })
  if (clienteId) {
    await crearNotificacion({ clienteId, pedidoId: idPedido, mensaje: mensajesPorEstado[estadoInicial] })
  }
  return { id: idPedido, total, fecha }
}
