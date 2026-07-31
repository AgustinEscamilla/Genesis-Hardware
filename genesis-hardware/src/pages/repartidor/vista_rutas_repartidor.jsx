import { useNavigate } from 'react-router-dom'
import { usePaquetesAnden } from '../../hooks/use_paquetes_anden'
import { useOptimizacionRutas } from '../../hooks/use_optimizacion_rutas'
import { useRutaGoogleMaps } from '../../hooks/use_ruta_google_maps'
import { useAutenticacion } from '../../hooks/use_autenticacion'
import { iniciarRutaRepartidor } from '../../services/servicio_flujo_repartidor'
import { ListaParadasRuta } from './lista_paradas_ruta'
import { MapaEntregasRepartidor } from '../../components/mapa_entregas_repartidor'

// esto sirve para que el repartidor vea su ruta optimizada en el mapa y la comience
export function VistaRutasRepartidor() {
    const { pedidosLiberados, cargando, error } = usePaquetesAnden()
    const { paradas } = useOptimizacionRutas(pedidosLiberados)
    const { usuarioActual } = useAutenticacion()
    const navegar = useNavigate()
    const tiene_direcciones = paradas.length > 0 && paradas.every((parada) => parada.direccion)
    const { mapa_ref, cargando: cargandoMapa, error: errorMapa, resumen, paradas_ordenadas } = useRutaGoogleMaps(paradas)

    if (cargando) {
        return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando ruta de reparto</div>
    }

    const comenzarRuta = async () => {
        await iniciarRutaRepartidor(paradas_ordenadas, usuarioActual?.uid || null)
        navegar('/repartidores/mapa', { state: { pedido: paradas_ordenadas[0]?.pedido } })
    }

    return (
        <div className="flex flex-col gap-4">
            {error && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error}</div>}
            <div className="bg-panel border border-borde p-6 rounded-lg flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-bold mb-1">Ruta optimizada de entrega</h2>
                    <p className="text-xs text-mutado">Pedidos liberados por el almacen ordenados de la parada mas cercana a la mas lejana</p>
                </div>
                <MapaEntregasRepartidor paradas={paradas} tiene_direcciones={tiene_direcciones} mapa_ref={mapa_ref} cargando={cargandoMapa} error={errorMapa} resumen={resumen} />
                <ListaParadasRuta paradas={paradas_ordenadas} />
                {!!paradas.length && (
                    <button onClick={comenzarRuta} className="text-xs border border-primario bg-primario/10 text-primario px-4 py-2 rounded hover:bg-primario hover:text-fondo transition-colors self-start font-semibold uppercase tracking-wide">
                        Comenzar Ruta Asignada
                    </button>
                )}
            </div>
        </div>
    )
}
