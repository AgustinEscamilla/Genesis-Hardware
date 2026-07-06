import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntradaTexto } from '../../components/entrada_texto'
import { BotonPrincipal } from '../../components/boton_principal'
import { iniciarSesionConCorreo } from '../../services/servicio_autenticacion'
import { resolverRutaAccesoUsuario } from '../../services/servicio_usuarios'

export function FormularioAcceso() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const navegar = useNavigate()

  // aqui maestro yo valido correo y contrasena sin mezclar la navegacion
  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setMensajeError('')
    try {
      const usuario = await iniciarSesionConCorreo(correo, contrasena)
      navegar(await resolverRutaAccesoUsuario({ uidAuth: usuario?.uid, correo: usuario?.correo || correo }), { replace: true })
    } catch { setMensajeError('No se pudo validar el acceso') }
  }

  return <form onSubmit={manejarEnvio} className="flex flex-col gap-4"><EntradaTexto id="correo" tipo="email" etiqueta="Correo electronico" valor={correo} alCambiar={(evento) => setCorreo(evento.target.value)} /><EntradaTexto id="contrasena" tipo="password" etiqueta="Contrasena" valor={contrasena} alCambiar={(evento) => setContrasena(evento.target.value)} />{mensajeError && <p className="text-sm text-red-400">{mensajeError}</p>}<BotonPrincipal texto="Entrar" tipo="submit" /></form>
}