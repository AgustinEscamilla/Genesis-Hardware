import { formatear_precio } from '../../services/formato_moneda'

export function TicketCompra({ pedido, descargar_ticket }) {
  const articulos = pedido?.items || pedido?.carrito || []
  const fecha_compra = pedido?.fecha?.toDate ? pedido.fecha.toDate() : (pedido?.fecha ? new Date(pedido.fecha) : null)
  const fecha = fecha_compra ? fecha_compra.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : 'Fecha no disponible'
  const orden_id = pedido?.id || pedido?.folio || 'Sin referencia'
  const subtotal = articulos.reduce((acumulado, articulo) => acumulado + Number(articulo.precio || 0) * Number(articulo.cantidad || 0), 0)

  return (
    <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-fuchsia-400/30 bg-[#171a22] text-slate-100 shadow-2xl shadow-fuchsia-950/30">
      <header className="relative border-b border-slate-600/70 px-5 pb-5 pt-6 text-center sm:px-8">
        <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full border-2 border-fuchsia-300 text-2xl font-black text-fuchsia-200">G</div>
        <p className="text-[10px] font-semibold tracking-[0.3em] text-slate-400">GENESIS HARDWARE</p>
        <h2 className="mt-3 text-2xl font-black tracking-wide text-fuchsia-300">NOTA DE COMPRA</h2>
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-left text-xs text-slate-300">
          <span>Folio: <strong className="text-slate-100">{orden_id}</strong></span>
          <span>Fecha: <strong className="text-slate-100">{fecha}</strong></span>
        </div>
      </header>
      <div className="px-4 py-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_6.5rem_6.5rem] gap-2 border-b border-slate-500/70 pb-2 text-[10px] font-bold uppercase tracking-wide text-cyan-300 sm:grid-cols-[minmax(0,1fr)_5.5rem_7.5rem_7.5rem]">
          <span>Descripción</span><span className="text-right">Cantidad</span><span className="text-right">P. unitario</span><span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-slate-700/80">
        {articulos.map((articulo, indice) => {
          const cantidad = Number(articulo.cantidad || 0)
          const unitario = Number(articulo.precio || 0)
          const total_articulo = unitario * cantidad
          return <div key={articulo.id || indice} className="grid grid-cols-[minmax(0,1fr)_4.5rem_6.5rem_6.5rem] gap-2 py-3 text-xs text-slate-200 sm:grid-cols-[minmax(0,1fr)_5.5rem_7.5rem_7.5rem]"><span className="break-words">{articulo.nombre || 'Articulo'}</span><span className="text-right">{cantidad}</span><span className="text-right">{formatear_precio(unitario)}</span><span className="text-right font-bold text-fuchsia-300">{formatear_precio(total_articulo)}</span></div>
        })}
        </div>
      </div>
      <div className="ml-auto w-full max-w-sm border-t border-slate-500/70 px-5 py-4 text-right text-sm sm:px-8">
        <p className="flex justify-between text-slate-300"><span>Subtotal:</span><span>{formatear_precio(subtotal)}</span></p>
        <p className="mt-2 flex justify-between text-lg font-black text-cyan-300"><span>Total general:</span><span>{formatear_precio(pedido?.total || subtotal)}</span></p>
      </div>
      <p className="px-5 pb-5 text-center text-lg font-black tracking-wide text-slate-200 sm:px-8">GRACIAS POR SU COMPRA</p>
      <div className="border-t border-slate-600/70 bg-slate-950/30 px-5 py-4 sm:px-8">
        <button type="button" onClick={() => descargar_ticket(pedido)} className="rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400">Descargar Ticket</button>
      </div>
    </section>
  )
}
