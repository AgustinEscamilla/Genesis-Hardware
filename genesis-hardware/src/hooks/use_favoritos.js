import { useEffect, useState } from 'react'

const clave_favoritos = 'genesis_hardware_favoritos'

export function useFavoritos() {
  const [favoritos, set_favoritos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(clave_favoritos) || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(clave_favoritos, JSON.stringify(favoritos))
  }, [favoritos])

  const alternar_favorito = (id) => set_favoritos((actuales) =>
    actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id])

  return { favoritos, alternar_favorito }
}
