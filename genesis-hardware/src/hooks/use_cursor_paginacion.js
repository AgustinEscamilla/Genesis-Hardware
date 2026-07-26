import { useCallback, useRef, useState } from 'react'

// esto sirve para administrar la pila de cursores de firestore entre paginas
export function use_cursor_paginacion() {
    const pila_cursores = useRef([])
    const [pagina, set_pagina] = useState(0)

    // aqui maestro yo guardo el cursor actual y avanzo a la siguiente pagina
    const avanzar = useCallback((cursor_nuevo) => {
        pila_cursores.current[pagina] = cursor_nuevo
        set_pagina((actual) => actual + 1)
    }, [pagina])

    // pos esto funciona para retroceder una pagina sin perder los cursores guardados
    const retroceder = useCallback(() => set_pagina((actual) => Math.max(0, actual - 1)), [])

    // aqui puse profe el reinicio total cuando cambia el filtro de categoria
    const reiniciar = useCallback(() => {
        pila_cursores.current = []
        set_pagina(0)
    }, [])

    const cursor_actual = pagina === 0 ? null : pila_cursores.current[pagina - 1]

    return { pagina, cursor_actual, avanzar, retroceder, reiniciar }
}
