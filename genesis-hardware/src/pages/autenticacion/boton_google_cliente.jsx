import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { iniciarSesionClienteConGoogle } from '../../services/servicio_autenticacion'
import { resolverRutaAccesoUsuario } from '../../services/servicio_usuarios'

export function BotonGoogleCliente() {
  const [cargando, setCargando] = useState(false)
  const navegar = useNavigate()

  // aqui maestro yo disparo google solo para clientes
  const manejarClick = async () => {
    setCargando(true)
    try {
      const usuario = await iniciarSesionClienteConGoogle()
      navegar(await resolverRutaAccesoUsuario({ uidAuth: usuario?.uid, correo: usuario?.email || '' }), { replace: true })
    } finally { setCargando(false) }
  }

  return <button type="button" onClick={manejarClick} className="w-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500 hover:text-cyan-300">{cargando ? 'Conectando con Google' : 'Entrar con Google'}</button>
}