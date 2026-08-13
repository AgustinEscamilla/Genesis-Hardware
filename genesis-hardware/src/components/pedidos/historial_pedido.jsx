const etiquetas_estado = {
  recibido: 'Recibido',
  pendiente_recoleccion: 'Pendiente de recoleccion',
  en_empaque: 'En empaque',
  listo_despacho: 'Listo para despacho',
  en_reparto: 'En reparto',
  entregado: 'Entregado'
}

const formatear_fecha_estado = (fecha) => {
  const fecha_estado = new Date(fecha)
  return Number.isNaN(fecha_estado.getTime()) ? 'Fecha no disponible' : fecha_estado.toLocaleString()
}

export function HistorialPedido({ historial_pedido }) {
  return (
    <div className="flex flex-col gap-2">
      {historial_pedido.map((paso, indice) => (
        <div key={`${paso.estado}-${paso.fecha}-${indice}`} className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${indice === historial_pedido.length - 1 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
          <p className="text-xs text-slate-200">{etiquetas_estado[paso.estado] || paso.estado}</p>
          <p className="ml-auto text-[10px] text-slate-400">{formatear_fecha_estado(paso.fecha)}</p>
        </div>
      ))}
    </div>
  )
}
