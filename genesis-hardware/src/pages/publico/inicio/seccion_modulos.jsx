import { useNoticiasPublico } from '../../../hooks/use_noticias_publico'

// esto sirve para desplegar las tarjetas de lineas de producto desde firestore
export function SeccionModulos() {
  const { noticias, cargando } = useNoticiasPublico()

  return (
    <section id="noticias" className="mx-auto max-w-7xl bg-fondo px-4 py-20 md:px-8">
      <div className="mb-10 flex flex-col gap-4 border-b border-borde pb-5 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Centro de novedades</p><h2 className="text-3xl font-black text-texto">Noticias y actualizaciones</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-mutado">Conoce los anuncios recientes de Genesis Hardware y los cambios importantes del catalogo</p></div>
      </div>
      {cargando && <p className="text-xs text-mutado">Cargando novedades...</p>}
      <div className="overflow-x-auto border border-borde bg-panel">
        <table className="min-w-[720px] w-full text-left text-xs">
          <thead className="border-b border-borde bg-fondo text-[10px] uppercase tracking-widest text-mutado"><tr><th className="px-4 py-3 font-semibold">Fecha</th><th className="px-4 py-3 font-semibold">Noticia</th><th className="px-4 py-3 font-semibold">Detalle</th><th className="px-4 py-3 font-semibold">Estado</th></tr></thead>
          <tbody>
            {noticias.map((noticia) => <tr key={noticia.id} className="border-b border-borde/70 last:border-0"><td className="whitespace-nowrap px-4 py-4 text-mutado">Reciente</td><td className="px-4 py-4"><p className="font-bold text-texto">{noticia.titulo}</p><p className="mt-1 text-[10px] text-primario">{noticia.etiqueta || 'Actualizacion'}</p></td><td className="max-w-md px-4 py-4 leading-5 text-mutado">{noticia.descripcion}</td><td className="px-4 py-4"><span className="border border-terciario/30 bg-terciario/10 px-2 py-1 text-[10px] font-bold text-terciario">{noticia.valor || 'Publicado'}</span></td></tr>)}
            {!cargando && !noticias.length && <tr><td colSpan="4" className="px-4 py-10 text-center text-xs text-mutado">Todavia no hay noticias publicadas</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}
