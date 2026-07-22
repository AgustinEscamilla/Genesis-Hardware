import { useEffect, useState } from 'react'
import { buscarPerfilUsuario, inferirRolPorCorreo } from '../services/servicio_usuarios'

// esto sirve para resolver el rol real guardado en firestore para la sesion activa
export function useRolSesion(usuarioActual) {
    const [rol, setRol] = useState(undefined)

    useEffect(() => {
        if (!usuarioActual) return
        const correoSesion = usuarioActual.correo || usuarioActual.email
        buscarPerfilUsuario(usuarioActual.uid)
            .then((perfil) => setRol(perfil?.rol || inferirRolPorCorreo(correoSesion) || null))
            .catch(() => setRol(inferirRolPorCorreo(correoSesion) || null))
    }, [usuarioActual])

    return rol
}
