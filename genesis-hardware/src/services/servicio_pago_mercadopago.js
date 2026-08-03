import { auth, configuracionFirebase } from "./conexion_firebase"

const url_pago = import.meta.env.VITE_MP_PAYMENT_FUNCTION_URL || `https://us-central1-` + configuracionFirebase.projectId + `.cloudfunctions.net/procesar_pago`
const url_estado_pago = url_pago.replace('/procesar_pago', '/consultar_estado_pago')
const url_pago_tarjeta = url_pago.replace('/procesar_pago', '/procesar_pago_tarjeta')

const con_encabezados_auth = async () => {
  const usuario = auth.currentUser
  if (!usuario) throw new Error("La sesion del cliente no esta disponible")
  const token = await usuario.getIdToken()
  return { "Content-Type": "application/json", Authorization: "Bearer " + token }
}

// aqui maestro yo pido al backend que cree la preferencia de Checkout Pro y me regrese la url para redirigir al cliente
export const iniciarPagoMercadoPago = async ({ carrito, zona_logistica, idempotencia }) => {
  const encabezados = await con_encabezados_auth()
  const respuesta = await fetch(url_pago, {
    method: "POST",
    headers: encabezados,
    body: JSON.stringify({ carrito, zona_logistica, idempotencia })
  })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) {
    console.error('Error al iniciar el pago', datos)
    throw new Error(datos.mensaje || datos.error || `Mercado Pago respondio ${respuesta.status}`)
  }
  return datos
}

// aqui maestro yo mando la tarjeta ya tokenizada (Payment Brick) para que el backend cobre directo, sin salir del sitio
export const crearPagoTarjetaMercadoPago = async ({ carrito, zona_logistica, idempotencia, tarjeta }) => {
  const encabezados = await con_encabezados_auth()
  const respuesta = await fetch(url_pago_tarjeta, {
    method: "POST",
    headers: encabezados,
    body: JSON.stringify({ carrito, zona_logistica, idempotencia, tarjeta })
  })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) {
    console.error('Error al procesar el pago con tarjeta', datos)
    throw new Error(datos.mensaje || datos.error || `Mercado Pago respondio ${respuesta.status}`)
  }
  return datos
}

// aqui maestro yo consulto el estado del pago cuando el cliente regresa del sitio de Mercado Pago
export const consultarEstadoPagoMercadoPago = async (referencia) => {
  const encabezados = await con_encabezados_auth()
  const respuesta = await fetch(`${url_estado_pago}?referencia=${encodeURIComponent(referencia)}`, { headers: encabezados })
  const datos = await respuesta.json().catch(() => ({}))
  if (!respuesta.ok) throw new Error(datos.mensaje || `No se pudo consultar el pago (${respuesta.status})`)
  return datos
}