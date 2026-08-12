import { Link } from 'react-router-dom'
import { useOnboardingStaff } from '../hooks/use_onboarding_staff'

const datosRepartidor = {
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  telefono: '',
  direccionVivienda: '',
  tipoVehiculo: '',
}

const campoBase = (label, name, value, onChange, type = 'text', placeholder = '') => (
  <label key={name} className="flex flex-col gap-2 text-sm font-medium text-texto">
    <span className="text-xs font-bold uppercase tracking-[0.18em] text-mutado">{label}</span>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded-xl border border-borde bg-fondo/80 px-4 py-3 text-sm text-texto shadow-inner shadow-black/20 outline-none transition focus:border-primario focus:ring-2 focus:ring-primario/20"
    />
  </label>
)

export function VistaOnboardingRepartidor() {
  const { datos, cambiarDato, guardar, guardando, cargando_perfil, mensaje_error } = useOnboardingStaff({ rol: 'repartidor', rutaPanel: '/repartidores', datosIniciales: datosRepartidor })

  return (
    <div className="min-h-screen bg-fondo p-6 text-texto">
      <div className="mx-auto max-w-5xl rounded-3xl border border-borde bg-panel p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-borde pb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-vino">Registro inicial</p>
            <h1 className="mt-2 text-3xl font-black text-texto">Completa tu perfil de repartidor</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-primario/40 bg-primario/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primario">Paso 1</div>
            <Link to="/repartidores" className="rounded-full border border-borde px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-mutado transition hover:border-primario hover:text-primario">
              Volver
            </Link>
          </div>
        </div>

        <form onSubmit={guardar} className="space-y-6">
          {cargando_perfil && <p className="rounded-xl border border-borde bg-fondo/70 px-4 py-3 text-sm text-mutado">Cargando datos actuales...</p>}

          <div className="space-y-5">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-mutado">Datos personales</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {campoBase('Nombre(s)', 'nombres', datos.nombres, cambiarDato, 'text', 'Ej. Carlos')}
              {campoBase('Apellido paterno', 'apellidoPaterno', datos.apellidoPaterno, cambiarDato, 'text', 'Ej. Perez')}
              {campoBase('Apellido materno', 'apellidoMaterno', datos.apellidoMaterno, cambiarDato, 'text', 'Ej. Lopez')}
              {campoBase('Telefono', 'telefono', datos.telefono, cambiarDato, 'tel', '10 digitos')}
              {campoBase('Direccion', 'direccionVivienda', datos.direccionVivienda, cambiarDato, 'text', 'Calle, numero y colonia')}
              <label className="flex flex-col gap-2 text-sm font-medium text-texto">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-mutado">Tipo de vehiculo</span>
                <select
                  name="tipoVehiculo"
                  value={datos.tipoVehiculo || ''}
                  onChange={cambiarDato}
                  className="rounded-xl border border-borde bg-fondo/80 px-4 py-3 text-sm text-texto shadow-inner shadow-black/20 outline-none transition focus:border-primario focus:ring-2 focus:ring-primario/20"
                >
                  <option value="">Selecciona una opcion</option>
                  <option value="coche">Coche</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="camion">Camion</option>
                </select>
              </label>
            </div>
          </div>

          {mensaje_error && (
            <div className="rounded-xl border border-primario/50 bg-primario/10 px-4 py-3 text-sm font-medium text-primario">
              {mensaje_error}
            </div>
          )}

          <button type="submit" disabled={guardando || cargando_perfil} className="w-full rounded-xl border border-primario bg-gradient-to-r from-primario to-red-500 px-5 py-4 text-base font-black uppercase tracking-[0.2em] text-fondo shadow-lg shadow-primario/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  )
}
