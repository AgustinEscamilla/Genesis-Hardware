import { FormularioNoticia } from './formulario_noticia'
import { ListaNoticias } from './lista_noticias'
import { useNoticias } from '../../../hooks/use_noticias'

// aqui maestro yo uno el formulario con la lista de noticias usando el hook centralizado
export function VistaNoticiasAdministrador() {
  const { noticias, cargando, guardando, mensaje, seleccionada, setSeleccionada, guardar, eliminar } = useNoticias()

  const seleccionar = (item) => setSeleccionada(item)

  return (
    <div className="min-h-screen bg-fondo p-6 flex flex-col gap-6">
      <div><p className="text-xs uppercase tracking-widest text-primario">Centro de noticias</p><h2 className="mt-2 text-2xl font-black text-texto">Noticias y actualizaciones</h2><p className="mt-1 text-sm text-mutado">Publica avisos visibles en el menu principal</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioNoticia
          key={seleccionada?.id ?? 'nueva'}
          seleccionada={seleccionada}
          alGuardar={guardar}
          guardando={guardando}
          mensaje={mensaje}
        />
        <ListaNoticias
          noticias={noticias}
          cargando={cargando}
          alSeleccionar={seleccionar}
          alEliminar={eliminar}
        />
      </div>
    </div>
  )
}
