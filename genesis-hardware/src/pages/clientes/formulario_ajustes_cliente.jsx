import { CampoAjustesCliente } from './campo_ajustes_cliente'
import { FormularioDireccion } from './formulario_direccion'

// esto sirve para capturar los campos editables del perfil del cliente
export function FormularioAjustesCliente({ forma, cambiar, guardar, mensaje }) {
  return (
    <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); guardar() }}>
      <CampoAjustesCliente
        etiqueta="Nombre completo"
        tipo="text"
        valor={forma.nombre}
        alCambiar={(valor) => cambiar('nombre', valor)}
        autoCompletar="name"
      />
      <FormularioDireccion
        direccion={forma.direccionVivienda}
        codigoPostal={forma.codigoPostal}
        alCambiarDireccion={(valor) => cambiar('direccionVivienda', valor)}
        alCambiarCodigoPostal={(valor) => cambiar('codigoPostal', valor)}
      />
      <CampoAjustesCliente
        etiqueta="Teléfono"
        tipo="tel"
        valor={forma.telefono}
        alCambiar={(valor) => cambiar('telefono', valor)}
        autoCompletar="tel"
      />

      <div className="flex items-center gap-4 pt-3">
        <button
          type="submit"
          className="rounded border border-primario bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primario transition-colors hover:bg-primario hover:text-fondo"
        >
          Guardar cambios
        </button>
        {mensaje && <p className="text-xs text-primario">{mensaje}</p>}
      </div>
    </form>
  )
}
