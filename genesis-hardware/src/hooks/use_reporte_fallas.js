import { useState } from 'react'
import { crearReporteFalla } from '../services/servicio_reporte_fallas'

// esto sirve para gestionar el formulario de reporte de fallas del repartidor
export function useReporteFallas() {
  const [mensaje, setMensaje] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [forma, setForma] = useState({ cofre: '', mensaje: '' })

  const cambiar = (campo, valor) => setForma(prev => ({ ...prev, [campo]: valor }))
  const enviar = async () => {
    if (!forma.cofre || !forma.mensaje) return
    setGuardando(true)
    try {
      await crearReporteFalla({ repartidorId: 'repartidor-local', cofre: forma.cofre, mensaje: forma.mensaje })
      setForma({ cofre: '', mensaje: '' })
      setMensaje('Reporte enviado correctamente')
    } catch {
      setMensaje('No se pudo enviar el reporte')
    } finally {
      setGuardando(false)
    }
  }

  return { forma, cambiar, enviar, mensaje, guardando }
}
