import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'
import { liberarParaRepartidor } from '../../services/servicio_liberacion_pedidos'
import { TarjetaPedidoEmpaque } from './tarjeta_pedido_empaque'

// esto sirve para que el empleado apruebe el paquete antes de pasarlo al repartidor
export function VistaLiberacionEmpleado() {
    const { pedidos } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    const pendientes = pedidos.filter((p) => !p.liberadoParaRepartidor)
    const liberados = pedidos.filter((p) => p.liberadoParaRepartidor)

    return (
        <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold mb-1">Anden de salida</h2>
                <p className="text-xs text-mutado">Libera los paquetes listos para que el repartidor arme su manifiesto</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-borde bg-panel p-4 flex flex-col gap-3 rounded-lg">
                    <p className="text-xs uppercase tracking-widest text-primario">Esperando aprobacion</p>
                    {!pendientes.length && <p className="text-xs text-mutado">No hay paquetes pendientes de liberar</p>}
                    {pendientes.map((p) => (
                        <TarjetaPedidoEmpaque key={p.id} pedido={p} accion={liberarParaRepartidor} textoAccion="Liberar hacia repartidor" />
                    ))}
                </div>
                <div className="border border-borde bg-panel p-4 flex flex-col gap-3 rounded-lg">
                    <p className="text-xs uppercase tracking-widest text-primario">Liberados al repartidor</p>
                    {!liberados.length && <p className="text-xs text-mutado">Aun no liberas ningun paquete</p>}
                    {liberados.map((p) => (
                        <TarjetaPedidoEmpaque key={p.id} pedido={p} accion={null} textoAccion="Esperando recoleccion" />
                    ))}
                </div>
            </div>
        </div>
    )
}
