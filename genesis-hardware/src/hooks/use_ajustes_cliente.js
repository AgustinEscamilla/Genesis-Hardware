import { useEffect, useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { buscarPerfilUsuario, actualizarPerfilUsuario } from '../services/servicio_usuarios'

// aqui maestro yo manejo los ajustes de perfil del cliente con firestore
export function useAjustesCliente() {
  const { usuarioActual } = useAutenticacion()
  const [forma, setForma] = useState({ nombre: '', direccionVivienda: '', codigoPostal: '', telefono: '' })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (!usuarioActual?.uid) return
    buscarPerfilUsuario(usuarioActual.uid).then((perfil) => {
      if (perfil) setForma({ nombre: perfil.nombre || '', direccionVivienda: perfil.direccionVivienda || '', codigoPostal: perfil.codigoPostal || '', telefono: perfil.telefono || '' })
    })
  }, [usuarioActual])

  const cambiar = (campo, valor) => setForma((prev) => ({ ...prev, [campo]: valor }))
  const guardar = async () => {
    if (!usuarioActual?.uid) return
    setMensaje('')
    // aqui maestro yo exijo el codigo postal antes de guardar el perfil
    if (!/^\d{5}$/.test(String(forma.codigoPostal || '').trim())) {
      setMensaje('El codigo postal debe tener 5 digitos')
      return
    }
    try {
      await actualizarPerfilUsuario(usuarioActual.uid, forma)
      setMensaje('Perfil actualizado correctamente')
    } catch {
      setMensaje('No se pudo actualizar el perfil')
    }
  }

  return { forma, cambiar, guardar, mensaje }
}
