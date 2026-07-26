import { use_filtros_categoria_catalogo } from '../hooks/use_filtros_categoria_catalogo'
import { use_paginacion_catalogo } from '../hooks/use_paginacion_catalogo'
import { ClienteFiltrosCatalogo } from './cliente_filtros_catalogo'
import { ClienteGrillaCatalogo } from './cliente_grilla_catalogo'

// aqui maestro yo uno filtros paginacion y grilla en una sola seccion del catalogo
export function SeccionCatalogoCliente({ al_agregar }) {
    const { categoria, set_categoria, categorias } = use_filtros_categoria_catalogo()
    const paginacion = use_paginacion_catalogo(categoria)

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 p-4 lg:flex-row md:p-6">
            <ClienteFiltrosCatalogo categoria={categoria} categorias={categorias} alCambiarCategoria={set_categoria} />
            <ClienteGrillaCatalogo
                productos={paginacion.productos}
                cargando={paginacion.cargando}
                alAgregar={al_agregar}
                pagina={paginacion.pagina}
                hayAnterior={paginacion.hay_anterior}
                haySiguiente={paginacion.hay_siguiente}
                alAnterior={paginacion.anterior}
                alSiguiente={paginacion.siguiente}
            />
        </div>
    )
}
