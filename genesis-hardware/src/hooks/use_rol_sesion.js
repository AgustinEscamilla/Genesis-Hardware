import { useEffect, useState } from 'react'
import { buscarPerfilUsuario, inferirRolPorCorreo } from '../services/servicio_usuarios'

// esto sirve para resolver el rol real guardado en firestore para la sesion activa
export function useRolSesion(usuarioActual) {
    const [resultado, setResultado] = useState({ uid: null, rol: undefined })

    useEffect(() => {
        if (!usuarioActual) return undefined
        let activo = true
        const correoSesion = usuarioActual.correo || usuarioActual.email
        buscarPerfilUsuario(usuarioActual.uid)
            .then((perfil) => activo && setResultado({ uid: usuarioActual.uid, rol: perfil?.rol || inferirRolPorCorreo(correoSesion) || null }))
            .catch(() => activo && setResultado({ uid: usuarioActual.uid, rol: inferirRolPorCorreo(correoSesion) || null }))
        return () => { activo = false }
    }, [usuarioActual])

    return resultado.uid === usuarioActual?.uid ? resultado.rol : undefined
}
