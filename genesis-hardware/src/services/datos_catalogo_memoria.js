import { plantillaEspecificacionesMemoria } from './plantillas_especificaciones_tecnicas'

export const productos_memoria = [
  {
    nombre: 'Corsair Dominator Titanium 96GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x48GB DDR5-6000 CL30 RGB iluminado disipador de aluminio Intel XMP 3.0',
    descripcionPrecios: 'Memoria extrema para streaming gaming y render Capacidad profesional',
    stockVisible: 5,
    precio: 9999,
    imagen: 'https://via.placeholder.com/400x300?text=DDR5+96GB',
    especificaciones_tecnicas: plantillaEspecificacionesMemoria({ capacidad: '96 GB (2x48GB)', factor_forma: 'DIMM', frecuencia: 'DDR5-6000 MHz', latencia: 'CL30', ancho: '133 mm', peso: '75 g por modulo', profundidad: '7 mm', altura: '44.5 mm', componente_para: 'Streaming render y gaming extremo', voltaje: '1.4 V', tecnologia: 'Intel XMP 3.0', velocidad_transferencia: '48 GB/s' })
  },
  {
    nombre: 'G.SKILL Trident Z5 64GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x32GB DDR5-6400 CL32 RGB Trident low profile Intel y AMD compatible',
    descripcionPrecios: 'RAM de alta frecuencia para workstations Excelente estabilidad en overclock',
    stockVisible: 10,
    precio: 6999,
    imagen: 'https://via.placeholder.com/400x300?text=DDR5+64GB',
    especificaciones_tecnicas: plantillaEspecificacionesMemoria({ capacidad: '64 GB (2x32GB)', factor_forma: 'DIMM', frecuencia: 'DDR5-6400 MHz', latencia: 'CL32', ancho: '133 mm', peso: '65 g por modulo', profundidad: '7 mm', altura: '44 mm', componente_para: 'Workstations y overclock', voltaje: '1.4 V', tecnologia: 'Intel XMP 3.0', velocidad_transferencia: '51.2 GB/s' })
  },
  {
    nombre: 'Kingston Fury Beast 32GB DDR5',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x16GB DDR5-6000 CL30 disipador negro mate perfil bajo JEDEC estable',
    descripcionPrecios: 'RAM confiable para gaming Kingston Fury es conocida por durabilidad',
    stockVisible: 18,
    precio: 2799,
    imagen: 'https://via.placeholder.com/400x300?text=Kingston+32GB',
    especificaciones_tecnicas: plantillaEspecificacionesMemoria({ capacidad: '32 GB (2x16GB)', factor_forma: 'DIMM', frecuencia: 'DDR5-6000 MHz', latencia: 'CL30', ancho: '133 mm', peso: '35 g por modulo', profundidad: '7 mm', altura: '34.9 mm', componente_para: 'Gaming general', voltaje: '1.35 V', tecnologia: 'JEDEC estable', velocidad_transferencia: '48 GB/s' })
  },
  {
    nombre: 'Corsair Vengeance DDR5 32GB',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x16GB DDR5-5600 CL28 disipador compacto bajo perfil XMP 3.0',
    descripcionPrecios: 'RAM presupuestaria DDR5 Perfecta para builds gaming economicos',
    stockVisible: 22,
    precio: 2399,
    imagen: 'https://via.placeholder.com/400x300?text=Corsair+RAM',
    especificaciones_tecnicas: plantillaEspecificacionesMemoria({ capacidad: '32 GB (2x16GB)', factor_forma: 'DIMM', frecuencia: 'DDR5-5600 MHz', latencia: 'CL28', ancho: '133 mm', peso: '32 g por modulo', profundidad: '7 mm', altura: '34.9 mm', componente_para: 'Builds gaming economicos', voltaje: '1.25 V', tecnologia: 'Intel XMP 3.0', velocidad_transferencia: '44.8 GB/s' })
  },
  {
    nombre: 'ADATA XPG Spectrix D35 16GB DDR4',
    categoria: 'Memoria RAM',
    descripcionTecnica: 'Kit 2x8GB DDR4-3600 CL18 RGB Spectrix disipador aluminio Intel y AMD compatible',
    descripcionPrecios: 'RAM DDR4 RGB para gaming retro Compatible con builds AM4 antiguos',
    stockVisible: 16,
    precio: 1299,
    imagen: 'https://via.placeholder.com/400x300?text=ADATA+16GB',
    especificaciones_tecnicas: plantillaEspecificacionesMemoria({ capacidad: '16 GB (2x8GB)', factor_forma: 'DIMM', frecuencia: 'DDR4-3600 MHz', latencia: 'CL18', ancho: '133 mm', peso: '30 g por modulo', profundidad: '7 mm', altura: '35.3 mm', componente_para: 'Builds AM4 y gaming retro', voltaje: '1.35 V', tecnologia: 'Intel y AMD XMP', velocidad_transferencia: '28.8 GB/s' })
  },
]
