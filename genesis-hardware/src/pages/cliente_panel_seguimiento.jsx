import { ClienteListaPedidosSeguimiento } from './cliente_lista_pedidos_seguimiento'

// aqui puse profe para envolver la seccion de seguimiento del cliente
export function ClientePanelSeguimiento({ pedidos }) {
  return (
    <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 border-t border-borde bg-fondo p-4 md:p-6">
      <div><p className="text-[10px] font-bold uppercase tracking-widest text-primario">Actividad reciente</p><h2 className="mt-1 text-xl font-black text-texto">Seguimiento de mis pedidos</h2></div>
      <ClienteListaPedidosSeguimiento pedidos={pedidos} />
    </section>
  )
}
