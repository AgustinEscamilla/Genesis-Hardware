import { useMemo, useState } from 'react'
import { useCatalogoPublico } from './use_catalogo_publico'
import { obtener_marca_producto } from '../services/constantes_firstpc'

const limpiar_texto = (valor) => String(valor || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function useCatalogoFirstpc() {
  const { productos, cargando } = useCatalogoPublico()
  const [busqueda, set_busqueda] = useState('')
  const [categoria, set_categoria] = useState('Todas')
  const [marca, set_marca] = useState('Todas')
  const [orden, set_orden] = useState('relevantes')
  const [minimo, set_minimo] = useState('')
  const [maximo, set_maximo] = useState('')
  const [carrito, set_carrito] = useState(0)
  const [favoritos, set_favoritos] = useState([])
  const filtrados = useMemo(() => productos.filter((producto) => {
    const texto = limpiar_texto(`${producto.nombre} ${producto.descripcionTecnica}`)
    const coincide_texto = !busqueda || texto.includes(limpiar_texto(busqueda))
    const coincide_categoria = categoria === 'Todas' || limpiar_texto(producto.categoria) === limpiar_texto(categoria)
    const coincide_marca = marca === 'Todas' || obtener_marca_producto(producto) === marca
    const precio = Number(producto.precio || 0)
    return coincide_texto && coincide_categoria && coincide_marca && (!minimo || precio >= Number(minimo)) && (!maximo || precio <= Number(maximo))
  }).sort((a, b) => orden === 'menor' ? Number(a.precio || 0) - Number(b.precio || 0) : orden === 'mayor' ? Number(b.precio || 0) - Number(a.precio || 0) : 0), [productos, busqueda, categoria, marca, orden, minimo, maximo])
  const limpiar_filtros = () => { set_busqueda(''); set_categoria('Todas'); set_marca('Todas'); set_orden('relevantes'); set_minimo(''); set_maximo('') }
  const alternar_favorito = (id) => set_favoritos((actuales) => actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id])
  return { productos, filtrados, cargando, busqueda, set_busqueda, categoria, set_categoria, marca, set_marca, orden, set_orden, minimo, set_minimo, maximo, set_maximo, carrito, set_carrito, favoritos, alternar_favorito, limpiar_filtros }
}
