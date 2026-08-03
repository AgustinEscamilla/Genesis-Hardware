import { db } from './base_firebase.js'
import { registrar_auditoria } from './servicio_auditoria.js'

export const crear_pedido_pagado = async ({ usuario_id, carrito, total, zona_logistica, pago_id, metodo_pago }) => {
  const perfil = await db.collection('usuarios').doc(usuario_id).get()
  const perfil_datos = perfil.data() || {}
  const direccion = String(perfil_datos.direccionVivienda || '').trim()
  const codigo_postal = String(perfil_datos.codigoPostal || '').trim()
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
      const actual = inventario.exists ? Number(inventario.data()?.volumen || 0) : Number(catalogo.data()?.stockVisible || 0)
      if (!catalogo.exists || actual < item.cantidad) throw new Error('Stock insuficiente para crear el pedido')
      reservas.push({ inventario_ref, catalogo_ref, tiene_inventario: inventario.exists, actual, cantidad: item.cantidad })
    }
    reservas.forEach(r => { if (r.tiene_inventario) transaccion.update(r.inventario_ref, { volumen: r.actual - r.cantidad }); transaccion.update(r.catalogo_ref, { stockVisible: r.actual - r.cantidad }) })
    const pedido_ref = db.collection('pedidos').doc()
    const pedido_datos = { carrito, origen: 'cliente', zonaLogistica: zona_logistica, clienteId: usuario_id, total, direccionEntrega: direccion, codigoPostalEntrega: codigo_postal, estado: 'pendiente_recoleccion', fecha, pagado: true, metodoPago: metodo_pago, pagoReferencia: pago_id, historialEstados: [{ estado: 'pendiente_recoleccion', fecha }] }
    transaccion.set(pedido_ref, pedido_datos)
    reservas.forEach(r => registrar_auditoria({ usuario: usuario_id, rol: perfil_datos.rol || 'cliente', accion: 'actualizar_inventario', coleccion: r.tiene_inventario ? 'inventario' : 'catalogo', documento_id: r.catalogo_ref.id, valores_viejos: { stock: r.actual }, valores_nuevos: { stock: r.actual - r.cantidad } }, transaccion))
    registrar_auditoria({ usuario: usuario_id, rol: perfil_datos.rol || 'cliente', accion: 'crear_pedido', coleccion: 'pedidos', documento_id: pedido_ref.id, valores_nuevos: pedido_datos }, transaccion)
    transaccion.set(pendiente_ref, { pedido_id: pedido_ref.id, estado_pago: 'approved', actualizado_en: fecha }, { merge: true })
    return { id: pedido_ref.id, nuevo: true }
  })
  if (resultado.nuevo) await db.collection('notificaciones').add({ clienteId: usuario_id, pedidoId: resultado.id, mensaje: 'tu pedido fue pagado y está pendiente de recolección', leida: false, fecha })
  return resultado.id
}
