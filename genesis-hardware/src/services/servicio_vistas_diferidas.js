import { lazy } from 'react'

export const cargar_vista = (carga, nombre) => lazy(() => carga().then((modulo) => ({ default: modulo[nombre] })))
