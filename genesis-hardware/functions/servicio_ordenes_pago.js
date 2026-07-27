import { db } from './base_firebase.js'

export const crear_pedido_pagado = async ({ usuario_id, carrito, total, zona_logistica, pago_id, metodo_pago }) => {
  const perfil = await db.collection('usuarios').doc(usuario_id).get()
  const direccion = String(perfil.data()?.direccionVivienda || '').trim()
  const fecha = new Date().toISOString()
  const pendiente_ref = db.collection('pagos_pendientes').doc(String(pago_id))
  const resultado = await db.runTransaction(async transaccion => {
    const pendiente = await transaccion.get(pendiente_ref)
    if (pendiente.data()?.pedido_id) return { id: pendiente.data().pedido_id, nuevo: false }
    const reservas = []
    for (const item of carrito) {
      const inventario_ref = db.collection('inventario').doc(item.id)
      const catalogo_ref = db.collection('catalogo').doc(item.id)
      const inventario = await transaccion.get(inventario_ref)
      const catalogo = await transaccion.get(catalogo_ref)
      const actual = Number(inventario.data()?.volumen || 0)
      if (!inventario.exists || !catalogo.exists || actual < item.cantidad) throw new Error('Stock insuficiente para crear el pedido')
      reservas.push({ inventario_ref, catalogo_ref, actual, cantidad: item.cantidad })
    }
    reservas.forEach(r => { transaccion.update(r.inventario_ref, { volumen: r.actual - r.cantidad }); transaccion.update(r.catalogo_ref, { stockVisible: r.actual - r.cantidad }) })
    const pedido_ref = db.collection('pedidos').doc()
    transaccion.set(pedido_ref, { carrito, origen: 'cliente', zonaLogistica: zona_logistica, clienteId: usuario_id, total, direccionEntrega: direccion, estado: 'pendiente_recoleccion', fecha, pagado: true, metodoPago: metodo_pago, pagoReferencia: pago_id, historialEstados: [{ estado: 'pendiente_recoleccion', fecha }] })
    transaccion.set(pendiente_ref, { pedido_id: pedido_ref.id, estado_pago: 'approved', actualizado_en: fecha }, { merge: true })
    return { id: pedido_ref.id, nuevo: true }
  })
  if (resultado.nuevo) await db.collection('notificaciones').add({ clienteId: usuario_id, pedidoId: resultado.id, mensaje: 'tu pedido fue pagado y está pendiente de recolección', leida: false, fecha })
  return resultado.id
}
