import { useState } from 'react'

// aqui maestro yo armo el formulario con subida de archivo y preview de la imagen actual
export function FormularioEdicionCatalogo({ seleccionado, alGuardar, urlImagen, guardando, mensaje, mensajeSubida, subiendo, alCambiarArchivo }) {
  const [forma, setForma] = useState(() =>
    seleccionado
      ? { nombre: seleccionado.nombre || '', descripcionPrecios: seleccionado.descripcionPrecios || '', stockVisible: seleccionado.stockVisible ?? 0 }
      : { nombre: '', descripcionPrecios: '', stockVisible: 0 }
  )

  const cambiar = campo => e => setForma(prev => ({ ...prev, [campo]: e.target.value }))

  return (
    <form onSubmit={e => { e.preventDefault(); alGuardar({ ...forma, imagen: urlImagen, stockVisible: Number(forma.stockVisible || 0) }) }} className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-widest text-primario">{seleccionado ? 'Editar producto' : 'Agregar producto'}</p>
      <input value={forma.nombre} onChange={cambiar('nombre')} placeholder="Nombre del producto" required className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <input type="number" min="0" value={forma.stockVisible} onChange={cambiar('stockVisible')} placeholder="Stock visible" className="bg-fondo border border-borde text-texto px-3 py-2 text-xs" />
      <label className="flex flex-col gap-1">
        <span className="text-xs text-mutado">Imagen del producto</span>
        <input type="file" accept="image/*" onChange={e => alCambiarArchivo(e.target.files[0])} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs file:mr-2 file:border-0 file:bg-primario file:text-fondo file:text-xs file:px-2 file:py-1 cursor-pointer" />
      </label>
      {subiendo && <p className="text-xs text-mutado">Subiendo imagen...</p>}
      {mensajeSubida && <p className="text-xs text-primario">{mensajeSubida}</p>}
      {urlImagen && <img src={urlImagen} alt="vista previa" className="h-24 object-contain border border-borde" />}
      <textarea value={forma.descripcionPrecios} onChange={cambiar('descripcionPrecios')} placeholder="Descripcion de precios" rows={3} className="bg-fondo border border-borde text-texto px-3 py-2 text-xs resize-none" />
      {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
      <button type="submit" disabled={subiendo || guardando} className="border border-primario text-primario text-xs px-4 py-2 hover:bg-primario hover:text-fondo disabled:opacity-50 transition-colors">
        {guardando ? 'Guardando producto...' : seleccionado ? 'Actualizar producto' : 'Agregar producto'}
      </button>
    </form>
  )
}
