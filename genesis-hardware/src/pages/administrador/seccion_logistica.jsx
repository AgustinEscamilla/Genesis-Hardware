import { TablaGenerica } from '../../components/pedidos/tabla_generica'
import { useTodosPedidos } from '../../hooks/use_todos_pedidos'
import { ESTADOS_PEDIDO } from '../../services/servicio_flujo_pedidos'

// aqui maestro yo hice esta seccion para ver los envios de la empresa de paqueteria externa
export function SeccionLogistica() {
  const { pedidos } = useTodosPedidos()
  const envios = pedidos.filter((pedido) => [ESTADOS_PEDIDO.LISTO_DESPACHO, ESTADOS_PEDIDO.EN_REPARTO].includes(pedido.estado))
  const titulos = ['Destino', 'Estatus', 'Actualizado']

  // esto sirve para pasar los datos de logistica al componente hijo
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-texto">Monitoreo de Envíos</h3>
      <TablaGenerica encabezados={titulos} mensajeVacio="No hay envios activos">
        {envios.map((envio) => (
          <tr key={envio.id} className="border-b border-borde/50">
            <td className="py-3 px-4 text-texto">{envio.direccionEntrega || 'Sin direccion'}</td>
            <td className="py-3 px-4 text-mutado">{envio.estado}</td>
            <td className="py-3 px-4 text-mutado">{envio.fechaEstado ? new Date(envio.fechaEstado).toLocaleString('es-MX') : 'Sin fecha'}</td>
          </tr>
        ))}
      </TablaGenerica>
    </div>
  )
}
