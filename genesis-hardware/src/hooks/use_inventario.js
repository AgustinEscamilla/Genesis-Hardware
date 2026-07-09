import { useState } from 'react'
import { registrarMercancia } from '../services/servicio_inventario'

// aqui maestro yo controlo el estado y la logica del formulario de ingreso de mercancia
export function useInventario() {
  const estadoInicial = { nombre: '', volumen: '', tipoUnidad: 'pieza' }
  const [forma, setForma] = useState(estadoInicial)
  const [guardando, setGuardando] = useState(false)
  const [exito, setExito] = useState(false)

  const cambiar = (campo, valor) => setForma(prev => ({ ...prev, [campo]: valor }))

  const enviar = async () => {
    // esto sirve para validar los campos obligatorios antes de guardar en firestore
    if (!forma.volumen || !forma.tipoUnidad) return
    setGuardando(true)
    await registrarMercancia(forma)
    setForma(estadoInicial)
    setExito(true)
    setGuardando(false)
    setTimeout(() => setExito(false), 2500)
  }

  return { forma, cambiar, enviar, guardando, exito }
}
