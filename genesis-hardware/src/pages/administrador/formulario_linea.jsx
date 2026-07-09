import { useState } from 'react'

// aqui maestro yo armo el formulario con los cinco campos de una linea de producto
export function FormularioLinea({ seleccionada, alGuardar }) {
  const vacio = { titulo: '', descripcion: '', metrica: '', valor: '', etiqueta: '' }
  const [forma, setForma] = useState(() => seleccionada ? { ...seleccionada } : vacio)
  const cambiar = campo => e => setForma(prev => ({ ...prev, [campo]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); alGuardar(forma) }} className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">{seleccionada ? 'Editar linea' : 'Agregar linea'}</p>
      <input value={forma.titulo} onChange={cambiar('titulo')} placeholder="Titulo ej Tarjetas Graficas" required className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <textarea value={forma.descripcion} onChange={cambiar('descripcion')} placeholder="Descripcion" rows={2} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs resize-none" />
      <input value={forma.metrica} onChange={cambiar('metrica')} placeholder="Metrica ej Frecuencia Turbo" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input value={forma.valor} onChange={cambiar('valor')} placeholder="Valor ej 2.5 GHz+" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input value={forma.etiqueta} onChange={cambiar('etiqueta')} placeholder="Etiqueta ej GPU" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <button type="submit" className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo transition-colors">
        {seleccionada ? 'Actualizar linea' : 'Agregar linea'}
      </button>
    </form>
  )
}
