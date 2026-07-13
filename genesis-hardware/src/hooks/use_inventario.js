import { useState } from 'react'
import { registrarMercancia } from '../services/servicio_inventario'

// aqui maestro yo controlo el estado y la logica del formulario de ingreso de mercancia
export function useInventario() {
  const estadoInicial = { nombre: '', volumen: '', tipoUnidad: 'pieza' }
  const [forma, setForma] = useState(estadoInicial)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const cambiar = (campo, valor) => setForma(prev => ({ ...prev, [campo]: valor }))

  const enviar = async () => {
    // esto sirve para validar los campos obligatorios antes de guardar en firestore
    if (!forma.volumen || !forma.tipoUnidad) return
    setGuardando(true)
    setMensaje('')
    try {
      await registrarMercancia(forma)
      setForma(estadoInicial)
      setMensaje('Mercancia registrada exitosamente en inventario')
    } catch { setMensaje('No se pudo registrar la mercancia') }
    finally { setGuardando(false) }
  }

  return { forma, cambiar, enviar, guardando, mensaje }
}
