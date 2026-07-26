import { useEffect, useState } from 'react'
import { use_cursor_paginacion } from './use_cursor_paginacion'
import { obtener_pagina_catalogo } from '../services/servicio_catalogo_paginado'

// aqui maestro yo conecto el cursor de paginacion con la consulta real de firestore
export function use_paginacion_catalogo(categoria) {
    const { pagina, cursor_actual, avanzar, retroceder, reiniciar } = use_cursor_paginacion()
    const [productos, set_productos] = useState([])
    const [cargando, set_cargando] = useState(true)
    const [ultimo_documento, set_ultimo_documento] = useState(null)

    useEffect(() => {
        reiniciar()
    }, [categoria, reiniciar])

    useEffect(() => {
        let activo = true
        set_cargando(true)
        obtener_pagina_catalogo({ categoria, cursor: cursor_actual })
            .then((resultado) => {
                if (!activo) return
                set_productos(resultado.productos)
                set_ultimo_documento(resultado.ultimo_documento)
            })
            .catch((error) => {
                if (!activo) return
                console.error(error)
                set_productos([])
                set_ultimo_documento(null)
            })
            .finally(() => {
                if (activo) set_cargando(false)
            })
        return () => { activo = false }
    }, [categoria, cursor_actual])

    const siguiente = () => ultimo_documento && avanzar(ultimo_documento)

    return {
        productos, cargando, pagina,
        siguiente, anterior: retroceder,
        hay_anterior: pagina > 0,
        hay_siguiente: productos.length === 10
    }
}
