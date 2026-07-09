import { useEffect, useState } from 'react'
import { actualizarProducto, agregarProducto, obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo manejo el estado del catalogo y las operaciones de guardar y seleccionar
export function useCatalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccionado, setSeleccionado] = useState(null)
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    // pos esto funciona para cargar datos cuando recarga cambia usando then para no bloquear
    obtenerCatalogo().then(datos => {
      setProductos(datos)
      setCargando(false)
    })
  }, [recarga])

  const guardar = async (datos) => {
    // esto sirve para guardar o actualizar segun si hay producto seleccionado
    if (seleccionado) await actualizarProducto(seleccionado.id, datos)
    else await agregarProducto(datos)
    setSeleccionado(null)
    setRecarga(n => n + 1)
  }

  return { productos, cargando, seleccionado, setSeleccionado, guardar }
}
