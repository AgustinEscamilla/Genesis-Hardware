import { useEffect, useState } from 'react'
import { Boton } from '../../components/boton'
import { TablaGenerica } from '../../components/tabla_generica'
import { actualizarEstadoCuenta, eliminarCuenta, escucharCuentas } from '../../services/servicio_cuentas'

// aqui maestro yo conecto la tabla a firestore para listar las cuentas
export function TablaCuentasFirestore({ tipo, titulo }) {
  const [cuentas, setCuentas] = useState([])
  
  // esto sirve para traer los datos y actualizar la vista si hay cambios en la base de datos
  useEffect(() => escucharCuentas(tipo, setCuentas), [tipo])
  
  return <div className="flex flex-col gap-4"><h3 className="text-xl font-bold text-texto">{titulo}</h3><TablaGenerica encabezados={['Nombre', 'Rol', 'Correo', 'Acciones']} mensajeVacio="Datos faltantes por ahora">{cuentas.map((cuenta) => <tr key={cuenta.id} className="border-b border-borde/50"><td className="py-3 px-4 text-texto">{cuenta.nombre}</td><td className="py-3 px-4 text-mutado">{cuenta.rol}</td><td className="py-3 px-4 text-mutado">{cuenta.correo}</td><td className="py-3 px-4"><div className="flex flex-wrap gap-2"><Boton variante="primario" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => actualizarEstadoCuenta(tipo, cuenta.id, 'Activo')}>Activo</Boton><Boton variante="contorno" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => actualizarEstadoCuenta(tipo, cuenta.id, 'Inactivo')}>Desactivar</Boton><Boton variante="contorno" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => eliminarCuenta(tipo, cuenta.id)}>Eliminar</Boton></div></td></tr>)}</TablaGenerica></div>
}