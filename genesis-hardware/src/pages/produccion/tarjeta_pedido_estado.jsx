// aqui puse profe yo renderizo cada pedido con su contenido y accion
export function TarjetaPedidoEstado({ pedido, accion, textoAccion }) {
  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs text-primario">Pedido {pedido.id.slice(0, 8)}</p>
      <div className="flex flex-col gap-1">
        {pedido.carrito?.map((i, idx) => <p key={idx} className="text-xs text-texto">{i.nombre} x {i.cantidad}</p>)}
      </div>
      <button onClick={() => accion(pedido.id)} className="text-xs border border-primario text-primario px-3 py-1 hover:bg-primario hover:text-fondo transition-colors">
        {textoAccion}
      </button>
    </div>
  )
}
