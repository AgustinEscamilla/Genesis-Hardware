import { MapaClienteRastreo } from './mapas/mapa_cliente_rastreo'

// aqui maestro dejo los mensajes para cuando el pedido todavia no sale a reparto
const mensajes_por_estado = {
  recibido: 'Tu pedido fue recibido, pronto comenzaremos a prepararlo',
  pendiente_recoleccion: 'Tu pedido está pendiente de recolección en el almacén',
  en_empaque: 'Tu pedido se está empacando',
  listo_despacho: 'Tu pedido está listo, pronto sale a reparto',
  entregado: 'Tu pedido ya fue entregado'
}

// esto sirve para que el cliente siempre vea un apartado de rastreo dentro de cada pedido, sin importar el estado
// (usa la misma simulacion de Estafeta que ya tenemos para el mapa del repartidor)
export function ClienteApartadoRastreo({ pedido }) {
  return (
    <div className="border-t border-borde pt-2 flex flex-col gap-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-primario">Rastreo de mi pedido</p>
      {pedido.estado === 'en_reparto'
        ? <MapaClienteRastreo pedido_id={pedido.id} />
        : <p className="text-xs text-mutado">{mensajes_por_estado[pedido.estado] || 'Sin novedades por el momento'}</p>}
    </div>
  )
}
