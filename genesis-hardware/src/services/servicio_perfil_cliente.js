import { auth } from './conexion_firebase'
import { buscarPerfilUsuario, guardarPerfilUsuario } from './servicio_usuarios'

export const datosClienteIniciales = { nombreRazonSocial: '', rfc: '', correoPrincipal: '', telefonoContacto: '', direccionFiscal: '', direccionesEntrega: '', historialCompras: '', nivelCliente: '', metodoPagoPreferido: '' }

export const obtenerPerfilCliente = async () => {
  const uidAuth = auth.currentUser?.uid
  if (!uidAuth) return { completo: false, datos: datosClienteIniciales }
  const perfil = await buscarPerfilUsuario(uidAuth)
  const datos = perfil?.perfilCliente || datosClienteIniciales
  return { completo: Boolean(perfil?.perfilClienteCompleto), datos }
}

export const guardarPerfilCliente = async (datos) => {
  // aqui maestro yo guardo perfil comercial cliente y marco onboarding
  const usuario = auth.currentUser
  if (!usuario) return false
  await guardarPerfilUsuario({ uidAuth: usuario.uid, nombre: datos.nombreRazonSocial || 'Cliente', correo: usuario.email || '', rol: 'cliente', origen: 'google' })
  await guardarPerfilUsuario({ uidAuth: usuario.uid, perfilClienteCompleto: true, perfilCliente: datos, rol: 'cliente', correo: usuario.email || '', nombre: datos.nombreRazonSocial || 'Cliente', origen: 'cliente-panel' })
  return true
}