import { useEffect, useState } from 'react'
import { actualizarProducto, agregarProducto, eliminarProducto, obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo manejo el estado del catalogo y las operaciones de guardar y seleccionar
export function useCatalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccionado, setSeleccionado] = useState(null)
  const [recarga, setRecarga] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    // pos esto funciona para cargar datos cuando recarga cambia usando then para no bloquear
    let activo = true
    obtenerCatalogo().then(datos => activo && setProductos(datos)).catch(() => activo && setMensaje('No se pudo cargar el catalogo')).finally(() => activo && setCargando(false))
    return () => { activo = false }
  }, [recarga])

  const guardar = async (datos) => {
    // esto sirve para guardar o actualizar segun si hay producto seleccionado
    setGuardando(true)
    setMensaje('')
    try {
      if (seleccionado) await actualizarProducto(seleccionado.id, datos)
      else await agregarProducto(datos)
      setSeleccionado(null)
      setRecarga(n => n + 1)
      setMensaje('Producto guardado exitosamente en catalogo')
    } catch { setMensaje('No se pudo guardar el producto en catalogo') }
    finally { setGuardando(false) }
  }

  const recargar = () => setRecarga(n => n + 1)

  const eliminar = async (id) => {
    setGuardando(true)
    setMensaje('')
    try {
      await eliminarProducto(id)
      if (seleccionado?.id === id) setSeleccionado(null)
      setRecarga(n => n + 1)
      setMensaje('Producto eliminado exitosamente del catalogo')
    } catch { setMensaje('No se pudo eliminar el producto del catalogo') }
    finally { setGuardando(false) }
  }

  return { productos, cargando, guardando, mensaje, seleccionado, setSeleccionado, guardar, eliminar, recargar }
}
