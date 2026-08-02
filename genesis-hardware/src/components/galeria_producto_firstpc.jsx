import { useState } from 'react'

export function GaleriaProductoFirstpc({ producto }) {
  const imagenes = [producto.imagen].filter(Boolean)
  const [activa, set_activa] = useState(imagenes[0] || '')
  return <div className="rounded-xl border border-borde bg-panel p-3"><div className="flex h-[25rem] items-center justify-center rounded-lg bg-fondo p-8">{activa ? <img src={activa} alt={producto.nombre} className="h-full w-full object-contain" /> : <span className="text-6xl text-mutado">▣</span>}</div><div className="mt-3 flex gap-2">{imagenes.map((imagen) => <button key={imagen} onClick={() => set_activa(imagen)} className="h-14 w-14 rounded-lg border-2 border-primario bg-fondo p-1"><img src={imagen} alt="Vista miniatura" className="h-full w-full object-contain" /></button>)}</div></div>
}
