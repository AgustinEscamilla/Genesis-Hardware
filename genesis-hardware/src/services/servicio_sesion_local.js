const clave_sesion_local = 'sesion_genesis_hardware'
export const evento_sesion_local = 'sesion-genesis-hardware-cambio'
export const usar_sesion_local = import.meta.env.VITE_USAR_AUTH_LOCAL === 'true'

export const normalizar_correo = (correo = '') => String(correo).trim().toLowerCase()

const notificar_cambio_sesion = () => window.dispatchEvent(new Event(evento_sesion_local))

export const guardar_sesion_local = (correo) => {
  const correo_normalizado = normalizar_correo(correo)
  const uid_local = `uid-local-${correo_normalizado.replace(/[^a-z0-9]/g, '-')}`
  const usuario = { correo: correo_normalizado, email: correo_normalizado, uid: uid_local }
  localStorage.setItem(clave_sesion_local, JSON.stringify(usuario))
  notificar_cambio_sesion()
  return usuario
}

export const limpiar_sesion_local = () => {
  localStorage.removeItem(clave_sesion_local)
  notificar_cambio_sesion()
}

export const obtener_usuario_local = () => {
  const sesion = localStorage.getItem(clave_sesion_local)
  return sesion ? JSON.parse(sesion) : null
}
