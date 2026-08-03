import { doc, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { formatear_direccion } from './formato_direccion'

// esto sirve para que el empleado libere el pedido hacia el anden de salida
export const liberarParaRepartidor = async (pedido, repartidor_id) => {
    if (!formatear_direccion(pedido?.direccionEntrega)) throw new Error('El pedido necesita una direccion de entrega antes de liberarse')
    if (!repartidor_id) throw new Error('Selecciona un repartidor antes de liberar el pedido')
    await updateDoc(doc(db, 'pedidos', pedido.id), {
        liberadoParaRepartidor: true,
        liberadoEn: new Date().toISOString(),
        repartidorId: repartidor_id
    })
}
