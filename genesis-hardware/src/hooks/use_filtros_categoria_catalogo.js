import { useState } from 'react'
import { categorias_catalogo } from '../services/constantes_catalogo'

// esto sirve para guardar la categoria activa que filtra el catalogo del cliente
export function use_filtros_categoria_catalogo() {
    const [categoria, set_categoria] = useState('Todos')

    return { categoria, set_categoria, categorias: categorias_catalogo }
}
