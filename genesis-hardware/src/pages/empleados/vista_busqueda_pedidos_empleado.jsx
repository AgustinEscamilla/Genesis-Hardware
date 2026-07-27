import { useMemo, useState } from 'react'
import { useInventarioLista } from '../../hooks/use_inventario_lista'

// esto sirve para buscar piezas existentes y mostrar disponibilidad para pedidos
export function VistaBusquedaPedidosEmpleado() {
  const { inventario, cargando, error } = useInventarioLista()
  const [busqueda, setBusqueda] = useState('')

  const resultados = useMemo(() => {
    const termino = busqueda.toLowerCase()
    return inventario.filter((item) => String(item.nombreProducto).toLowerCase().includes(termino))
  }, [busqueda, inventario])

  if (cargando) return <div className="flex min-h-40 items-center justify-center bg-fondo text-xs text-mutado">Cargando piezas disponibles</div>

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        {error && <div className="mb-4 border border-primario bg-fondo p-3 text-xs text-primario">{error}</div>}
        <h2 className="text-xl font-bold mb-3">Busqueda para pedidos</h2>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar pieza por nombre" className="w-full bg-fondo border border-borde text-texto px-3 py-2 text-xs mb-4" />
        <div className="grid grid-cols-1 gap-3">
          {resultados.map((item) => (
            <div key={item.id} className="border border-borde p-3 rounded-lg bg-[#111]">
              <p className="text-sm font-semibold text-texto">{item.nombreProducto}</p>
              <p className="text-[10px] text-mutado">Stock disponible {item.volumen ?? 0} {item.tipoUnidad}</p>
            </div>
          ))}
          {!resultados.length && <p className="text-xs text-mutado">No se encontraron piezas para esa busqueda</p>}
        </div>
      </div>
    </div>
  )
}
