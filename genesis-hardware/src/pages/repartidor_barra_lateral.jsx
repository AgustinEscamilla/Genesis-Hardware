// aqui maestro yo arme la barra lateral del panel de reparto
export function RepartidorBarraLateral() {
  const items = ['Production', 'Storage', 'Shipping', 'Returns']

  return (
    <aside className="w-56 border-r border-borde bg-panel p-4 flex flex-col">
      <div className="border border-borde p-3 mb-4">
        <p className="text-primario font-black">NODE 01</p>
        <p className="text-xs text-mutado">Terminal Active</p>
      </div>
      <button className="border border-primario text-primario text-xs py-2 mb-4">EMERGENCY STOP</button>
      <div className="flex flex-col gap-1">
        {items.map(i => <button key={i} className={`text-left text-xs px-3 py-2 border border-borde ${i === 'Shipping' ? 'bg-secundario/20 text-texto' : 'text-mutado'}`}>{i}</button>)}
      </div>
      <div className="mt-auto text-xs text-mutado flex flex-col gap-2"><span>Diagnostics</span><span>Logs</span></div>
    </aside>
  )
}
