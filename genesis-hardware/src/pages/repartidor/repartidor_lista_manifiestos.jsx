import { RepartidorTarjetaManifiesto } from './repartidor_tarjeta_manifiesto'

// aqui puse profe para listar todos los manifiestos generados con sus pedidos
export function RepartidorListaManifiestos({ manifiestos, pedidosEnReparto, alEntregar }) {
  const pedidosDe = (manifiesto) => pedidosEnReparto.filter((p) => p.manifiestoId === manifiesto.id)

  return (
    <div className="border border-borde bg-fondo p-4 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">Manifiestos de carga</p>
      {!manifiestos.length && <p className="text-xs text-mutado">Aun no hay manifiestos generados</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {manifiestos.map((m) => (
          <RepartidorTarjetaManifiesto key={m.id} manifiesto={m} pedidos={pedidosDe(m)} alEntregar={alEntregar} />
        ))}
      </div>
    </div>
  )
}
