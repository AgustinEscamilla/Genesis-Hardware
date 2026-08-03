import { useState } from 'react'
import { formatear_direccion } from '../services/formato_direccion'

// esto sirve para reutilizar la misma tarjeta de pedido entre empleado y repartidor
export function TarjetaPedido({ pedido, acciones = [] }) {
  const [procesando, set_procesando] = useState(false)
  const [error, set_error] = useState('')
  const ejecutar = async (accion) => {
    set_procesando(true)
    set_error('')
    try { await accion.alClick() } catch { set_error('No se pudo actualizar el pedido') } finally { set_procesando(false) }
  }
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-100">{pedido.esAbastecimiento ? 'Abastecimiento' : 'Pedido'} {pedido.id.slice(0, 8)}</p>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-400">{pedido.estado}</span>
      </div>
      <div className="flex flex-col gap-1">
        {(pedido.carrito || []).map((item, indice) => (
          <p key={indice} className="text-xs text-slate-300">{item.nombre} x {item.cantidad}</p>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-slate-800 pt-2 text-[11px] text-slate-400">
        <p>Zona {pedido.zonaLogistica || 'sin zona'}</p>
        <p>Direccion {formatear_direccion(pedido.direccionEntrega) || 'sin direccion registrada'}</p>
        <p>Codigo postal {pedido.codigoPostalEntrega || 'sin codigo postal'}</p>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {acciones.map((accion) => (
          <button
            key={accion.texto}
            type="button"
            disabled={procesando}
            onClick={() => ejecutar(accion)}
            className="rounded border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-white"
          >
            {accion.texto}
          </button>
        ))}
        {error && <p role="alert" className="w-full text-[10px] text-red-400">{error}</p>}
        {!acciones.length && <p className="text-[10px] text-slate-500">Sin acciones disponibles</p>}
      </div>
    </div>
  )
}
