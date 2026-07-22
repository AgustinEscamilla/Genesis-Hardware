import { useEffect, useState } from 'react'
import { escucharReclamosCliente } from '../services/servicio_reclamos'

// aqui maestro yo expongo el historial de reclamos que el cliente ha levantado
export function useReclamosCliente(clienteId) {
    const [reclamos, setReclamos] = useState([])

    useEffect(() => {
        if (!clienteId) return undefined
        return escucharReclamosCliente(clienteId, setReclamos)
    }, [clienteId])

    return { reclamos }
}
