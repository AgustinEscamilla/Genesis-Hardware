import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from './conexion_firebase'

const tamano_pagina = 10

// aqui maestro yo arme la coleccion base del catalogo para reutilizarla en cada consulta
const coleccion_catalogo = () => collection(db, 'catalogo')

// esto sirve para construir la consulta paginada aplicando filtro de categoria si aplica
const construir_consulta = (categoria, cursor) => {
    const condiciones = []
    if (categoria && categoria !== 'Todos') condiciones.push(where('categoria', '==', categoria))
    condiciones.push(orderBy('nombre'))
    if (cursor) condiciones.push(startAfter(cursor))
    condiciones.push(limit(tamano_pagina))
    return query(coleccion_catalogo(), ...condiciones)
}

// pos esto funciona para traer una pagina de productos y devolver el cursor de firestore
export const obtener_pagina_catalogo = async ({ categoria, cursor }) => {
    const instantanea = await getDocs(construir_consulta(categoria, cursor))
    const productos = instantanea.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
    const ultimo_documento = instantanea.docs[instantanea.docs.length - 1] || null
    return { productos, ultimo_documento }
}
