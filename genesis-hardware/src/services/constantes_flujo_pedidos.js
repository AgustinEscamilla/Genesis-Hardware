export const estados_pedido = Object.freeze({
  recibido: 'recibido', pendiente_recoleccion: 'pendiente_recoleccion', en_empaque: 'en_empaque',
  listo_despacho: 'listo_despacho', en_reparto: 'en_reparto', entregado: 'entregado', rechazado: 'rechazado',
})

export const mensajes_por_estado = {
  recibido: 'tu pedido fue recibido y entra a la cola de empaque',
  pendiente_recoleccion: 'tu pedido fue pagado y esta pendiente de recoleccion por el repartidor',
  en_empaque: 'tu pedido esta en proceso de empaque', listo_despacho: 'tu pedido esta listo para despacho',
  en_reparto: 'tu pedido esta en camino con el repartidor', entregado: 'tu pedido fue entregado con exito',
  rechazado: 'tu pedido fue rechazado en la entrega y sera gestionado por un asesor',
}

export const transiciones_por_estado = {
  recibido: ['en_empaque'], en_empaque: ['listo_despacho'], listo_despacho: ['en_reparto'],
  pendiente_recoleccion: ['en_reparto'], en_reparto: ['entregado', 'rechazado'], rechazado: ['pendiente_recoleccion'],
}

export const es_transicion_pedido_valida = (estado_actual, estado_nuevo) =>
  transiciones_por_estado[estado_actual]?.includes(estado_nuevo) || false
