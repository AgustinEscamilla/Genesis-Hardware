import { FormularioLinea } from './formulario_linea'
import { ListaLineas } from './lista_lineas'
import { useLineas } from '../../hooks/use_lineas'
import { useSubidaLinea } from '../../hooks/use_subida_linea'

// aqui maestro yo uno el formulario con la lista de lineas usando el hook centralizado
export function VistaLineasAdministrador() {
  const { lineas, cargando, seleccionada, setSeleccionada, guardar, eliminar } = useLineas()
  const { urlImagen, subiendo, subir, limpiar } = useSubidaLinea()

  const seleccionar = (item) => { limpiar(); setSeleccionada(item) }

  return (
    <div className="min-h-screen bg-fondo p-6 flex flex-col gap-6">
      <h2 className="text-xs uppercase tracking-widest text-primario">Lineas de producto</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormularioLinea
          key={seleccionada?.id ?? 'nueva'}
          seleccionada={seleccionada}
          alGuardar={async (datos) => { await guardar(datos); limpiar() }}
          urlImagen={urlImagen}
          subiendo={subiendo}
          alCambiarArchivo={subir}
        />
        <ListaLineas
          lineas={lineas}
          cargando={cargando}
          alSeleccionar={seleccionar}
          alEliminar={eliminar}
        />
      </div>
    </div>
  )
}
