import { useCatalogoPublico } from '../../hooks/use_catalogo_publico'

// aqui maestro yo muestro el inventario actual para el empleado
export function VistaInventarioEmpleado() {
  const { productos, cargando } = useCatalogoPublico()

  if (cargando) return <div className="flex min-h-40 items-center justify-center bg-fondo text-xs text-mutado">Cargando inventario</div>

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Inventario actual</h2><span className="text-[10px] uppercase tracking-widest text-terciario">Actualización en vivo</span></div>
        <div className="grid grid-cols-1 gap-3">
          {productos.map((item) => (
            <div key={item.id} className="border border-borde rounded-lg p-4 bg-[#111]">
              <p className="text-sm font-semibold text-texto">{item.nombre}</p>
              <p className="text-[10px] text-terciario">Stock disponible {Number(item.stockVisible || 0)} piezas</p>
              <p className="text-[10px] text-mutado">SKU {item.sku_distribuidor || item.id}</p>
            </div>
          ))}
          {!productos.length && <p className="text-xs text-mutado">El inventario esta vacio</p>}
        </div>
      </div>
    </div>
  )
}
