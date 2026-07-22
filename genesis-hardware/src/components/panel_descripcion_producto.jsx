import { descripcion_generica_producto } from '../services/constantes_catalogo'

// esto sirve para mostrar la descripcion tecnica o el texto generico si falta
export function PanelDescripcionProducto({ producto, visible }) {
    if (!visible) return null
    const texto = producto.descripcionTecnica || producto.descripcionPrecios || descripcion_generica_producto

    return (
        <div className="border border-borde bg-fondo p-2 text-xs text-mutado">
            {texto}
        </div>
    )
}
