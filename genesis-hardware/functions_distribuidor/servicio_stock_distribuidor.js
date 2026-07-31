import { buscar_producto } from './servicio_busqueda_producto.js'

const obtener_reserva = async (transaccion, base_datos, item) => {
  const producto_encontrado = await buscar_producto(transaccion, base_datos, item.sku_distribuidor, item.nombre_producto)
  const catalogo_ref = producto_encontrado.referencia
  const inventario_ref = base_datos.collection('inventario').doc(catalogo_ref.id)
  const inventario = await transaccion.get(inventario_ref)
  const producto = producto_encontrado.documento
  const stock_actual = Number(producto.data()?.stockVisible || 0)
  if (stock_actual < item.cantidad) throw new Error(`Stock insuficiente ${item.sku_distribuidor}`)
  return {
    catalogo_ref,
    inventario_ref,
    inventario,
    producto: producto.data(),
    stock_restante: stock_actual - item.cantidad
  }
}

export const actualizar_stock_distribuidor = async (transaccion, base_datos, items) => {
  const reservas = []
  for (const item of items) reservas.push(await obtener_reserva(transaccion, base_datos, item))
  reservas.forEach((reserva) => {
    transaccion.update(reserva.catalogo_ref, { stockVisible: reserva.stock_restante })
    const datos_inventario = { productoId: reserva.catalogo_ref.id, nombreProducto: reserva.producto.nombre || '', volumen: reserva.stock_restante, fechaActualizacion: new Date().toISOString() }
    if (reserva.inventario.exists) transaccion.update(reserva.inventario_ref, datos_inventario)
    else transaccion.set(reserva.inventario_ref, { ...datos_inventario, tipoUnidad: 'pieza', stockMinimo: 5 })
  })
}
