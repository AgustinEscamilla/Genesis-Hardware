// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, getDocs, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { ESTADOS_PEDIDO } from './servicio_flujo_pedidos'
import { crearNotificacion } from './servicio_notificaciones'

export const ZONAS_LOGISTICAS = ['norte', 'sur', 'centro', 'oriente', 'poniente']

const colInventario = () => collection(db, 'inventario')

const mapaInventarioPorNombre = async () => {
  const snap = await getDocs(colInventario())
  return snap.docs.reduce((acc, d) => {
    const data = d.data()
    acc[String(data.nombre || '').toLowerCase()] = d.ref
    return acc
  }, {})
}

// pos esto funciona para crear el pedido con su zona y avisar al cliente dueno
export const confirmarPedido = async ({ carrito = [], origen = 'empleado', zonaLogistica = 'sin_zona', clienteId = null }) => {
  const refs = await mapaInventarioPorNombre()
  const estadoInicial = origen === 'cliente' ? ESTADOS_PEDIDO.RECIBIDO : ESTADOS_PEDIDO.EN_EMPAQUE
  const fecha = new Date().toISOString()
  const idPedido = await runTransaction(db, async (tx) => {
    for (const item of carrito) {
      const ref = refs[String(item.nombre || '').toLowerCase()]
      if (!ref) throw new Error('Inventario no disponible')
      const snap = await tx.get(ref)
      const actual = Number(snap.data()?.volumen || 0)
      const cantidad = Number(item.cantidad || 0)
      if (cantidad <= 0 || actual < cantidad) throw new Error('Stock insuficiente')
      tx.update(ref, { volumen: actual - cantidad })
    }
    const pedidoRef = doc(collection(db, 'pedidos'))
    tx.set(pedidoRef, {
      carrito, origen, zonaLogistica, clienteId,
      estado: estadoInicial, fecha,
      historialEstados: [{ estado: estadoInicial, fecha }]
    })
    return pedidoRef.id
  })
  if (clienteId) {
    await crearNotificacion({ clienteId, pedidoId: idPedido, mensaje: 'tu pedido fue recibido y entra a la cola de empaque' })
  }
  return idPedido
}