import { usePedidosClientes } from '../../hooks/use_pedidos_clientes'

// aqui maestro yo muestro los pedidos con informacion del cliente para gestion
export function VistaGestionPedidosEmpleado() {
  const { pedidosConCliente } = usePedidosClientes()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="bg-panel border border-borde p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Gestion de pedidos</h2>
        <div className="grid grid-cols-1 gap-3">
          {pedidosConCliente.map((pedido) => (
            <div key={pedido.id} className="border border-borde rounded-lg p-4 bg-[#111]">
              <p className="text-sm font-semibold text-texto">Pedido {pedido.id}</p>
              <p className="text-[10px] text-mutado">Estado {pedido.estado}</p>
              <p className="text-[10px] text-texto">Zona {pedido.zonaLogistica}</p>
              <p className="text-[10px] text-texto">Cliente {pedido.cliente?.nombre || pedido.clienteId || 'Desconocido'}</p>
              <p className="text-[10px] text-mutado">Correo {pedido.cliente?.correo || 'No disponible'}</p>
              {pedido.cliente?.direccionVivienda && <p className="text-[10px] text-mutado">Direccion {pedido.cliente.direccionVivienda}</p>}
            </div>
          ))}
          {!pedidosConCliente.length && <p className="text-xs text-mutado">No hay pedidos registrados aun</p>}
        </div>
      </div>
    </div>
  )
}
