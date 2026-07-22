import { Link } from 'react-router-dom'
import { MapaClienteRastreo } from '../components/mapa_cliente_rastreo'

// aqui maestro yo dejo las etiquetas visibles para cada estado del pedido
const etiquetasPorEstado = {
  recibido: 'Recibido',
  pendiente_recoleccion: 'Pendiente de recoleccion',
  en_empaque: 'En empaque',
  listo_despacho: 'Listo para despacho',
  en_reparto: 'En reparto',
  entregado: 'Entregado'
}

// esto sirve para pintar la linea de tiempo de un pedido del cliente
export function ClienteTimelinePedido({ pedido }) {
  const historial = pedido.historialEstados || []

  return (
    <div className="border border-borde bg-panel p-3 flex flex-col gap-2">
      <p className="text-xs text-primario">Pedido {pedido.id.slice(0, 8)}</p>
      <div className="flex flex-col gap-2">
        {historial.map((paso, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${idx === historial.length - 1 ? 'bg-primario' : 'bg-borde'}`} />
            <p className="text-xs text-texto">{etiquetasPorEstado[paso.estado] || paso.estado}</p>
            <p className="text-[10px] text-mutado ml-auto">{new Date(paso.fecha).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {pedido.estado === 'en_reparto' && <MapaClienteRastreo pedido_id={pedido.id} />}
      {pedido.estado === 'entregado' && (
        <Link to={`/clientes/reclamos?pedido=${pedido.id}`} className="text-[10px] text-primario border border-primario rounded px-2 py-1 self-start hover:bg-primario hover:text-fondo transition-colors">
          Levantar reclamo
        </Link>
      )}
    </div>
  )
}
