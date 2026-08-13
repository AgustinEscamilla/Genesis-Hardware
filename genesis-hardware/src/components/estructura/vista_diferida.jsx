import { Suspense } from 'react'

export function VistaDiferida({ componente: Componente }) {
  return (
    <Suspense fallback={<div className="flex min-h-40 items-center justify-center bg-fondo text-xs text-mutado">Cargando modulo</div>}>
      <Componente />
    </Suspense>
  )
}
