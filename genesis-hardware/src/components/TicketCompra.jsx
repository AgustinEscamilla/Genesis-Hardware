import { formatear_precio } from '../services/formato_moneda'

export function TicketCompra({ pedido, descargar_ticket, enviar_ticket_correo }) {
  const articulos = pedido?.items || pedido?.carrito || []
  const fecha = pedido?.fecha ? new Date(pedido.fecha).toLocaleString('es-MX') : 'Fecha no disponible'
  const orden_id = pedido?.id || pedido?.folio || 'Sin referencia'

  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-xl">
      <header className="flex flex-col items-center gap-2 border-b border-dashed border-slate-700 pb-5 text-center">
        <img src="/logo_genesis.png" alt="Logo Genesis Hardware" className="h-14 w-14 object-contain" />
        <h2 className="text-lg font-black tracking-[0.25em] text-cyan-400">GENESIS HARDWARE</h2>
        <p className="text-xs text-slate-400">{fecha}</p>
        <p className="text-xs text-slate-400">Orden {orden_id}</p>
      </header>
      <div className="space-y-3 py-5">
        {articulos.map((articulo, indice) => {
          const cantidad = Number(articulo.cantidad || 0)
          const precio = Number(articulo.precio || 0) * cantidad
          return <div key={articulo.id || indice} className="flex justify-between gap-4 text-sm"><span>{articulo.nombre || 'Articulo'} x{cantidad}</span><span>{formatear_precio(precio)}</span></div>
        })}
      </div>
      <div className="flex justify-between border-t border-dashed border-slate-700 pt-4 text-lg font-black text-cyan-400"><span>Total</span><span>{formatear_precio(pedido?.total || 0)}</span></div>
      <p className="py-5 text-center text-xs text-slate-400">Gracias por tu compra Conserva este ticket digital para validar tu garantía</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => descargar_ticket(pedido)} className="rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400">Descargar Ticket</button>
        <button type="button" onClick={() => enviar_ticket_correo(pedido)} className="rounded-lg border border-cyan-400 px-4 py-3 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950">Enviar por Correo</button>
      </div>
    </section>
  )
}
