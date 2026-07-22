// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { ESTADOS_PEDIDO, mensajesPorEstado } from './servicio_flujo_pedidos'
import { crearNotificacion } from './servicio_notificaciones'

export const ZONAS_LOGISTICAS = ['norte', 'sur', 'centro', 'oriente', 'poniente']

// pos esto funciona para crear el pedido cobrar el total y avisar al cliente dueno
export const confirmarPedido = async ({ carrito = [], origen = 'empleado', zonaLogistica = 'sin_zona', clienteId = null }) => {
  const estadoInicial = origen === 'cliente' ? ESTADOS_PEDIDO.PENDIENTE_RECOLECCION : ESTADOS_PEDIDO.EN_EMPAQUE
  const fecha = new Date().toISOString()
  const total = carrito.reduce((acc, item) => acc + Number(item.precio || 0) * Number(item.cantidad || 0), 0)
  const idPedido = await runTransaction(db, async (tx) => {
    for (const item of carrito) {
      // aqui maestro yo descuento el stock ligado directo por el id del producto del catalogo
      const ref = doc(db, 'inventario', item.id)
      const snap = await tx.get(ref)
      if (!snap.exists()) throw new Error('Inventario no disponible')
      const actual = Number(snap.data()?.volumen || 0)
      const cantidad = Number(item.cantidad || 0)
      if (cantidad <= 0 || actual < cantidad) throw new Error('Stock insuficiente')
      tx.update(ref, { volumen: actual - cantidad })
    }
    const pedidoRef = doc(collection(db, 'pedidos'))
    tx.set(pedidoRef, {
      carrito, origen, zonaLogistica, clienteId, total,
      estado: estadoInicial, fecha,
      historialEstados: [{ estado: estadoInicial, fecha }]
    })
    return pedidoRef.id
  })
  if (clienteId) {
    await crearNotificacion({ clienteId, pedidoId: idPedido, mensaje: mensajesPorEstado[estadoInicial] })
  }
  return { id: idPedido, total, fecha }
}