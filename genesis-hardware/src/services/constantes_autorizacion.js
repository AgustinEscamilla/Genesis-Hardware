export const roles = Object.freeze({
  administrador: 'administrador',
  empleado: 'empleado',
  repartidor: 'repartidor',
  cliente: 'cliente',
})

export const rutas_por_rol = Object.freeze({
  administrador: '/administrador',
  empleado: '/empleados',
  repartidor: '/repartidores',
  cliente: '/clientes',
})

export const roles_staff = Object.freeze([roles.empleado, roles.repartidor])
