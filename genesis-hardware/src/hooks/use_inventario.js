import { useEffect, useState } from 'react'
import { registrarMercancia } from '../services/servicio_inventario'
import { obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo controlo el estado y la logica del formulario de ingreso de mercancia
export function useInventario() {
  const estadoInicial = { productoId: '', volumen: '', tipoUnidad: 'pieza' }
  const [forma, setForma] = useState(estadoInicial)
  const [catalogo, setCatalogo] = useState([])
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => { obtenerCatalogo().then(setCatalogo) }, [])

  const cambiar = (campo, valor) => setForma(prev => ({ ...prev, [campo]: valor }))

  const enviar = async () => {
    // esto sirve para validar el producto elegido y el volumen antes de guardar en firestore
    if (!forma.productoId || !forma.volumen) return
    const producto = catalogo.find((p) => p.id === forma.productoId)
    setGuardando(true)
    setMensaje('')
    try {
      await registrarMercancia({ ...forma, nombreProducto: producto?.nombre || '' })
      setForma(estadoInicial)
      setMensaje('Mercancia registrada exitosamente en inventario')
    } catch { setMensaje('No se pudo registrar la mercancia') }
    finally { setGuardando(false) }
  }

  return { forma, catalogo, cambiar, enviar, guardando, mensaje }
}
