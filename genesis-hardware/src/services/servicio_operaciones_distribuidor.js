import { addDoc, collection, doc, limit, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from './conexion_firebase'
import { formatear_direccion } from './formato_direccion'

export const escucharOperacionesDistribuidor = (al_cambiar, al_error) => {
  const referencia = query(collection(db, 'pedidos_distribuidor'), limit(50))
  return onSnapshot(referencia, (instantanea) => {
    const datos = instantanea.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
    datos.sort((a, b) => obtener_fecha(b) - obtener_fecha(a))
    al_cambiar(datos)
  }, al_error)
}

export const actualizarOperacionDistribuidor = (id, estado) => updateDoc(doc(db, 'pedidos_distribuidor', id), { estado, actualizadoEn: new Date().toISOString() })

export const convertirOperacionEnPedido = async (operacion) => {
  const direccion = formatear_direccion(operacion.direccion)
  if (!direccion) throw new Error('La solicitud no tiene direccion de entrega')
  const fecha = new Date().toISOString()
  const carrito = (operacion.items || []).map((item) => ({ id: item.sku_distribuidor, nombre: item.nombre_producto || item.nombre || item.sku_distribuidor, cantidad: Number(item.cantidad || 0), precio: 0 }))
  const pedido = await addDoc(collection(db, 'pedidos'), { origen: 'abastecimiento', operacionDistribuidorId: operacion.id, clienteId: null, zonaLogistica: 'campeche', direccionEntrega: direccion, carrito, total: 0, pagado: true, estado: 'listo_despacho', fecha, fechaEstado: fecha, liberadoParaRepartidor: false, historialEstados: [{ estado: 'listo_despacho', fecha }] })
  await actualizarOperacionDistribuidor(operacion.id, 'listo_despacho')
  return pedido.id
}

const obtener_fecha = (operacion) => {
  const valor = operacion.fecha || operacion.creadoEn || operacion.actualizadoEn || operacion.createdAt
  if (valor?.toDate) return valor.toDate().getTime()
  return new Date(valor || 0).getTime()
}
