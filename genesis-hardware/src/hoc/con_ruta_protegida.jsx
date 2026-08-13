import { RutaProtegida } from '../components/estructura/ruta_protegida'

export const con_ruta_protegida = (Componente, rol_permitido) => {
  const ComponenteProtegido = (propiedades) => (
    <RutaProtegida rolPermitido={rol_permitido}>
      <Componente {...propiedades} />
    </RutaProtegida>
  )
  return ComponenteProtegido
}
