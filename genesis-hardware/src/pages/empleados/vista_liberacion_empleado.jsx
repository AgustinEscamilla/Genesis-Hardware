import { useState } from 'react'
import { usePedidosEstado } from '../../hooks/use_pedidos_estado'
import { useRepartidores } from '../../hooks/use_repartidores'
import { ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'
import { liberarParaRepartidor } from '../../services/servicio_liberacion_pedidos'
import { TarjetaPedidoEmpaque } from './tarjeta_pedido_empaque'
import { SelectorRepartidor } from './selector_repartidor'

// esto sirve para que el empleado apruebe el paquete antes de pasarlo al repartidor
export function VistaLiberacionEmpleado() {
    const { pedidos, cargando, error } = usePedidosEstado(ESTADOS_PEDIDO.LISTO_DESPACHO)
    const { repartidores } = useRepartidores()
    const [asignados, set_asignados] = useState({})

    if (cargando) {
        return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando anden de salida</div>
    }
    const pendientes = pedidos.filter((p) => !p.liberadoParaRepartidor)
    const liberados = pedidos.filter((p) => p.liberadoParaRepartidor)

    return (
        <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-6">
            {error && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error}</div>}
            <div>
                <h2 className="text-xl font-bold mb-1">Anden de salida</h2>
                <p className="text-xs text-mutado">Libera los paquetes listos para que el repartidor arme su manifiesto</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-borde bg-panel p-4 flex flex-col gap-3 rounded-lg">
                    <p className="text-xs uppercase tracking-widest text-primario">Esperando aprobacion</p>
                    {!pendientes.length && <p className="text-xs text-mutado">No hay paquetes pendientes de liberar</p>}
                    {pendientes.map((p) => (
                        <div key={p.id} className="flex flex-col gap-2"><SelectorRepartidor repartidores={repartidores} valor={asignados[p.id] || ''} al_cambiar={(valor) => set_asignados((actual) => ({ ...actual, [p.id]: valor }))} /><TarjetaPedidoEmpaque pedido={p} accion={(pedido) => liberarParaRepartidor(pedido, asignados[p.id])} bloqueado={!asignados[p.id]} textoAccion="Liberar hacia repartidor" /></div>
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
