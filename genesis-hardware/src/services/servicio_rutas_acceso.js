import { buscarPerfilUsuario, inferirRolPorCorreo } from './servicio_usuarios'
import { rutas_por_rol, roles } from './constantes_autorizacion'
import { requiereOnboardingStaff } from './servicio_onboarding_staff'

const ruta_onboarding = (rol, correo) => `/onboarding/${rol === roles.empleado ? 'empleados' : 'repartidores'}?correo=${encodeURIComponent(correo || '')}`
const esSesionLocal = (uidAuth = '') => String(uidAuth).startsWith('uid-local-')

export const resolverRutaAcceso = async ({ uidAuth, correo }) => {
  // esto sirve yo resuelvo panel final y desvio onboarding si falta perfil
  const rolInferido = String(inferirRolPorCorreo(correo) || '').toLowerCase()
  if (esSesionLocal(uidAuth) && rutas_por_rol[rolInferido]) return rutas_por_rol[rolInferido]
  const perfil = uidAuth ? await buscarPerfilUsuario(uidAuth) : null
  const rol = String(perfil?.rol || rolInferido || '').toLowerCase()
  if (!rutas_por_rol[rol]) return '/autenticacion'
  if (rol === roles.empleado || rol === roles.repartidor) {
    const necesita = await requiereOnboardingStaff({ rol, correo: perfil?.correo || correo, uidAuth })
    if (necesita) return ruta_onboarding(rol, perfil?.correo || correo)
  }
  return rutas_por_rol[rol]
}
