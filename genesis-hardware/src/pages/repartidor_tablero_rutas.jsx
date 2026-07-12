import { TarjetaPedidoEstado } from './produccion/tarjeta_pedido_estado'

// pos esto funciona yo pinto el tablero principal de ruta y manifiesto
export function RepartidorTableroRutas({ pedidos, alEntregar }) {
  return (
    <section className="flex-1 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-borde pb-3">
        <div><p className="text-xs text-[#d8b4fe]">LIVE DISPATCH</p><h1 className="text-5xl font-black">Panel de Reparto y Rutas</h1></div>
        <div className="flex gap-2"><button className="border border-borde px-4 py-2 text-xs">Sync GPS</button><button className="border border-[#d8b4fe] bg-[#d8b4fe] text-fondo px-4 py-2 text-xs">Scan Package</button></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="border border-borde bg-panel p-3"><p className="text-xs text-mutado mb-3">MANIFEST SEQUENCE</p>{!pedidos.length && <p className="text-xs text-mutado">Sin pedidos listos</p>}{pedidos.map(p => <p key={p.id} className="text-xs text-texto mb-2">Pedido {p.id.slice(0, 8)}</p>)}</div>
        <div className="xl:col-span-2 border border-borde min-h-80 bg-[linear-gradient(90deg,rgba(139,92,246,.08)_1px,transparent_1px),linear-gradient(rgba(139,92,246,.08)_1px,transparent_1px)] bg-[size:20px_20px] flex items-center justify-center text-muted"><span className="text-sm text-mutado">Mapa de ruta operativo</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pedidos.map(p => <TarjetaPedidoEstado key={p.id} pedido={p} accion={alEntregar} textoAccion="Marcar entregado" />)}
      </div>
    </section>
  )
}
