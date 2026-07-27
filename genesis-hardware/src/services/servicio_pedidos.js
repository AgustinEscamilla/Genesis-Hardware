// aqui maestro yo documente este archivo para mantener trazabilidad
import { collection, doc, runTransaction } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { ESTADOS_PEDIDO, mensajesPorEstado } from './servicio_flujo_pedidos'
import { crearNotificacion } from './servicio_notificaciones'
import { buscarPerfilUsuario } from './servicio_usuarios'

export const ZONAS_LOGISTICAS = ['norte', 'sur', 'centro', 'oriente', 'poniente']

// pos esto funciona para crear el pedido cobrar el total y avisar al cliente dueno
export const confirmarPedido = async ({ carrito = [], origen = 'empleado', zonaLogistica = 'sin_zona', clienteId = null, metodoPago = null, pagoReferencia = null }) => {
  const estadoInicial = origen === 'cliente' ? ESTADOS_PEDIDO.PENDIENTE_RECOLECCION : ESTADOS_PEDIDO.EN_EMPAQUE
  const perfil_cliente = clienteId ? await buscarPerfilUsuario(clienteId).catch(() => null) : null
  const direccion_entrega = String(perfil_cliente?.direccionVivienda || '').trim()
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
