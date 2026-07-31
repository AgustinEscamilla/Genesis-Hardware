// aqui maestro yo centralizo el formato de precios en pesos mexicanos para toda la app
const formateador = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

export const formatear_precio = (valor) => formateador.format(Number(valor) || 0)
