import { Link } from 'react-router-dom'
import { useAjustesCliente } from '../../hooks/use_ajustes_cliente'
import { FormularioAjustesCliente } from './formulario_ajustes_cliente'

// aqui maestro yo muestro el formulario donde el cliente actualiza su perfil
export function VistaAjustesCliente() {
  const { forma, cambiar, guardar, mensaje } = useAjustesCliente()

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-borde bg-panel px-4 py-3 text-xs uppercase tracking-widest text-mutado">
          <Link to="/clientes" className="text-primario transition-colors hover:text-texto">Volver al catalogo</Link>
          <span>Perfil de cliente</span>
        </div>
        <header className="rounded-xl bg-panel border border-borde p-6 shadow-sm">
          <h1 className="text-3xl font-bold mb-2">Perfil del cliente</h1>
          <p className="text-sm text-texto/70">Actualiza tus datos de perfil para que la entrega y la comunicación sean correctas.</p>
        </header>

        <section className="rounded-xl bg-panel border border-borde p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Información de perfil</h2>
          <FormularioAjustesCliente forma={forma} cambiar={cambiar} guardar={guardar} mensaje={mensaje} />
        </section>
      </div>
    </div>
  )
}
