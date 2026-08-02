import { useState } from 'react'

// aqui maestro yo manejo el estado de las categorias y especificaciones de la ficha tecnica editable
export const useEspecificacionesTecnicasForma = (inicial) => {
    const [especificaciones, setEspecificaciones] = useState(inicial && inicial.length > 0 ? inicial : [])

    const agregarCategoria = () => setEspecificaciones(prev => [...prev, { categoria: '', especificaciones: [] }])
    const eliminarCategoria = (indiceCategoria) => setEspecificaciones(prev => prev.filter((_, i) => i !== indiceCategoria))
    const cambiarCategoria = (indiceCategoria, nombre) =>
        setEspecificaciones(prev => prev.map((grupo, i) => i === indiceCategoria ? { ...grupo, categoria: nombre } : grupo))

    const agregarEspecificacion = (indiceCategoria) =>
        setEspecificaciones(prev => prev.map((grupo, i) =>
            i === indiceCategoria ? { ...grupo, especificaciones: [...grupo.especificaciones, { clave: '', valor: '' }] } : grupo
        ))
    const eliminarEspecificacion = (indiceCategoria, indiceEspec) =>
        setEspecificaciones(prev => prev.map((grupo, i) =>
            i === indiceCategoria ? { ...grupo, especificaciones: grupo.especificaciones.filter((_, j) => j !== indiceEspec) } : grupo
        ))
    const cambiarEspecificacion = (indiceCategoria, indiceEspec, campo, valor) =>
        setEspecificaciones(prev => prev.map((grupo, i) =>
            i === indiceCategoria
                ? { ...grupo, especificaciones: grupo.especificaciones.map((espec, j) => j === indiceEspec ? { ...espec, [campo]: valor } : espec) }
                : grupo
        ))

    return { especificaciones, agregarCategoria, eliminarCategoria, cambiarCategoria, agregarEspecificacion, eliminarEspecificacion, cambiarEspecificacion }
}
