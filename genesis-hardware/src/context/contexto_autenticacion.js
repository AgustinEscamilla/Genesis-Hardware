// aqui maestro yo dejo el contexto puro para que el archivo de componente pase el lint
import { createContext } from 'react'

export const ContextoAutenticacion = createContext({ usuarioActual: null, cargando: true })
