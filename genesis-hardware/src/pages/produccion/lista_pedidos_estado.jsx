import { TarjetaPedidoEstado } from './tarjeta_pedido_estado'

// maestro funciona asi yo agrupo pedidos de una etapa para operacion diaria
export function ListaPedidosEstado({ titulo, pedidos, accion, textoAccion }) {
  return (
    <div className="border border-borde bg-fondo p-4 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">{titulo}</p>
      {!pedidos.length && <p className="text-xs text-mutado">Sin pedidos en esta etapa</p>}
      <div className="grid grid-cols-1 gap-3">
        {pedidos.map(p => <TarjetaPedidoEstado key={p.id} pedido={p} accion={accion} textoAccion={textoAccion} />)}
      </div>
    </div>
  )
}
