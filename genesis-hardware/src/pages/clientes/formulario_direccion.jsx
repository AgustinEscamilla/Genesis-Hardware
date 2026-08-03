import { CampoAjustesCliente } from './campo_ajustes_cliente'

// esto sirve para agrupar los campos de direccion y codigo postal del cliente
export function FormularioDireccion({ direccion, codigoPostal, alCambiarDireccion, alCambiarCodigoPostal }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <CampoAjustesCliente
          etiqueta="Dirección de vivienda"
          tipo="text"
          valor={direccion}
          alCambiar={alCambiarDireccion}
          autoCompletar="street-address"
        />
      </div>
      <CampoAjustesCliente
        etiqueta="Código postal"
        tipo="text"
        valor={codigoPostal}
        alCambiar={alCambiarCodigoPostal}
        autoCompletar="postal-code"
        requerido
        patron="^[0-9]{5}$"
        maxLongitud={5}
      />
    </div>
  )
}
