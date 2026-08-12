import { useEffect, useState } from 'react'

const CLAVE_TEMA = 'genesis-tema-ui'
const TEMA_OSCURO = 'dark'
const TEMA_CLARO = 'light'

const leerTemaInicial = () => {
  const guardado = localStorage.getItem(CLAVE_TEMA)
  return guardado === TEMA_CLARO ? TEMA_CLARO : TEMA_OSCURO
}

export function InterruptorTema() {
  const [tema, setTema] = useState(TEMA_OSCURO)

  useEffect(() => {
    const inicial = leerTemaInicial()
    setTema(inicial)
    document.documentElement.setAttribute('data-theme', inicial)
  }, [])

  const alternarTema = () => {
    const siguiente = tema === TEMA_OSCURO ? TEMA_CLARO : TEMA_OSCURO
    setTema(siguiente)
    localStorage.setItem(CLAVE_TEMA, siguiente)
    document.documentElement.setAttribute('data-theme', siguiente)
  }

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="fixed bottom-4 right-4 z-[70] rounded-full border border-borde bg-panel px-4 py-2 text-xs font-bold uppercase tracking-wide text-texto shadow-vidrio transition hover:-translate-y-0.5 hover:border-primario"
      aria-label="Alternar modo de color"
    >
      {tema === TEMA_OSCURO ? 'Modo claro' : 'Modo oscuro'}
    </button>
  )
}
