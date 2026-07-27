import { useEffect, useState } from 'react'
import { registrarMercancia } from '../services/servicio_inventario'
import { obtenerCatalogo } from '../services/servicio_catalogo'

// aqui maestro yo controlo el estado y la logica del formulario de ingreso de mercancia
export function useInventario() {
  const estado_inicial = { productoId: '', modo_ingreso: 'catalogo', nombre_producto: '', categoria: 'Procesadores', descripcion_tecnica: '', volumen: '', tipoUnidad: 'pieza' }
  const [forma, setForma] = useState(estado_inicial)
  const [catalogo, setCatalogo] = useState([])
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => { obtenerCatalogo().then(setCatalogo).catch(() => setMensaje('No se pudo cargar el catalogo')) }, [])

  const cambiar = (campo, valor) => setForma(prev => ({ ...prev, [campo]: valor }))

  const enviar = async () => {
    const es_nuevo = forma.modo_ingreso === 'nuevo'
    if ((!es_nuevo && !forma.productoId) || (es_nuevo && !forma.nombre_producto.trim()) || Number(forma.volumen) <= 0) return setMensaje(es_nuevo ? 'Agrega el nombre y una cantidad valida' : 'Selecciona un producto y una cantidad valida')
    const producto = catalogo.find((p) => p.id === forma.productoId)
    setGuardando(true)
    setMensaje('')
    try {
      await registrarMercancia({ ...forma, productoId: es_nuevo ? '' : forma.productoId, nombre_producto: es_nuevo ? forma.nombre_producto.trim() : producto?.nombre || '', categoria: es_nuevo ? forma.categoria : producto?.categoria || '', descripcion_tecnica: es_nuevo ? forma.descripcion_tecnica : producto?.descripcionTecnica || '' })
      setForma(estado_inicial)
      setMensaje(es_nuevo ? 'Producto nuevo y mercancia registrados' : 'Mercancia registrada exitosamente en inventario')
    } catch { setMensaje('No se pudo registrar la mercancia') }
    finally { setGuardando(false) }
  }

  return { forma, catalogo, cambiar, enviar, guardando, mensaje }
}
