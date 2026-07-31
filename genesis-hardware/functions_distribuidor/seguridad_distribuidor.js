import { timingSafeEqual } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { defineSecret } from 'firebase-functions/params'

export const distribuidor_api_key = defineSecret('DISTRIBUIDOR_API_KEY')

// esto sirve para comparar la api key recibida contra la esperada sin filtrar tiempo de respuesta
export const validar_api_key = (peticion) => {
    const recibida = String(peticion.headers['x-api-key'] || '')
    const esperada = distribuidor_api_key.value() || ''
    if (!recibida || !esperada) return false
    const buffer_recibida = Buffer.from(recibida)
    const buffer_esperada = Buffer.from(esperada)
    if (buffer_recibida.length !== buffer_esperada.length) return false
    return timingSafeEqual(buffer_recibida, buffer_esperada)
}
