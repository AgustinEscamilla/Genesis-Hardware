import { TarjetaNoticiaAdmin } from './tarjeta_noticia_administrador'

// pos esto funciona para listar todas las noticias en el panel del admin
export function ListaNoticias({ noticias, cargando, alSeleccionar, alEliminar }) {
  if (cargando) return <p className="text-xs text-mutado">Cargando noticias...</p>
  if (!noticias.length) return <p className="text-xs text-mutado">Sin noticias publicadas aun</p>

  return (
    <div className="flex flex-col gap-2">
      {noticias.map(noticia => (
        <TarjetaNoticiaAdmin key={noticia.id} noticia={noticia} alSeleccionar={alSeleccionar} alEliminar={alEliminar} />
      ))}
    </div>
  )
}
