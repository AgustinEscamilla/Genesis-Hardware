// aqui maestro yo arme la barra lateral del panel de reparto
export function RepartidorBarraLateral() {
  return (
    <aside className="w-56 border-r border-borde bg-panel p-4 flex flex-col">
      <div className="border border-borde p-3 mb-4">
        <p className="text-primario font-black">NODO 01</p>
        <p className="text-xs text-mutado">Terminal activa</p>
      </div>
      <button className="border border-primario text-primario text-xs py-2 mb-4">Pedidos</button>
      <div className="mt-auto text-xs text-mutado flex flex-col gap-2"><span>Diagnostico</span><span>Registros</span></div>
    </aside>
  )
}
