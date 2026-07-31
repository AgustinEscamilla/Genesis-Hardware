import { Link } from 'react-router-dom'
import { TarjetaEstadoAbastecimiento } from '../../components/tarjeta_estado_abastecimiento'
import { TablaOperacionesDistribuidor } from '../../components/tabla_operaciones_distribuidor'
import { useOperacionesDistribuidor } from '../../hooks/use_operaciones_distribuidor'

export function VistaAbastecimientoAdministrador() {
  const { operaciones, estados, cargando } = useOperacionesDistribuidor()
  const tarjetas = [['Solicitudes abiertas', estados.abiertas, 'Dropshipping y reabastecimiento', 'primario'], ['En tránsito', estados.transito, 'Mercancía enviada a sucursal', 'terciario'], ['Incidencias', estados.incidencias, 'Operaciones que requieren revisión', 'secundario'], ['RMA abiertas', estados.rma, 'Garantías en seguimiento', 'mutado']]
  return <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-borde pb-5">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Cadena de suministro</p><h1 className="mt-2 text-3xl font-black text-texto">Abastecimiento</h1><p className="mt-2 max-w-2xl text-sm text-mutado">Supervisa las solicitudes que conectan Genesis con el distribuidor</p></div>
      <Link to="../dashboard" className="border border-borde px-4 py-2 text-xs font-bold uppercase tracking-wide text-texto hover:border-primario">Volver a reportes</Link>
    </header>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{tarjetas.map(([etiqueta, valor, descripcion, tono]) => <TarjetaEstadoAbastecimiento key={etiqueta} etiqueta={etiqueta} valor={valor} descripcion={descripcion} tono={tono} />)}</div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <article className="border border-borde bg-panel p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-primario">Operaciones recientes</p><h2 className="mt-2 text-xl font-black text-texto">Control del distribuidor</h2><p className="mb-5 mt-2 text-sm text-mutado">Cada operación deberá conservar su estado, respuesta e identificador externo</p><TablaOperacionesDistribuidor operaciones={operaciones} mensaje_vacio={cargando ? 'Cargando operaciones' : 'Aún no hay operaciones sincronizadas'} /></article>
      <article className="border border-borde bg-panel p-5"><p className="text-[10px] font-bold uppercase tracking-widest text-terciario">Flujo automático</p><h2 className="mt-2 text-xl font-black text-texto">Cómo funciona</h2><ol className="mt-5 space-y-4 text-sm text-mutado"><li><span className="mr-3 text-primario">01</span>Se confirma la compra</li><li><span className="mr-3 text-primario">02</span>Se calcula el faltante local</li><li><span className="mr-3 text-primario">03</span>Se envía la solicitud al distribuidor</li><li><span className="mr-3 text-primario">04</span>Se actualiza el estado de la operación</li></ol></article>
    </div>
  </section>
}
