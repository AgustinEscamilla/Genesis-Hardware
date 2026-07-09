export function FormularioPerfilCliente({ datos, alCambiar, alGuardar }) {
  // esto sirve yo pido datos fiscales y comerciales del cliente
  return <form onSubmit={alGuardar} className="grid grid-cols-1 gap-3 md:grid-cols-2">{Object.keys(datos).map((campo) => <input key={campo} name={campo} value={datos[campo]} onChange={alCambiar} placeholder={campo} className="border border-borde bg-fondo px-3 py-2 text-sm text-texto" />)}<button type="submit" className="md:col-span-2 border border-primario bg-primario px-4 py-2 font-bold text-fondo">Guardar perfil cliente</button></form>
}