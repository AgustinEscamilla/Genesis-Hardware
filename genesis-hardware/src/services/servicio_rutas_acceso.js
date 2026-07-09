import { buscarPerfilUsuario, inferirRolPorCorreo } from './servicio_usuarios'
import { requiereOnboardingStaff } from './servicio_onboarding_staff'

const rutasPorRol = { administrador: '/administrador', empleado: '/empleados', repartidor: '/repartidores', cliente: '/clientes' }
const rutaOnboarding = (rol, correo) => `/onboarding/${rol === 'empleado' ? 'empleados' : 'repartidores'}?correo=${encodeURIComponent(correo || '')}`
const esSesionLocal = (uidAuth = '') => String(uidAuth).startsWith('uid-local-')

export const resolverRutaAcceso = async ({ uidAuth, correo }) => {
  // esto sirve yo resuelvo panel final y desvio onboarding si falta perfil
  const rolInferido = String(inferirRolPorCorreo(correo) || '').toLowerCase()
  if (esSesionLocal(uidAuth) && rutasPorRol[rolInferido]) return rutasPorRol[rolInferido]
  const perfil = uidAuth ? await buscarPerfilUsuario(uidAuth) : null
  const rol = String(perfil?.rol || rolInferido || '').toLowerCase()
  if (!rutasPorRol[rol]) return '/autenticacion'
  if (rol === 'empleado' || rol === 'repartidor') {
    const necesita = await requiereOnboardingStaff({ rol, correo: perfil?.correo || correo, uidAuth })
    if (necesita) return rutaOnboarding(rol, perfil?.correo || correo)
  }
  return rutasPorRol[rol]
}