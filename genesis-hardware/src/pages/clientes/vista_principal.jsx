import { BotonSalida } from '../../components/boton_salida'

export function VistaPrincipalCliente() {
  return (
    <div className="min-h-screen bg-fondo p-8 text-texto">
      <div className="mx-auto mb-6 flex w-full max-w-3xl justify-end">
        <BotonSalida />
      </div>
      <div className="mx-auto w-full max-w-3xl border border-borde bg-panel p-10 text-center">
        <p className="text-xs tracking-[0.35em] text-mutado mb-3">PORTAL CLIENTE</p>
        <h1 className="text-4xl font-black mb-4">Panel de cliente</h1>
        <p className="text-sm text-mutado">Vista base lista para consultas, seguimiento de pedidos y soporte.</p>
      </div>
    </div>
  )
}