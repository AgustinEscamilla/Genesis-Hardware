import { useRedireccionAuth } from '../../hooks/use_redireccion_auth'
import { useNavigate } from 'react-router-dom'
import { useAccesoGoogle } from '../../hooks/use_acceso_google'
import { FormularioAcceso } from './formulario_acceso'
import { BotonGoogleCliente } from './boton_google_cliente'
import { resolverRutaAccesoUsuario } from '../../services/servicio_usuarios'

export function VistaAutenticacion() {
  const { cargando } = useRedireccionAuth()
  const { cargando: cargandoGoogle, iniciarAccesoGoogle } = useAccesoGoogle()
  const navegar = useNavigate()

  // aqui maestro yo separo el acceso comun del acceso por google
  if (cargando) return <div className="min-h-screen flex items-center justify-center bg-fondo text-texto">Cargando acceso</div>

  // aqui maestro yo espero el guardado y navego al panel correcto sin depender del listener
  const manejarAccesoGoogle = async () => {
    const usuario = await iniciarAccesoGoogle()
    navegar(await resolverRutaAccesoUsuario({ uidAuth: usuario.uid, correo: usuario.email || '' }), { replace: true })
  }

  return <div className="min-h-screen bg-fondo px-4 py-10 text-texto"><div className="mx-auto relative w-full max-w-md overflow-hidden border border-borde bg-panel/95 p-8 shadow-2xl shadow-primario/10"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primario to-transparent"></div><FormularioAcceso /><div className="mt-6 border-t border-borde pt-4"><BotonGoogleCliente cargando={cargandoGoogle} alIniciarSesion={manejarAccesoGoogle} /></div></div></div>
}