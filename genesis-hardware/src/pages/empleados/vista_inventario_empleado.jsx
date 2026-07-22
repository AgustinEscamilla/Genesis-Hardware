import { useInventarioLista } from '../../hooks/use_inventario_lista'

// aqui maestro yo muestro el inventario actual para el empleado
export function VistaInventarioEmpleado() {
  const { inventario } = useInventarioLista()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Inventario actual</h2>
        <div className="grid grid-cols-1 gap-3">
          {inventario.map((item) => (
            <div key={item.id} className="border border-borde rounded-lg p-4 bg-[#111]">
              <p className="text-sm font-semibold text-texto">{item.nombreProducto}</p>
              <p className="text-[10px] text-mutado">{item.volumen ?? 0} {item.tipoUnidad}</p>
              <p className="text-[10px] text-mutado">Registrado {String(item.fechaIngreso || 'sin fecha')}</p>
            </div>
          ))}
          {!inventario.length && <p className="text-xs text-mutado">El inventario esta vacio</p>}
        </div>
      </div>
    </div>
  )
}
