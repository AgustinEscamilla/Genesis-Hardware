import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorListaManifiestos } from './repartidor_lista_manifiestos'

// esto sirve para organizar la mejor ruta de entrega segun los manifiestos activos
export function VistaComenzarRutaRepartidor() {
  const { manifiestos, pedidosEnReparto, entregar, cargando, error } = useManifiestos()

  const paradas = useMemo(() => {
    return manifiestos
      .filter((m) => m.estado === 'en_reparto')
      .map((m, index) => {
        const pedidosDeParada = pedidosEnReparto.filter((p) => p.manifiestoId === m.id)
        return { orden: index + 1, zona: m.zona, pedidos: pedidosDeParada.length, primerPedido: pedidosDeParada[0] || null }
      })
  }, [manifiestos, pedidosEnReparto])

  if (cargando) return <div className="flex min-h-40 items-center justify-center text-xs text-mutado">Cargando ruta de entrega</div>

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="border border-primario bg-panel p-4 text-xs text-primario">{error}</div>}
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Ruta de entrega sugerida</h2>
        <div className="flex flex-col gap-3">
          {paradas.map((parada) => (
            <div key={parada.orden} className="flex items-center gap-3 border border-borde rounded-lg p-4 bg-fondo hover:border-terciario transition-colors">
              <span className="w-8 h-8 shrink-0 rounded-full bg-terciario/10 border border-terciario text-terciario text-sm font-bold flex items-center justify-center">{parada.orden}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-texto uppercase">Zona {parada.zona}</p>
                <p className="text-[10px] text-mutado">{parada.pedidos} pedidos en esta parada</p>
              </div>
              {parada.primerPedido && (
                <Link to="/repartidores/mapa" state={{ pedido: parada.primerPedido }} className="text-[10px] text-primario border border-primario rounded px-2 py-1 hover:bg-primario hover:text-fondo transition-colors">
                  Ver mapa
                </Link>
              )}
            </div>
          ))}
          {!paradas.length && <p className="text-xs text-mutado">No hay manifiestos en camino todavia</p>}
        </div>
      </div>
      <RepartidorListaManifiestos manifiestos={manifiestos} pedidosEnReparto={pedidosEnReparto} alEntregar={entregar} />
    </div>
  )
}
