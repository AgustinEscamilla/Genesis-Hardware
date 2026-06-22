import { ContenedorPrincipal } from './components/contenedor_principal'
import { VistaPrincipal } from './pages/empleados/produccion/vista_principal'

function App() {
  return (
    <ContenedorPrincipal>
      <VistaPrincipal />
    </ContenedorPrincipal>
  )
}

export default App