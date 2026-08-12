import { useSubidaImagen } from '../../../hooks/use_subida_imagen'
import { FormularioEdicionCatalogo } from './formulario_edicion_catalogo'
import { FiltrosCatalogoAdministrador } from './filtros_catalogo_administrador'
import { ListaCatalogo } from './lista_catalogo'
import { useCatalogo } from '../../../hooks/use_catalogo'
import { useCatalogoFiltros } from '../../../hooks/use_catalogo_filtros'

// aqui maestro yo uno el formulario con la lista y la subida de imagen usando dos hooks
export function VistaCatalogoAdministrador() {
  const { productos, cargando, guardando, mensaje, seleccionado, setSeleccionado, guardar, eliminar } = useCatalogo()
  const { urlImagen, subiendo, mensaje: mensajeSubida, subir, limpiar } = useSubidaImagen()
  const { busqueda, categoria, setBusqueda, setCategoria, productosFiltrados } = useCatalogoFiltros(productos)

  const seleccionar = (prod) => { limpiar(); setSeleccionado(prod) }
  const manejarGuardado = async (datos) => {
    // pos esto funciona para guardar el producto y limpiar la imagen subida despues
    await guardar(datos)
    limpiar()
  }

  return (
    <div className="min-h-screen bg-fondo p-6 flex flex-col gap-6">
      <FiltrosCatalogoAdministrador
        busqueda={busqueda}
        categoria={categoria}
        setBusqueda={setBusqueda}
        setCategoria={setCategoria}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioEdicionCatalogo
          key={seleccionado?.id ?? 'nuevo'}
          seleccionado={seleccionado}
          alGuardar={manejarGuardado}
          urlImagen={urlImagen || seleccionado?.imagen || ''}
          guardando={guardando}
          mensaje={mensaje}
          mensajeSubida={mensajeSubida}
          subiendo={subiendo}
          alCambiarArchivo={subir}
        />
        <ListaCatalogo productos={productosFiltrados} cargando={cargando} alSeleccionar={seleccionar} alEliminar={eliminar} />
      </div>
    </div>
  )
}
