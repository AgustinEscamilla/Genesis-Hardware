// aqui maestro yo documente este archivo para mantener trazabilidad
import { useState } from 'react'
import { createPortal } from 'react-dom'

export function AlertaStockAdmin({ alertas }) {
  const [abierto, setAbierto] = useState(false)
  const alertas_visibles = alertas.filter((item) => String(item.nombreProducto || item.nombre || item.productoNombre || '').trim().toLowerCase() !== 'ram')

  return (
    <>
      <button type="button" onClick={() => setAbierto(true)} className="relative border border-primario/60 bg-primario/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-primario transition-colors hover:bg-primario hover:text-fondo">
        Stock bajo
        {alertas_visibles.length > 0 && <span className="absolute -top-2 -right-2 bg-primario text-fondo text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{alertas_visibles.length}</span>}
      </button>
      {abierto && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setAbierto(false)}>
          <div onClick={(evento) => evento.stopPropagation()} className="flex max-h-[80vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-primario/50 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-borde bg-slate-950 px-5 py-4">
              <div><p className="text-lg font-black uppercase tracking-wide text-primario">Inventario requiere atención</p><p className="mt-1 text-xs text-mutado">{alertas_visibles.length} componentes con stock bajo</p></div>
              <button type="button" onClick={() => setAbierto(false)} className="rounded-lg border border-borde px-3 py-2 text-xs font-bold text-mutado hover:border-primario hover:text-texto">Cerrar</button>
            </div>
            <div className="space-y-3 overflow-y-auto p-5"><p className="text-sm text-mutado">Revisa estos componentes y programa un reabastecimiento</p>{!alertas_visibles.length && <p className="rounded-xl border border-dashed border-borde p-5 text-center text-sm text-mutado">No hay componentes pendientes de revisión</p>}{alertas_visibles.map(a => <p key={a.id} className="rounded-xl border border-primario/30 bg-primario/10 p-4 text-sm text-texto"><span className="font-bold">{a.nombreProducto || a.nombre || a.productoNombre || 'Componente'}</span><span className="block mt-1 text-xs text-terciario">Tipo {obtener_categoria(a)}</span><span className="block mt-1 text-xs text-mutado">Disponibles {a.volumen} de mínimo {a.stockMinimo}</span></p>)}</div>
          </div>
        </div>, document.body
      )}
    </>
  )
}

const obtener_categoria = (item) => {
  if (item.categoria) return item.categoria
  const nombre = String(item.nombreProducto || item.nombre || '').toLowerCase()
  if (nombre.includes('ram') || nombre.includes('ddr')) return 'Memoria RAM'
  if (nombre.includes('ryzen') || nombre.includes('core')) return 'Procesadores'
  if (nombre.includes('rtx') || nombre.includes('radeon')) return 'Tarjetas de video'
  return 'Componente de hardware'
}
