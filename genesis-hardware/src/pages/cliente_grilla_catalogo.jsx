import { ClienteTarjetaCatalogo } from './cliente_tarjeta_catalogo'

// maestro funciona asi yo agrupo tarjetas y encabezado del catalogo cliente
export function ClienteGrillaCatalogo({ productos, cargando, alAgregar }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando catalogo...</p>

  return (
    <section className="flex-1 border border-borde bg-fondo p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black text-texto">Procesadores</h1>
          <p className="text-sm text-mutado">Mostrando stock disponible</p>
        </div>
        <select className="bg-panel border border-borde text-xs text-texto px-3 py-2"><option>Relevancia</option></select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {productos.map((p) => <ClienteTarjetaCatalogo key={p.id} producto={p} alAgregar={alAgregar} />)}
      </div>
      <div className="flex gap-2 justify-center text-xs text-mutado"><span>1</span><span>2</span><span>3</span><span>...</span><span>12</span></div>
    </section>
  )
}
