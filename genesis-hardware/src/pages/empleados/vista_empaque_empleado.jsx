import { useMemo } from 'react'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { useInventarioLista } from '../../hooks/use_inventario_lista'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'
import { ListaPedidosEmpaque } from './lista_pedidos_empaque'

// aqui maestro yo reconstruyo el flujo de empaque real dentro del modulo de empleado
export function VistaEmpaqueEmpleado() {
    const { pedidos: recibidos } = usePedidosEstado(ESTADOS_PEDIDO.RECIBIDO)
    const { pedidos: enEmpaque } = usePedidosEstado(ESTADOS_PEDIDO.EN_EMPAQUE)
    const { pedidos: listosDespacho } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    const { inventario } = useInventarioLista()

    const inventarioPorId = useMemo(
        () => inventario.reduce((acc, item) => ({ ...acc, [item.id]: item.volumen ?? 0 }), {}),
        [inventario]
    )

    return (
        <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-texto mb-1">Flujo de empaque</h2>
                <p className="text-mutado text-xs tracking-wide uppercase">Recibido en empaque y listo para despacho</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <ListaPedidosEmpaque titulo="Recibido" pedidos={recibidos} inventarioPorId={inventarioPorId}
                    accion={(pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.EN_EMPAQUE)} textoAccion="Iniciar empaque" />
                <ListaPedidosEmpaque titulo="En empaque" pedidos={enEmpaque} inventarioPorId={inventarioPorId}
                    accion={(pedido) => actualizarEstadoPedido(pedido, ESTADOS_PEDIDO.LISTO_DESPACHO)} textoAccion="Marcar listo para despacho" />
                <ListaPedidosEmpaque titulo="Listo para despacho" pedidos={listosDespacho} inventarioPorId={inventarioPorId}
                    accion={null} textoAccion="Esperando liberacion en anden" />
            </div>
        </div>
    )
}
