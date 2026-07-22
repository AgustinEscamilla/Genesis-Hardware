import { doc, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'

// esto sirve para que el empleado libere el pedido hacia el anden de salida
export const liberarParaRepartidor = async (pedido) => {
    await updateDoc(doc(db, 'pedidos', pedido.id), {
        liberadoParaRepartidor: true,
        liberadoEn: new Date().toISOString()
    })
}
