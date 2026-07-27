import { useState } from 'react'

// aqui maestro yo armo el formulario para publicar noticias
export function FormularioNoticia({ seleccionada, alGuardar, guardando, mensaje }) {
  const vacio = { titulo: '', descripcion: '', etiqueta: 'Actualizacion', valor: 'Publicado' }
  const [forma, setForma] = useState(() => seleccionada ? { ...seleccionada } : vacio)
  const cambiar = campo => e => setForma(prev => ({ ...prev, [campo]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); alGuardar(forma) }} className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">{seleccionada ? 'Editar noticia' : 'Publicar noticia'}</p>
      <input value={forma.titulo} onChange={cambiar('titulo')} placeholder="Titulo de la noticia" required className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <textarea value={forma.descripcion} onChange={cambiar('descripcion')} placeholder="Descripcion y detalle de la noticia" rows={4} required className="bg-fondo border border-borde text-texto px-3 py-2 text-xs resize-none" />
      <input value={forma.etiqueta} onChange={cambiar('etiqueta')} placeholder="Tipo ej Aviso o Promocion" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input value={forma.valor} onChange={cambiar('valor')} placeholder="Estado ej Publicado" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
      <button type="submit" disabled={guardando} className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">
        {guardando ? 'Guardando noticia...' : seleccionada ? 'Actualizar noticia' : 'Publicar noticia'}
      </button>
    </form>
  )
}
