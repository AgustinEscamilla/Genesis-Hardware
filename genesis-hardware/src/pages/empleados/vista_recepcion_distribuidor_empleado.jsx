import { Link } from 'react-router-dom'
import { TarjetaEstadoAbastecimiento } from '../../components/tarjeta_estado_abastecimiento'
import { TablaOperacionesDistribuidor } from '../../components/tabla_operaciones_distribuidor'
import { useOperacionesDistribuidor } from '../../hooks/use_operaciones_distribuidor'

const estados = [
  ['En tránsito', '0', 'Pedidos enviados por el distribuidor', 'terciario'],
  ['Listos para recibir', '0', 'Mercancía que llegó a sucursal', 'primario'],
  ['Incidencias', '0', 'Diferencias por revisar', 'secundario'],
]

export function VistaRecepcionDistribuidorEmpleado() {
  const { operaciones, cargando } = useOperacionesDistribuidor()
  return <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-borde pb-5">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Operación de almacén</p><h1 className="mt-2 text-3xl font-black text-texto">Recepción de proveedor</h1><p className="mt-2 max-w-2xl text-sm text-mutado">Consulta lo que viene del distribuidor y registra la mercancía cuando llegue</p></div>
      <Link to="../inventario" className="border border-borde px-4 py-2 text-xs font-bold uppercase tracking-wide text-texto hover:border-primario">Volver a inventario</Link>
    </header>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">{estados.map(([etiqueta, valor, descripcion, tono]) => <TarjetaEstadoAbastecimiento key={etiqueta} etiqueta={etiqueta} valor={valor} descripcion={descripcion} tono={tono} />)}</div>
    <article className="border border-terciario/40 bg-terciario/5 p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-terciario">Vista operativa</p><h2 className="mt-2 text-xl font-black text-texto">El sistema prepara las solicitudes</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-mutado">No necesitas crear solicitudes manuales desde aquí. Cuando el distribuidor confirme un envío aparecerá en esta pantalla para recibirlo y actualizar el inventario de la sucursal.</p></article>
    <article><div className="mb-3 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-widest text-primario">Seguimiento</p><h2 className="mt-2 text-xl font-black text-texto">Mercancía del distribuidor</h2></div><span className="text-xs text-mutado">{cargando ? 'Actualizando' : 'Actualización automática'}</span></div><TablaOperacionesDistribuidor operaciones={operaciones} mensaje_vacio="No hay mercancía pendiente de recepción" /></article>
  </section>
}
