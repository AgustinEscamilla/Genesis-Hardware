import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntradaTexto } from '../components/entrada_texto'
import { BotonPrincipal } from '../components/boton_principal'
import { cerrarSesion, iniciarSesionConCorreo } from '../services/servicio_autenticacion'
import { resolverRutaAcceso } from '../services/servicio_rutas_acceso'
import { validarAccesoCorreoContrasena } from '../services/servicio_validaciones_acceso'

export function FormularioAcceso() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()

  // aqui maestro yo autentico primero para que la validacion en firestore ya tenga permisos
  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setMensajeError('')
    try {
      const usuario = await iniciarSesionConCorreo(correo, contrasena)
      const validacion = await validarAccesoCorreoContrasena(correo)
      if (!validacion.permitido) {
        await cerrarSesion()
        return setMensajeError(validacion.mensaje)
      }
      navegar(await resolverRutaAcceso({ uidAuth: usuario?.uid, correo: usuario?.correo || correo }), { replace: true })
    } catch { setMensajeError('No se pudo validar el acceso') }
  }

  return <form onSubmit={manejarEnvio} className="flex flex-col gap-4"><EntradaTexto id="correo" tipo="email" etiqueta="Correo electronico" valor={correo} alCambiar={(evento) => setCorreo(evento.target.value)} /><EntradaTexto id="contrasena" tipo="password" etiqueta="Contrasena" valor={contrasena} alCambiar={(evento) => setContrasena(evento.target.value)} />{mensajeError && <p className="text-sm text-red-400">{mensajeError}</p>}<BotonPrincipal texto="Entrar" tipo="submit" /></form>
}