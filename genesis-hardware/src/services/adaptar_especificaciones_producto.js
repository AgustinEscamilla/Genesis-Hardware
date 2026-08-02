// esto sirve para convertir los datos planos del producto en categorias para la ficha tecnica
export const adaptarEspecificacionesProducto = (producto) => {
    if (producto.especificaciones_tecnicas) return producto.especificaciones_tecnicas
    return [
        {
            categoria: 'Detalles Técnicos',
            especificaciones: [
                { clave: 'Categoría', valor: producto.categoria || 'No especificada' },
                { clave: 'Resumen técnico', valor: producto.descripcionTecnica || 'Información técnica no disponible' },
                { clave: 'Stock disponible', valor: `${producto.stockVisible ?? 0} unidades` }
            ]
        }
    ]
}
