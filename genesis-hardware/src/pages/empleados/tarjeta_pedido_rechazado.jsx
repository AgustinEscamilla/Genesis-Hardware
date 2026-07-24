// aqui puse profe yo muestro un pedido rechazado con su motivo y accion
export function TarjetaPedidoRechazado({ pedido, alReprocesar }) {
  return (
    <div className="border border-borde bg-[#111] rounded-lg p-4 flex flex-col gap-2">
      <p className="text-sm font-semibold text-texto">Pedido {pedido.id.slice(0, 8)}</p>
      <p className="text-[10px] text-mutado">Zona {pedido.zonaLogistica || 'sin zona'}</p>
      <p className="text-xs text-primario">{pedido.motivoRechazo || 'Sin motivo registrado'}</p>
      <button onClick={() => alReprocesar(pedido)} className="text-xs border border-primario text-primario px-3 py-1.5 rounded hover:bg-primario hover:text-fondo transition-colors self-start">
        Reintentar entrega
      </button>
    </div>
  )
}
