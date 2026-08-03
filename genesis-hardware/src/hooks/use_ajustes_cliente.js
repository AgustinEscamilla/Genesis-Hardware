import { useEffect, useState } from 'react'
import { useAutenticacion } from './use_autenticacion'
import { buscarPerfilUsuario, actualizarPerfilUsuario } from '../services/servicio_usuarios'

// aqui maestro yo manejo los ajustes de perfil del cliente con firestore
export function useAjustesCliente() {
  const { usuarioActual } = useAutenticacion()
  const [forma, setForma] = useState({ nombre: '', direccionVivienda: '', calle: '', numeroExterior: '', numeroInterior: '', numeroLote: '', colonia: '', municipio: 'Campeche', estado: 'Campeche', referencias: '', codigoPostal: '', telefono: '' })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (!usuarioActual?.uid) return
    buscarPerfilUsuario(usuarioActual.uid).then((perfil) => {
      if (perfil) setForma((actual) => ({ ...actual, ...perfil, calle: perfil.calle || '', numeroExterior: perfil.numeroExterior || '', numeroInterior: perfil.numeroInterior || '', numeroLote: perfil.numeroLote || '', colonia: perfil.colonia || '', municipio: perfil.municipio || 'Campeche', estado: perfil.estado || 'Campeche', referencias: perfil.referencias || '' }))
    })
  }, [usuarioActual])

  const cambiar = (campo, valor) => setForma((prev) => ({ ...prev, [campo]: valor }))
  const guardar = async () => {
    if (!usuarioActual?.uid) return
    setMensaje('')
    const nombre_cliente = String(forma.nombre || '').trim()
    const telefono_cliente = String(forma.telefono || '').replace(/\D/g, '')
    const municipio = String(forma.municipio || '').trim().toLowerCase()
    const estado = String(forma.estado || '').trim().toLowerCase()
    if (nombre_cliente.length < 3) { setMensaje('Escribe tu nombre completo'); return }
    if (telefono_cliente && telefono_cliente.length !== 10) { setMensaje('El telefono debe tener 10 digitos'); return }
    if (municipio !== 'campeche' || estado !== 'campeche') { setMensaje('La entrega solo esta disponible en Campeche'); return }
    // aqui maestro yo exijo el codigo postal antes de guardar el perfil
    if (!/^24\d{3}$/.test(String(forma.codigoPostal || '').trim())) {
      setMensaje('El codigo postal debe ser valido para Campeche y tener 5 digitos')
      return
    }
    if (!forma.calle.trim() || !forma.numeroExterior.trim() || !forma.colonia.trim() || !forma.municipio.trim()) {
      setMensaje('Completa calle numero exterior colonia y municipio')
      return
    }
    try {
      const partes = [forma.calle, `Numero ${forma.numeroExterior}`, forma.numeroInterior && `Interior ${forma.numeroInterior}`, forma.numeroLote && `Lote ${forma.numeroLote}`, forma.colonia, forma.municipio, forma.estado, forma.referencias].filter(Boolean)
      await actualizarPerfilUsuario(usuarioActual.uid, { ...forma, nombre: nombre_cliente, telefono: telefono_cliente, direccionVivienda: partes.join(', ') })
      setMensaje('Perfil actualizado correctamente')
    } catch {
      setMensaje('No se pudo actualizar el perfil')
    }
  }

  return { forma, cambiar, guardar, mensaje }
}
