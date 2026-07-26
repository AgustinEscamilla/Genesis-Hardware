import { useNavigate } from 'react-router-dom'
import { usePaquetesAnden } from '../../hooks/use_paquetes_anden'
import { useOptimizacionRutas } from '../../hooks/use_optimizacion_rutas'
import { useAutenticacion } from '../../hooks/use_autenticacion'
import { iniciarRutaRepartidor } from '../../services/servicio_flujo_repartidor'
import { ListaParadasRuta } from './lista_paradas_ruta'
import { MapaEntregasRepartidor } from '../../components/mapa_entregas_repartidor'

// esto sirve para que el repartidor vea su ruta optimizada en el mapa y la comience
export function VistaRutasRepartidor() {
    const { pedidosLiberados } = usePaquetesAnden()
    const { paradas } = useOptimizacionRutas(pedidosLiberados)
    const { usuarioActual } = useAutenticacion()
    const navegar = useNavigate()

    const comenzarRuta = async () => {
        await iniciarRutaRepartidor(paradas, usuarioActual?.uid || null)
        navegar('/repartidores/mapa', { state: { pedido: paradas[0]?.pedido } })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-panel border border-borde p-6 rounded-lg flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-bold mb-1">Ruta optimizada de entrega</h2>
                    <p className="text-xs text-mutado">Pedidos liberados por el almacen ordenados de la parada mas cercana a la mas lejana</p>
                </div>
                <MapaEntregasRepartidor paradas={paradas} />
                <ListaParadasRuta paradas={paradas} />
                {!!paradas.length && (
                    <button onClick={comenzarRuta} className="text-xs border border-primario bg-primario/10 text-primario px-4 py-2 rounded hover:bg-primario hover:text-fondo transition-colors self-start font-semibold uppercase tracking-wide">
                        Comenzar Ruta Asignada
                    </button>
                )}
            </div>
        </div>
    )
}
