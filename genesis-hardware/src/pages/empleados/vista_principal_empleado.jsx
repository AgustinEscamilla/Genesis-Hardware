import { useInventarioLista } from '../../hooks/use_inventario_lista'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'

// aqui maestro yo muestro el dashboard inicial del empleado con resumen rapido
export function VistaPrincipalEmpleado() {
  const { inventario } = useInventarioLista()
  const { pedidos } = usePedidosEstado('en_empaque')

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-texto mb-2">Panel empleado</h2>
        <p className="text-xs text-mutado mb-4">Bienvenido al centro de operaciones de bodega</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Inventario total</p>
            <p className="text-3xl font-bold">{inventario.length}</p>
          </div>
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Pedidos en empaque</p>
            <p className="text-3xl font-bold">{pedidos.length}</p>
          </div>
          <div className="border border-borde p-4 rounded-lg">
            <p className="text-xs uppercase text-mutado">Objetivo</p>
            <p className="text-3xl font-bold">Mantener flujo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
