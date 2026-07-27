import { Link } from 'react-router-dom'
import { useInventarioLista } from '../../hooks/use_inventario_lista'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'

// aqui maestro yo muestro el dashboard inicial del empleado con resumen rapido
export function VistaPrincipalEmpleado() {
  const { inventario, cargando: cargando_inventario, error: error_inventario } = useInventarioLista()
  const { pedidos, cargando: cargando_pedidos, error: error_pedidos } = usePedidosEstado(ESTADOS_PEDIDO.EN_EMPAQUE)

  if (cargando_inventario || cargando_pedidos) {
    return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando panel de empleado</div>
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-6 bg-fondo text-texto">
      {(error_inventario || error_pedidos) && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error_inventario || error_pedidos}</div>}
      <div className="border border-borde bg-panel p-6 shadow-sm">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Operacion de bodega</p>
        <h2 className="text-3xl font-black text-texto">Turno de hoy</h2>
        <p className="mt-2 max-w-2xl text-sm text-mutado">Consulta las tareas prioritarias y mueve cada pedido a la siguiente etapa</p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="border border-borde bg-fondo p-4"><p className="text-xs uppercase text-mutado">Inventario registrado</p><p className="mt-2 text-3xl font-black">{inventario.length}</p></div>
          <div className="border border-borde bg-fondo p-4"><p className="text-xs uppercase text-mutado">Pedidos en empaque</p><p className="mt-2 text-3xl font-black">{pedidos.length}</p></div>
          <div className="border border-borde bg-fondo p-4"><p className="text-xs uppercase text-mutado">Prioridad</p><p className="mt-2 text-lg font-black text-terciario">Mantener flujo</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link to="recepcion" className="border border-borde bg-panel p-4 transition-colors hover:border-primario"><p className="text-xs font-bold uppercase tracking-widest text-primario">01</p><p className="mt-2 text-sm font-bold">Recibir mercancia</p><p className="mt-1 text-xs text-mutado">Registrar entradas al inventario</p></Link>
        <Link to="empaque" className="border border-borde bg-panel p-4 transition-colors hover:border-primario"><p className="text-xs font-bold uppercase tracking-widest text-primario">02</p><p className="mt-2 text-sm font-bold">Preparar pedidos</p><p className="mt-1 text-xs text-mutado">Revisar y empacar solicitudes</p></Link>
        <Link to="anden-salida" className="border border-borde bg-panel p-4 transition-colors hover:border-primario"><p className="text-xs font-bold uppercase tracking-widest text-primario">03</p><p className="mt-2 text-sm font-bold">Liberar paquetes</p><p className="mt-1 text-xs text-mutado">Entregar al flujo de reparto</p></Link>
      </div>
    </div>
  )
}
