import { CampoAjustesCliente } from './campo_ajustes_cliente'

// esto sirve para agrupar los campos de direccion y codigo postal del cliente
export function FormularioDireccion({ forma, cambiar }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <CampoAjustesCliente etiqueta="Calle" tipo="text" valor={forma.calle} alCambiar={(valor) => cambiar('calle', valor)} requerido autoCompletar="street-address" />
      <CampoAjustesCliente etiqueta="Numero exterior" tipo="text" valor={forma.numeroExterior} alCambiar={(valor) => cambiar('numeroExterior', valor)} requerido />
      <CampoAjustesCliente etiqueta="Numero interior opcional" tipo="text" valor={forma.numeroInterior} alCambiar={(valor) => cambiar('numeroInterior', valor)} />
      <CampoAjustesCliente etiqueta="Numero de lote opcional" tipo="text" valor={forma.numeroLote} alCambiar={(valor) => cambiar('numeroLote', valor)} />
      <CampoAjustesCliente etiqueta="Colonia o fraccionamiento" tipo="text" valor={forma.colonia} alCambiar={(valor) => cambiar('colonia', valor)} requerido />
      <CampoAjustesCliente etiqueta="Municipio" tipo="text" valor={forma.municipio} alCambiar={(valor) => cambiar('municipio', valor)} requerido />
      <CampoAjustesCliente etiqueta="Estado" tipo="text" valor={forma.estado} alCambiar={(valor) => cambiar('estado', valor)} requerido />
      <CampoAjustesCliente etiqueta="Codigo postal" tipo="text" valor={forma.codigoPostal} alCambiar={(valor) => cambiar('codigoPostal', valor)} requerido patron="^24[0-9]{3}$" maxLongitud={5} placeholder="24000" ayuda="Codigo postal de la ciudad de Campeche" />
      <div className="sm:col-span-2"><CampoAjustesCliente etiqueta="Referencias opcionales" tipo="text" valor={forma.referencias} alCambiar={(valor) => cambiar('referencias', valor)} /></div>
    </div>
  )
}
