import { useOnboardingStaff } from '../hooks/use_onboarding_staff'

const datosEmpleado = { nombres: '', apellidoPaterno: '', apellidoMaterno: '', direccionVivienda: '', telefono: '' }

export function VistaOnboardingEmpleado() {
  const { datos, cambiarDato, guardar } = useOnboardingStaff({ rol: 'empleado', rutaPanel: '/empleados', datosIniciales: datosEmpleado })

  // aqui maestro yo pido solo cinco campos base para primer ingreso empleado
  return <div className="min-h-screen bg-fondo p-6 text-texto"><form onSubmit={guardar} className="mx-auto grid max-w-6xl grid-cols-1 gap-3 border border-borde bg-panel p-6 md:grid-cols-2">{Object.keys(datos).map((campo) => <input key={campo} name={campo} value={datos[campo]} onChange={cambiarDato} placeholder={campo} className="border border-borde bg-fondo px-3 py-2 text-sm" />)}<button type="submit" className="md:col-span-2 border border-primario bg-primario px-4 py-2 font-bold text-fondo">Guardar y continuar</button></form></div>
}