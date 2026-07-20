import { useMemo, useState } from 'react'
import { sembrarCatalogoEjemplo } from '../services/semilla_catalogo'

// aqui maestro yo manejo la busqueda y los filtros del catalogo de administrador
export function useCatalogoFiltros(productos, recargar) {
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

  const sembrarDatos = async () => {
    await sembrarCatalogoEjemplo()
    recargar()
  }

  return { busqueda, categoria, setBusqueda, setCategoria, productosFiltrados, sembrarDatos }
}
