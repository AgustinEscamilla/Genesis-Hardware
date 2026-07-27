import { useMemo, useState } from 'react'

// aqui maestro yo manejo la busqueda y los filtros del catalogo de administrador
export function useCatalogoFiltros(productos) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const productosFiltrados = useMemo(() => {
    const consulta = busqueda.toLowerCase()
    return productos.filter((producto) => {
      const texto = `${producto.nombre} ${producto.descripcionTecnica} ${producto.categoria}`.toLowerCase()
      const categoriaValida = categoria === 'Todos' || producto.categoria === categoria
      return categoriaValida && texto.includes(consulta)
    })
  }, [busqueda, categoria, productos])

  return { busqueda, categoria, setBusqueda, setCategoria, productosFiltrados }
}
