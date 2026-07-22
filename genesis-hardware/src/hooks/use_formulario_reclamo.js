import { useState } from 'react'
import { crearReclamo } from '../services/servicio_reclamos'

// esto sirve para gestionar el formulario donde el cliente levanta su reclamo
export function useFormularioReclamo(pedidoId, clienteId) {
    const [mensaje, setMensaje] = useState('')
    const [guardando, setGuardando] = useState(false)
    const [forma, setForma] = useState({ motivo: '', descripcion: '' })

    const cambiar = (campo, valor) => setForma((prev) => ({ ...prev, [campo]: valor }))
    const enviar = async () => {
        if (!forma.motivo || !forma.descripcion || !pedidoId) return
        setGuardando(true)
        try {
            await crearReclamo({ pedidoId, clienteId, motivo: forma.motivo, descripcion: forma.descripcion })
            setForma({ motivo: '', descripcion: '' })
            setMensaje('Reclamo enviado correctamente')
        } catch {
            setMensaje('No se pudo enviar el reclamo')
        } finally {
            setGuardando(false)
        }
    }

    return { forma, cambiar, enviar, mensaje, guardando }
}
