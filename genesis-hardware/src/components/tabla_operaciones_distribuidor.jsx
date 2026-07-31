const encabezados = ['Tipo', 'Pedido', 'Productos', 'Estado', 'Actualizado']

export function TablaOperacionesDistribuidor({ operaciones = [], mensaje_vacio = 'Sin operaciones registradas' }) {
  return (
    <div className="overflow-x-auto border border-borde bg-panel">
      <table className="w-full min-w-[680px] text-left text-xs">
        <thead className="border-b border-borde bg-fondo text-[10px] uppercase tracking-widest text-mutado">
          <tr>{encabezados.map((encabezado) => <th key={encabezado} className="px-4 py-3 font-bold">{encabezado}</th>)}</tr>
        </thead>
        <tbody>
          {!operaciones.length && <tr><td colSpan="5" className="px-4 py-10 text-center text-mutado">{mensaje_vacio}</td></tr>}
          {operaciones.map((operacion) => <tr key={operacion.id} className="border-b border-borde/60 text-texto"><td className="px-4 py-3">{operacion.tipo}</td><td className="px-4 py-3">{operacion.pedido}</td><td className="px-4 py-3">{operacion.productos}</td><td className="px-4 py-3 text-terciario">{operacion.estado}</td><td className="px-4 py-3 text-mutado">{operacion.actualizado}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
