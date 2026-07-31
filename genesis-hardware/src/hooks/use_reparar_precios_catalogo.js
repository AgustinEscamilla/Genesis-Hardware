import { useState } from 'react'
import { repararPreciosCatalogo } from '../services/reparar_precios_catalogo'

export const useRepararPreciosCatalogo = () => {
  const [ejecutando, setEjecutando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const reparar = async () => {
    setEjecutando(true)
    setMensaje('')
    try {
      const reparados = await repararPreciosCatalogo()
      setMensaje(reparados > 0 ? `Se corrigieron ${reparados} producto(s) sin precio` : 'No habia productos sin precio')
    } catch {
      setMensaje('No se pudo reparar los precios, intenta de nuevo')
    } finally {
      setEjecutando(false)
    }
  }

  return { reparar, ejecutando, mensaje }
}
