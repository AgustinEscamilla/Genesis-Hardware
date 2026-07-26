export function SeccionHero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-borde bg-fondo">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,76,76,0.16),_transparent_38%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8 md:py-28">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 border border-primario/30 bg-primario/10 px-3 py-2 text-[10px] font-bold tracking-[0.2em] text-primario">
            <span className="h-2 w-2 rounded-full bg-primario" /> FABRICACION NACIONAL
          </span>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-texto md:text-7xl">Hardware confiable para construir mejor</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mutado md:text-lg">Componentes de alto rendimiento con disponibilidad clara soporte comercial y una operacion pensada para que cada pedido llegue completo</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalogo" className="bg-primario px-5 py-3 text-xs font-black tracking-wide text-fondo transition-colors hover:bg-red-300">Explorar catalogo</a>
            <a href="#noticias" className="border border-borde px-5 py-3 text-xs font-black tracking-wide text-texto transition-colors hover:border-primario hover:text-primario">Ver novedades</a>
          </div>
        </div>
        <div className="border border-borde bg-panel p-5 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-borde pb-4"><span className="text-xs font-bold uppercase tracking-widest text-texto">Operacion Genesis</span><span className="text-[10px] text-terciario">ACTIVA</span></div>
          <div className="grid grid-cols-2 gap-3 py-5">
            <div className="bg-fondo p-4"><p className="text-2xl font-black text-texto">24/7</p><p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Consulta de stock</p></div>
            <div className="bg-fondo p-4"><p className="text-2xl font-black text-texto">MX</p><p className="mt-1 text-[10px] uppercase tracking-widest text-mutado">Cobertura nacional</p></div>
            <div className="col-span-2 border-l-2 border-primario bg-fondo p-4"><p className="text-xs font-bold uppercase tracking-widest text-primario">Proceso visible</p><p className="mt-2 text-sm text-mutado">Compra seguimiento entrega y soporte en un solo lugar</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
