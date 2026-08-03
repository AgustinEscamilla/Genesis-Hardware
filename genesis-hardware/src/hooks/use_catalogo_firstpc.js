import { useEffect, useMemo, useState } from 'react'
import { useCatalogoPublico } from './use_catalogo_publico'
import { useFavoritos } from './use_favoritos'
import { obtener_marca_producto } from '../services/constantes_firstpc'

const limpiar_texto = (valor) => String(valor || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function useCatalogoFirstpc() {
  const { productos, cargando } = useCatalogoPublico()
  const [busqueda, set_busqueda] = useState('')
  const [categoria, set_categoria] = useState('Todas')
  const [marca, set_marca] = useState('Todas')
  const [orden, set_orden] = useState('relevantes')
  const [pagina, set_pagina] = useState(1)
  const [carrito, set_carrito] = useState(() => Number(localStorage.getItem('genesis_hardware_carrito') || 0))
  useEffect(() => { localStorage.setItem('genesis_hardware_carrito', String(carrito)) }, [carrito])
  const { favoritos, alternar_favorito } = useFavoritos()
  const filtrados = useMemo(() => productos.filter((producto) => {
    const texto = limpiar_texto(`${producto.nombre} ${producto.descripcionTecnica}`)
    const coincide_texto = !busqueda || texto.includes(limpiar_texto(busqueda))
    const coincide_categoria = categoria === 'Todas' || categoria === 'Favoritos' && favoritos.includes(producto.id) || limpiar_texto(producto.categoria) === limpiar_texto(categoria)
    const coincide_marca = marca === 'Todas' || obtener_marca_producto(producto) === marca
    return coincide_texto && coincide_categoria && coincide_marca
  }).sort((a, b) => orden === 'menor' ? Number(a.precio || 0) - Number(b.precio || 0) : orden === 'mayor' ? Number(b.precio || 0) - Number(a.precio || 0) : 0), [productos, busqueda, categoria, marca, orden, favoritos])
  const total_paginas = Math.max(1, Math.ceil(filtrados.length / 10))
  const productos_visibles = filtrados.slice((pagina - 1) * 10, pagina * 10)
  const cambiar_busqueda = (valor) => { set_busqueda(valor); set_pagina(1) }
  const cambiar_categoria = (valor) => { set_categoria(valor); set_pagina(1) }
  const cambiar_marca = (valor) => { set_marca(valor); set_pagina(1) }
  const cambiar_orden = (valor) => { set_orden(valor); set_pagina(1) }
  const limpiar_filtros = () => { set_busqueda(''); set_categoria('Todas'); set_marca('Todas'); set_orden('relevantes'); set_pagina(1) }
  return { productos, filtrados, productos_visibles, total_paginas, pagina, set_pagina, cargando, busqueda, set_busqueda: cambiar_busqueda, categoria, set_categoria: cambiar_categoria, marca, set_marca: cambiar_marca, orden, set_orden: cambiar_orden, carrito, set_carrito, favoritos, alternar_favorito, limpiar_filtros }
}
