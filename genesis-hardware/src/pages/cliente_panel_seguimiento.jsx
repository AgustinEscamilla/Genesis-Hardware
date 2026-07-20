import { ClienteListaPedidosSeguimiento } from './cliente_lista_pedidos_seguimiento'

// aqui puse profe para envolver la seccion de seguimiento del cliente
export function ClientePanelSeguimiento({ pedidos }) {
  return (
    <section className="border-t border-borde bg-fondo p-4 flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">Seguimiento de mis pedidos</p>
      <ClienteListaPedidosSeguimiento pedidos={pedidos} />
    </section>
  )
}
