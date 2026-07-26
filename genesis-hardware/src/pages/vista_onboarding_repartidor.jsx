import { useOnboardingStaff } from '../hooks/use_onboarding_staff'

const datosRepartidor = { nombres: '', apellidoPaterno: '', apellidoMaterno: '', direccionVivienda: '', telefono: '' }

export function VistaOnboardingRepartidor() {
  const { datos, cambiarDato, guardar, guardando, mensaje_error } = useOnboardingStaff({ rol: 'repartidor', rutaPanel: '/repartidores', datosIniciales: datosRepartidor })

  // pos esto funciona yo pido solo cinco campos base para primer ingreso repartidor
  return <div className="min-h-screen bg-fondo p-6 text-texto"><form onSubmit={guardar} className="mx-auto grid max-w-6xl grid-cols-1 gap-3 border border-borde bg-panel p-6 md:grid-cols-2">{Object.keys(datos).map((campo) => <input key={campo} name={campo} value={datos[campo]} onChange={cambiarDato} placeholder={campo} className="border border-borde bg-fondo px-3 py-2 text-sm" />)}<button type="submit" disabled={guardando} className="md:col-span-2 border border-primario bg-primario px-4 py-2 font-bold text-fondo disabled:opacity-50">{guardando ? 'Guardando...' : 'Guardar y continuar'}</button>{mensaje_error && <p className="md:col-span-2 text-sm text-primario">{mensaje_error}</p>}</form></div>
}
