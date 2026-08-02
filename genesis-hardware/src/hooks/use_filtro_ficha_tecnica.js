import { useMemo } from 'react'

// aqui maestro yo filtro las categorias y especificaciones segun el texto de busqueda
export const useFiltroFichaTecnica = (especificaciones_tecnicas, busqueda) => {
    return useMemo(() => {
        const lista = especificaciones_tecnicas || []
        const texto = busqueda.trim().toLowerCase()
        if (!texto) return lista
        return lista
            .map((grupo) => ({
                categoria: grupo.categoria,
                especificaciones: (grupo.especificaciones || []).filter((item) =>
                    item.clave.toLowerCase().includes(texto) || item.valor.toLowerCase().includes(texto)
                )
            }))
            .filter((grupo) => grupo.especificaciones.length > 0)
    }, [especificaciones_tecnicas, busqueda])
}
