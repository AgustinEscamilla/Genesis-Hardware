import { useEffect, useState } from 'react'
import { Boton } from '../../../components/formularios/boton'
import { TablaGenerica } from '../../../components/pedidos/tabla_generica'
import { actualizarEstadoUsuario, eliminarUsuario, escucharUsuariosPorTipo } from '../../../services/servicio_cuentas'

export function TablaCuentasFirestore({ tipo, titulo }) {
  const [cuentas, setCuentas] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [procesando, setProcesando] = useState(false)

  // aqui maestro yo escucho firestore para refrescar la tabla sin recargar la pagina
  useEffect(() => escucharUsuariosPorTipo(tipo, setCuentas, () => setMensaje('No se pudieron cargar las cuentas')), [tipo])

  const ejecutar = async (accion) => {
    setProcesando(true)
    setMensaje('')
    try { await accion(); setMensaje('Operacion guardada correctamente') } catch (error) { setMensaje(error?.message || 'No se pudo completar la operacion') } finally { setProcesando(false) }
  }
  
  // aqui maestro yo muestro estado y datos de onboarding en las tablas de staff
  return <div className="flex flex-col gap-4"><div><h3 className="text-xl font-bold text-texto">{titulo}</h3>{mensaje && <p className="mt-2 text-xs text-primario">{mensaje}</p>}</div><TablaGenerica encabezados={['Nombre', 'Rol', 'Correo', 'Puesto', 'Departamento', 'Estado', 'Acciones']} mensajeVacio="Datos faltantes por ahora">{cuentas.map((cuenta) => <tr key={cuenta.id} className="border-b border-borde/50"><td className="py-3 px-4 text-texto">{cuenta.nombre || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.rol || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.correo || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.puestoCargo || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.departamento || '-'}</td><td className="py-3 px-4 text-mutado">{cuenta.estadoActivo === false ? 'Inactivo' : 'Activo'}</td><td className="py-3 px-4"><div className="flex flex-wrap gap-2"><Boton variante="primario" disabled={procesando} className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => ejecutar(() => actualizarEstadoUsuario(tipo, cuenta.id, true))}>Activar</Boton><Boton variante="contorno" disabled={procesando} className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => ejecutar(() => actualizarEstadoUsuario(tipo, cuenta.id, false))}>Desactivar</Boton><Boton variante="contorno" disabled={procesando} className="px-3 py-2 text-xs uppercase tracking-wide" onClick={() => ejecutar(() => eliminarUsuario(tipo, cuenta.id))}>Eliminar</Boton></div></td></tr>)}</TablaGenerica></div>
}
