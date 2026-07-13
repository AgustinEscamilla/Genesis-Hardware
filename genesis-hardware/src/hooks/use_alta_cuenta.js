import { useState } from 'react'
import { crearCuentaUsuario } from '../services/servicio_cuentas'

export const useFormularioAltaCuenta = () => {
    const [rol, setRol] = useState('empleado')
    const [datosFormulario, setDatosFormulario] = useState({ nombre: '', correo: '', pass: '', pass2: '' })
    const [mensajeEstado, setMensajeEstado] = useState('')

    // aqui maestro yo guardo el rol activo para construir la cuenta correcta
    const cambiarRol = (nuevoRol) => setRol(nuevoRol)

    // aqui maestro yo sincronizo cada campo del formulario con el estado local
    const cambiarDato = (evento) => setDatosFormulario({ ...datosFormulario, [evento.target.name]: evento.target.value })

    // esto sirve yo valido los datos antes de escribir en firebase
    const enviar = async (evento) => {
        evento.preventDefault()
        setMensajeEstado('')

        if (!datosFormulario.nombre || !datosFormulario.correo) return setMensajeEstado('Completa nombre y correo')
        if (datosFormulario.pass !== datosFormulario.pass2) return setMensajeEstado('Las contrasenas no coinciden')

        await crearCuentaUsuario({
            tipo: rol,
            nombre: datosFormulario.nombre,
            correo: `${datosFormulario.correo}@${rol}.com`,
            contrasena: datosFormulario.pass
        })

        setDatosFormulario({ nombre: '', correo: '', pass: '', pass2: '' })
        setMensajeEstado('Cuenta creada correctamente en Firebase')
    }

    return { rol, datos: datosFormulario, mensaje: mensajeEstado, cambiarRol, cambiarDato, enviar }
}