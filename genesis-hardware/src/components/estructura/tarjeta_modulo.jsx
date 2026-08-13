// aqui maestro yo documente este archivo para mantener trazabilidad
export function TarjetaModulo({ titulo, descripcion, metrica, valor, etiqueta, imagen }) {
  return (
    <article className="borde-degradado-hover group flex h-full flex-col rounded-xl border border-borde bg-panel p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-vidrio">
      <div>
        <div className="mb-4 flex items-center justify-between"><span className="rounded-full border border-borde bg-fondo px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-mutado">{etiqueta}</span><span className="text-primario transition-transform group-hover:translate-x-1">↗</span></div>
        {imagen
          ? <img src={imagen} alt={titulo} className="mb-5 h-44 w-full rounded-lg object-contain bg-fondo p-3" />
          : <div className="mb-5 flex h-44 w-full items-center justify-center rounded-lg bg-fondo text-4xl font-black texto-degradado">GH</div>
        }
        <h3 className="text-xl font-black text-texto transition-colors group-hover:text-primario">{titulo}</h3>
        <p className="mt-2 text-sm leading-6 text-mutado">{descripcion}</p>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-borde pt-4"><span className="text-xs text-mutado">{metrica}</span><span className="font-black tracking-wide text-texto">{valor}</span></div>
    </article>
  )
}
