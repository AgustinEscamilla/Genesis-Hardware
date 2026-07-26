import { arrayUnion, collection, doc, writeBatch } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { ESTADOS_PEDIDO, mensajesPorEstado } from './servicio_flujo_pedidos'
import { agruparPedidosPorZona } from './servicio_manifiestos'
import { crearNotificacion } from './servicio_notificaciones'

// esto sirve para mover toda la ruta aceptada a en reparto en un solo lote atomico
export const iniciarRutaRepartidor = async (paradas = [], repartidorId = null) => {
    const pedidos = paradas.map((p) => p.pedido)
    const porZona = agruparPedidosPorZona(pedidos)
    const lote = writeBatch(db)
    const fecha = new Date().toISOString()
    const manifiestosIds = []

    for (const zona of Object.keys(porZona)) {
        const pedidosDeZona = porZona[zona]
        const manifiestoRef = doc(collection(db, 'manifiestos'))
        lote.set(manifiestoRef, { zona, pedidosIds: pedidosDeZona.map((p) => p.id), estado: ESTADOS_PEDIDO.EN_REPARTO, creadoEn: fecha, repartidorId })
        manifiestosIds.push(manifiestoRef.id)
        pedidosDeZona.forEach((pedido) => {
            const pedidoRef = doc(db, 'pedidos', pedido.id)
            lote.update(pedidoRef, {
                estado: ESTADOS_PEDIDO.EN_REPARTO,
                fechaEstado: fecha,
                historialEstados: arrayUnion({ estado: ESTADOS_PEDIDO.EN_REPARTO, fecha }),
                manifiestoId: manifiestoRef.id,
                repartidorId
            })
        })
    }

    await lote.commit()
    // aqui maestro yo aviso a cada cliente ya que el lote quedo confirmado en firestore
    await Promise.all(pedidos.filter((p) => p.clienteId).map((p) => crearNotificacion({ clienteId: p.clienteId, pedidoId: p.id, mensaje: mensajesPorEstado[ESTADOS_PEDIDO.EN_REPARTO] })))
    return manifiestosIds
}
