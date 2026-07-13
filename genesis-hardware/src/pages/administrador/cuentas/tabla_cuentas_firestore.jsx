import { useEffect, useState } from 'react'
import { Boton } from '../../../components/boton'
import { TablaGenerica } from '../../../components/tabla_generica'
import { actualizarEstadoUsuario, eliminarUsuario, escucharUsuariosPorTipo } from '../../../services/servicio_cuentas'

export function TablaCuentasFirestore({ tipo, titulo }) {
  const [cuentas, setCuentas] = useState([])
  
  // aqui maestro yo escucho firestore para refrescar la tabla sin recargar la pagina
  useEffect(() => escucharUsuariosPorTipo(tipo, setCuentas), [tipo])
  
  // aqui maestro yo muestro estado y datos de onboarding en las tablas de staff
  return <div className="flex flex-col gap-4"><h3 className="text-xl font-bold text-texto">{titulo}</h3><TablaGenerica encabezados={['Nombre', 'Rol', 'Correo', 'Puesto', 'Departamento', 'Estado', 'Acciones']} mensajeVacio="Datos faltantes por ahora">{cuentas.map((cuenta) => <tr key={cuenta.id} className="border-b border-borde/50"><td className="py-3 px-4 text-texto">{cuenta.nombre || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.rol || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.correo || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.puestoCargo || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.departamento || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.estadoActivo === false ? 'Inactivo' : 'Activo'}</td><td className="py-3 px-4"><div className="flex flex-wrap gap-2"><Boton variante="primario" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => actualizarEstadoUsuario(tipo, cuenta.id, true)}>Activar</Boton><Boton variante="contorno" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => actualizarEstadoUsuario(tipo, cuenta.id, false)}>Desactivar</Boton><Boton variante="contorno" className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => eliminarUsuario(tipo, cuenta.id)}>Eliminar</Boton></div></td></tr>)}</TablaGenerica></div>
}