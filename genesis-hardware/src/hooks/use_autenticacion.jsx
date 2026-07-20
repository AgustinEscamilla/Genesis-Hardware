// aqui maestro yo documente este archivo para mantener trazabilidad
import { useContext } from 'react'
import { ContextoAutenticacion } from '../context/contexto_autenticacion'

// pos esto funciona para leer la sesion compartida sin abrir otro listener
export function useAutenticacion() {
  return useContext(ContextoAutenticacion)
}