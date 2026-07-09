import { useSubidaImagen } from '../../hooks/use_subida_imagen'
import { FormularioEdicionCatalogo } from './formulario_edicion_catalogo'
import { ListaCatalogo } from './lista_catalogo'
import { useCatalogo } from '../../hooks/use_catalogo'

// aqui maestro yo uno el formulario con la lista y la subida de imagen usando dos hooks
export function VistaCatalogoAdministrador() {
  const { productos, cargando, seleccionado, setSeleccionado, guardar } = useCatalogo()
  const { urlImagen, subiendo, subir, limpiar } = useSubidaImagen()

  const seleccionar = (prod) => { limpiar(); setSeleccionado(prod) }

  const manejarGuardado = async (datos) => {
    // pos esto funciona para guardar el producto y limpiar la imagen subida despues
    await guardar(datos)
    limpiar()
  }

  return (
    <div className="min-h-screen bg-fondo p-6 flex flex-col gap-6">
      <h2 className="text-xs uppercase tracking-widest text-primario">Edicion de catalogo</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioEdicionCatalogo
          key={seleccionado?.id ?? 'nuevo'}
          seleccionado={seleccionado}
          alGuardar={manejarGuardado}
          urlImagen={urlImagen || seleccionado?.imagen || ''}
          subiendo={subiendo}
          alCambiarArchivo={subir}
        />
        <ListaCatalogo productos={productos} cargando={cargando} alSeleccionar={seleccionar} />
      </div>
    </div>
  )
}
