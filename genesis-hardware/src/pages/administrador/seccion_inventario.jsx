import { useMemo, useState } from 'react'
import { TablaGenerica } from '../../components/pedidos/tabla_generica'
import { useCatalogo } from '../../hooks/use_catalogo'

// aqui puse profe la vista para que yo controle el inventario de las piezas de computadora
export function SeccionInventario() {
  const { productos: lista, cargando } = useCatalogo()
  const [busqueda, set_busqueda] = useState('')
  const [categoria, set_categoria] = useState('Todas')
  const categorias = useMemo(() => ['Todas', ...new Set(lista.map((item) => item.categoria).filter(Boolean))], [lista])
  const productos_filtrados = useMemo(() => lista.filter((item) => String(item.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) && (categoria === 'Todas' || item.categoria === categoria)), [lista, busqueda, categoria])
  const titulos = ['Componente', 'Cantidad en Stock']

  // pos esto funciona mandando la lista a la tabla generica para no repetir codigo
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Inventario de Componentes</h3>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]"><input value={busqueda} onChange={(e) => set_busqueda(e.target.value)} placeholder="Buscar componente por nombre" className="w-full rounded-lg border border-borde bg-fondo px-3 py-2 text-sm text-texto outline-none focus:border-primario" /><select value={categoria} onChange={(e) => set_categoria(e.target.value)} className="w-full rounded-lg border border-borde bg-fondo px-3 py-2 text-sm text-texto outline-none focus:border-primario">{categorias.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      <TablaGenerica encabezados={titulos} contenedor_clase="max-h-[32rem] overflow-y-auto" mensajeVacio={cargando ? 'Cargando inventario' : 'No hay componentes con esa búsqueda'}>
        {productos_filtrados.map((item) => <tr key={item.id} className="border-b border-borde/50"><td className="py-3 px-4 text-texto">{item.nombre}</td><td className="py-3 px-4 text-mutado">{Number(item.stockVisible ?? item.stock ?? 0)} unidades</td></tr>)}
      </TablaGenerica>
    </div>
  )
}
