import { useState } from 'react'

// aqui maestro yo armo el formulario con los cinco campos de una linea de producto
export function FormularioLinea({ seleccionada, alGuardar, urlImagen, guardando, mensaje, mensajeSubida, subiendo, alCambiarArchivo }) {
  const vacio = { titulo: '', descripcion: '', metrica: '', valor: '', etiqueta: '', imagen: '' }
  const [forma, setForma] = useState(() => seleccionada ? { ...seleccionada } : vacio)
  const cambiar = campo => e => setForma(prev => ({ ...prev, [campo]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); alGuardar({ ...forma, imagen: urlImagen || forma.imagen || '' }) }} className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">{seleccionada ? 'Editar linea' : 'Agregar linea'}</p>
      <input value={forma.titulo} onChange={cambiar('titulo')} placeholder="Titulo ej Tarjetas Graficas" required className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input type="file" accept="image/*" onChange={e => alCambiarArchivo(e.target.files[0])} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs file:mr-2 file:border-0 file:bg-primario file:text-fondo file:text-xs file:px-2 file:py-1" />
      {subiendo && <p className="text-xs text-mutado">Subiendo imagen...</p>}
      {mensajeSubida && <p className="text-xs text-primario">{mensajeSubida}</p>}
      {(urlImagen || forma.imagen) && <img src={urlImagen || forma.imagen} alt="vista previa" className="h-24 object-cover border border-borde" />}
      <textarea value={forma.descripcion} onChange={cambiar('descripcion')} placeholder="Descripcion" rows={2} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs resize-none" />
      <input value={forma.metrica} onChange={cambiar('metrica')} placeholder="Metrica ej Frecuencia Turbo" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input value={forma.valor} onChange={cambiar('valor')} placeholder="Valor ej 2.5 GHz+" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input value={forma.etiqueta} onChange={cambiar('etiqueta')} placeholder="Etiqueta ej GPU" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
      <button type="submit" disabled={subiendo || guardando} className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">
        {guardando ? 'Guardando linea...' : seleccionada ? 'Actualizar linea' : 'Agregar linea'}
      </button>
    </form>
  )
}
