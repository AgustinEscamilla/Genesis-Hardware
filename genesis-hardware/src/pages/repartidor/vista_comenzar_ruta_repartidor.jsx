import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useManifiestos } from '../../hooks/use_manifiestos'
import { RepartidorListaManifiestos } from './repartidor_lista_manifiestos'

// esto sirve para organizar la mejor ruta de entrega segun los manifiestos activos
export function VistaComenzarRutaRepartidor() {
  const { manifiestos, pedidosEnReparto, entregar } = useManifiestos()

  const paradas = useMemo(() => {
    return manifiestos
      .filter((m) => m.estado === 'en_reparto')
      .map((m, index) => {
        const pedidosDeParada = pedidosEnReparto.filter((p) => p.manifiestoId === m.id)
        return { orden: index + 1, zona: m.zona, pedidos: pedidosDeParada.length, primerPedido: pedidosDeParada[0] || null }
      })
  }, [manifiestos, pedidosEnReparto])

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto flex flex-col gap-4">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Ruta de entrega sugerida</h2>
        <div className="grid grid-cols-1 gap-3">
          {paradas.map((parada) => (
            <div key={parada.orden} className="border border-borde p-4 rounded-lg bg-[#111]">
              <p className="text-sm font-semibold text-texto">Parada {parada.orden}</p>
              <p className="text-[10px] text-texto">Zona {parada.zona}</p>
              <p className="text-[10px] text-mutado">Pedidos {parada.pedidos}</p>
              {parada.primerPedido && (
                <Link to="/repartidores/mapa" state={{ pedido: parada.primerPedido }} className="text-[10px] text-primario underline">
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
