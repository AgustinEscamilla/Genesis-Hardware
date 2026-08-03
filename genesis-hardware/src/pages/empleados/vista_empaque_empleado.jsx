import { useMemo } from 'react'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { useInventarioLista } from '../../hooks/use_inventario_lista'
import { useOperacionesDistribuidor } from '../../hooks/use_operaciones_distribuidor'
import { actualizarEstadoPedido, ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'
import { actualizarOperacionDistribuidor, convertirOperacionEnPedido } from '../../services/servicio_operaciones_distribuidor'
import { ListaPedidosEmpaque } from './lista_pedidos_empaque'

const convertir_abastecimiento = (operacion) => ({ ...operacion, esAbastecimiento: true, direccionEntrega: operacion.direccion, carrito: (operacion.items || []).map((item) => ({ id: item.sku_distribuidor, nombre: item.nombre_producto || item.nombre || item.sku_distribuidor, cantidad: item.cantidad })) })
const avanzar_pedido = (pedido, estado) => pedido.esAbastecimiento ? (pedido.estado === 'recibido' ? actualizarOperacionDistribuidor(pedido.id, 'en_empaque') : convertirOperacionEnPedido(pedido)) : actualizarEstadoPedido(pedido, estado)

// aqui maestro yo reconstruyo el flujo de empaque real dentro del modulo de empleado
export function VistaEmpaqueEmpleado() {
    const { pedidos: recibidos, cargando: cargando_recibidos, error: error_recibidos } = usePedidosEstado(ESTADOS_PEDIDO.RECIBIDO)
    const { pedidos: enEmpaque, cargando: cargando_empaque, error: error_empaque } = usePedidosEstado(ESTADOS_PEDIDO.EN_EMPAQUE)
    const { pedidos: listosDespacho, cargando: cargando_listos, error: error_listos } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    const { operaciones, cargando: cargando_operaciones } = useOperacionesDistribuidor()
    const { inventario, cargando: cargando_inventario, error: error_inventario } = useInventarioLista()

    const inventarioPorId = useMemo(
        () => inventario.reduce((acc, item) => ({ ...acc, [item.id]: item.volumen ?? 0 }), {}),
        [inventario]
    )
    const recibidos_abastecimiento = operaciones.filter((operacion) => operacion.estado === 'recibido').map(convertir_abastecimiento)
    const empaque_abastecimiento = operaciones.filter((operacion) => operacion.estado === 'en_empaque').map(convertir_abastecimiento)
    const recibidos_totales = [...recibidos, ...recibidos_abastecimiento]
    const empaque_total = [...enEmpaque, ...empaque_abastecimiento]

    if (cargando_recibidos || cargando_empaque || cargando_listos || cargando_inventario || cargando_operaciones) {
        return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando flujo de empaque</div>
    }

    return (
        <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-6">
            {(error_recibidos || error_empaque || error_listos || error_inventario) && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error_recibidos || error_empaque || error_listos || error_inventario}</div>}
            <div>
                <h2 className="text-2xl font-bold text-texto mb-1">Flujo de empaque</h2>
                <p className="text-mutado text-xs tracking-wide uppercase">Recibido en empaque y listo para despacho</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <ListaPedidosEmpaque titulo="Recibido" pedidos={recibidos_totales} inventarioPorId={inventarioPorId}
                    accion={(pedido) => avanzar_pedido(pedido, ESTADOS_PEDIDO.EN_EMPAQUE)} textoAccion="Iniciar empaque" />
                <ListaPedidosEmpaque titulo="En empaque" pedidos={empaque_total} inventarioPorId={inventarioPorId}
                    accion={(pedido) => avanzar_pedido(pedido, ESTADOS_PEDIDO.LISTO_DESPACHO)} textoAccion="Marcar listo para despacho" />
                <ListaPedidosEmpaque titulo="Listo para despacho" pedidos={listosDespacho} inventarioPorId={inventarioPorId}
                    accion={null} textoAccion="Esperando liberacion en anden" />
            </div>
        </div>
    )
}
