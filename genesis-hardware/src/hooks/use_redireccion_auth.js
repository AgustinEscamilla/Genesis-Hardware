import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/conexion_firebase'
import { buscarPerfilUsuario } from '../services/servicio_usuarios'

const rutasPorRol = { administrador: '/administrador', empleado: '/empleados', repartidor: '/repartidores', cliente: '/clientes' }

export function useRedireccionAuth() {
  const navegar = useNavigate()
  const [cargando, setCargando] = useState(true)

  // aqui maestro yo escucho el uid y mando cada rol a su panel
  useEffect(() => onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) return setCargando(false)
    const perfil = await buscarPerfilUsuario(usuario.uid)
    if (perfil?.rol) navegar(rutasPorRol[String(perfil.rol).toLowerCase()] || '/autenticacion', { replace: true })
    setCargando(false)
  }), [navegar])

  return { cargando }
}