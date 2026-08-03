import { useMemo, useState } from 'react'
import { formatear_direccion } from '../../services/formato_direccion'

export function ListaRegistroPedidos({ registros }) {
  const [busqueda, set_busqueda] = useState('')
  const [pagina, set_pagina] = useState(1)
  const filtrados = useMemo(() => registros.filter((pedido) => {
    const texto = [pedido.id, pedido.estado, pedido.cliente?.nombre, pedido.cliente?.correo, pedido.direccionEntrega].join(' ').toLowerCase()
    return texto.includes(busqueda.toLowerCase())
  }), [registros, busqueda])
  const total_paginas = Math.max(1, Math.ceil(filtrados.length / 10))
  const pagina_actual = Math.min(pagina, total_paginas)
  const visibles = filtrados.slice((pagina_actual - 1) * 10, pagina_actual * 10)
  return <div className="flex flex-col gap-4">
    <input value={busqueda} onChange={(evento) => { set_busqueda(evento.target.value); set_pagina(1) }} placeholder="Buscar por pedido cliente estado o dirección" className="rounded border border-borde bg-fondo px-3 py-2 text-xs text-texto" />
    <div className="grid grid-cols-1 gap-3">
      {visibles.map((pedido) => <div key={pedido.id} className="rounded-lg border border-borde bg-[#111] p-4">
        <p className="text-sm font-semibold text-texto">{pedido.esAbastecimiento ? 'Abastecimiento' : 'Pedido'} {pedido.id}</p>
        <p className="text-[10px] text-mutado">Estado {pedido.estado}</p><p className="text-[10px] text-texto">Zona {pedido.zonaLogistica}</p>
        <p className="text-[10px] text-texto">Cliente {pedido.cliente?.nombre || pedido.clienteId || 'Desconocido'}</p><p className="text-[10px] text-mutado">Correo {pedido.cliente?.correo || 'No disponible'}</p>
        <p className="text-[10px] text-mutado">Direccion {formatear_direccion(pedido.direccionEntrega || pedido.cliente?.direccionVivienda) || 'No disponible'}</p>
      </div>)}
      {!visibles.length && <p className="text-xs text-mutado">No hay registros que coincidan</p>}
    </div>
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length: total_paginas }, (_, indice) => indice + 1).map((numero) => <button key={numero} onClick={() => set_pagina(numero)} className={`rounded border px-3 py-1 text-xs ${pagina_actual === numero ? 'border-primario bg-primario text-fondo' : 'border-borde text-texto'}`}>Vista {numero}</button>)}
    </div>
  </div>
}
