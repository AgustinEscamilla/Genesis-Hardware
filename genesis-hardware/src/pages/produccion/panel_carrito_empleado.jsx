// aqui maestro yo documente este archivo para mantener trazabilidad
export function PanelCarritoEmpleado({ carrito, ajustar, quitar, confirmar, guardando, mensaje }) {
  return (
    <div className="border border-borde bg-panel p-4 flex flex-col gap-3 h-fit">
      <p className="text-xs uppercase tracking-widest text-primario">Carrito de pedidos</p>
      {!carrito.length && <p className="text-xs text-mutado">No hay productos en carrito</p>}
      {carrito.map(i => (
        <div key={i.id} className="border border-borde p-2 flex flex-col gap-2">
          <p className="text-xs text-texto">{i.nombre}</p>
          <div className="flex gap-2 items-center">
            <button onClick={() => ajustar(i.id, -1)} className="px-2 border border-borde text-xs">-</button>
            <span className="text-xs text-texto">{i.cantidad}</span>
            <button onClick={() => ajustar(i.id, 1)} className="px-2 border border-borde text-xs">+</button>
            <button onClick={() => quitar(i.id)} className="ml-auto px-2 border border-borde text-xs">Quitar</button>
          </div>
        </div>
      ))}
      <button onClick={confirmar} disabled={guardando || !carrito.length} className="text-xs border border-primario text-primario px-3 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">
        {guardando ? 'Confirmando...' : 'Confirmar pedido'}
      </button>
      {mensaje && <p className="text-xs text-mutado">{mensaje}</p>}
    </div>
  )
}
