import { useState } from 'react'
import { crearCuenta } from '../services/servicio_cuentas'

export const useAltaCuenta = () => {
    // aqui maestro yo inicie el estado para el rol
    const [rol, setRol] = useState('empleado')

    // esto sirve para guardar la informacion de los textos y mensajes
    const [datos, setDatos] = useState({ nombre: '', correo: '', pass: '', pass2: '' })
    const [mensaje, setMensaje] = useState('')

    // pos esto funciona para cambiar el rol con un clic
    const cambiarRol = nuevoRol => setRol(nuevoRol)

    // maestro funciona asi yo guardo lo que se escribe en el estado
    const cambiarDato = e => setDatos({ ...datos, [e.target.name]: e.target.value })

    // aqui puse profe las variables exactas que tu servicio de firebase esta esperando
    const enviar = async e => {
        e.preventDefault()
        setMensaje('')

        if (!datos.nombre || !datos.correo) return setMensaje('Completa nombre y correo')
        if (datos.pass !== datos.pass2) return setMensaje('Las contraseñas no coinciden')

        await crearCuenta({
            tipo: rol,
            nombre: datos.nombre,
            correo: `${datos.correo}@${rol}.com`,
            contrasena: datos.pass
        })

        setDatos({ nombre: '', correo: '', pass: '', pass2: '' })
        setMensaje('Cuenta creada correctamente en Firebase')
    }

    return { rol, datos, mensaje, cambiarRol, cambiarDato, enviar }
}