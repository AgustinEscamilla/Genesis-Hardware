import { useEffect, useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { buscarPerfilUsuario, actualizarPerfilUsuario } from '../services/servicio_usuarios'

// aqui maestro yo manejo los ajustes de perfil del cliente con firestore
export function useAjustesCliente() {
  const { usuarioActual } = useAutenticacion()
  const [forma, setForma] = useState({ nombre: '', direccionVivienda: '', telefono: '' })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (!usuarioActual?.uid) return
    buscarPerfilUsuario(usuarioActual.uid).then((perfil) => {
      if (perfil) setForma({ nombre: perfil.nombre || '', direccionVivienda: perfil.direccionVivienda || '', telefono: perfil.telefono || '' })
    })
  }, [usuarioActual])

  const cambiar = (campo, valor) => setForma((prev) => ({ ...prev, [campo]: valor }))
  const guardar = async () => {
    if (!usuarioActual?.uid) return
    setMensaje('')
    try {
      await actualizarPerfilUsuario(usuarioActual.uid, forma)
      setMensaje('Perfil actualizado correctamente')
    } catch {
      setMensaje('No se pudo actualizar el perfil')
    }
  }

  return { forma, cambiar, guardar, mensaje }
}
