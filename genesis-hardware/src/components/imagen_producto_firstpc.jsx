import { useState } from 'react'
import { obtener_marca_producto } from '../services/constantes_firstpc'

export function ImagenProductoFirstpc({ producto, className = 'h-full w-full object-contain' }) {
  const [disponible, set_disponible] = useState(Boolean(producto.imagen))
  if (!disponible) return <div className="grid h-full w-full place-items-center bg-slate-950"><span className="text-4xl font-black uppercase tracking-tight text-primario">{obtener_marca_producto(producto)}</span></div>
  return <img src={producto.imagen} alt={producto.nombre} className={className} onError={() => set_disponible(false)} />
}
