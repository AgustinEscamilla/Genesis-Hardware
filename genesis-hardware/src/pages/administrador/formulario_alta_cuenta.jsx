import { Boton } from '../../components/boton'
import { EntradaTexto } from '../../components/entrada_texto'

// maestro funciona asi yo armo la vista del formulario sin logica para que el padre controle todo
export function FormularioAltaCuenta({ tipoCuenta, formulario, mensajeFormulario, alCambiarTipo, alCambiar, alLimpiar, alEnviar }) {
  
  // aqui maestro yo retorno la interfaz usando puras clases de tailwind
  return (
    <div className="bg-panel border border-borde p-6 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col gap-2"><h3 className="text-xl font-bold text-texto">Alta de cuentas</h3><p className="text-sm text-mutado">Selecciona el tipo de cuenta y completa los datos básicos.</p></div>
      <div className="flex flex-wrap gap-3">
        <Boton variante={tipoCuenta === 'empleado' ? 'primario' : 'contorno'} className="px-4 py-2 text-xs uppercase tracking-wide" onClick={() => alCambiarTipo('empleado')}>Empleado</Boton>
        <Boton variante={tipoCuenta === 'repartidor' ? 'primario' : 'contorno'} className="px-4 py-2 text-xs uppercase tracking-wide" onClick={() => alCambiarTipo('repartidor')}>Repartidor</Boton>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={alEnviar}>
        <EntradaTexto id="nombre-cuenta" tipo="text" etiqueta="Nombre completo" valor={formulario.nombre} alCambiar={alCambiar('nombre')} />
        <EntradaTexto id="correo-cuenta" tipo="email" etiqueta="Correo institucional" valor={formulario.correo} alCambiar={alCambiar('correo')} />
        <EntradaTexto id="contrasena-cuenta" tipo="password" etiqueta="Contraseña temporal" valor={formulario.contrasena} alCambiar={alCambiar('contrasena')} />
        <EntradaTexto id="confirmar-cuenta" tipo="password" etiqueta="Confirmar contraseña" valor={formulario.confirmar} alCambiar={alCambiar('confirmar')} />
        <div className="md:col-span-2 flex flex-col gap-1.5"><label className="text-sm font-bold text-texto" htmlFor="tipo-cuenta">Tipo de cuenta</label><select id="tipo-cuenta" value={tipoCuenta} onChange={(event) => alCambiarTipo(event.target.value)} className="w-full bg-fondo border border-borde text-texto px-3 py-2 focus:outline-none focus:border-primario"><option value="empleado">Empleado</option><option value="repartidor">Repartidor</option></select></div>
        <div className="md:col-span-2 flex justify-end gap-3 pt-2"><Boton variante="contorno" className="px-4 py-2 text-xs uppercase tracking-wide" onClick={alLimpiar} type="button">Limpiar</Boton><Boton variante="primario" className="px-4 py-2 text-xs uppercase tracking-wide" type="submit">Crear cuenta</Boton></div>
        {mensajeFormulario ? <p className="md:col-span-2 text-sm text-mutado">{mensajeFormulario}</p> : null}
      </form>
    </div>
  )
}