import { plantillaEspecificacionesSsd } from './plantillas_especificaciones_tecnicas'

export const productos_ssd = [
  {
    nombre: 'Samsung 990 Pro 4TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0 4TB velocidad 7100MB/s lectura 6000MB/s escritura 1200TBW durabilidad',
    descripcionPrecios: 'SSD profesional para edicion 4K y gaming competitivo Lidera en velocidad',
    stockVisible: 8,
    precio: 6999,
    imagen: 'https://via.placeholder.com/400x300?text=Samsung+990',
    especificaciones_tecnicas: plantillaEspecificacionesSsd({ capacidad: '4 TB', factor_forma: 'M.2 2280', temperatura: '0°C a 70°C', interfaz: 'PCIe 4.0 x4 NVMe', ancho: '22 mm', peso: '9 g', profundidad: '80 mm', altura: '2.3 mm', componente_para: 'Gaming y edicion 4K', compatible_nvme: 'Si', velocidad_lectura: '7100 MB/s', velocidad_escritura: '6900 MB/s' })
  },
  {
    nombre: 'Western Digital Black SN850X 2TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0 2TB velocidad 7100MB/s lectura formato M.2 2280 disipador aluminio',
    descripcionPrecios: 'SSD gaming profesional Compatible con PS5 y gaming extremo',
    stockVisible: 13,
    precio: 3999,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Black+2TB',
    especificaciones_tecnicas: plantillaEspecificacionesSsd({ capacidad: '2 TB', factor_forma: 'M.2 2280', temperatura: '0°C a 70°C', interfaz: 'PCIe 4.0 x4 NVMe', ancho: '22 mm', peso: '8 g', profundidad: '80 mm', altura: '2.38 mm', componente_para: 'Gaming y consolas PS5', compatible_nvme: 'Si', velocidad_lectura: '7300 MB/s', velocidad_escritura: '6600 MB/s' })
  },
  {
    nombre: 'Corsair MP600 1TB',
    categoria: 'SSD NVMe',
    descripcionTecnica: 'NVMe PCIe 4.0 1TB 4950MB/s lectura 3950MB/s escritura diseno compacto',
    descripcionPrecios: 'SSD presupuestario PCIe 4.0 Excelente para gaming economico',
    stockVisible: 20,
    precio: 1799,
    imagen: 'https://via.placeholder.com/400x300?text=Corsair+1TB',
    especificaciones_tecnicas: plantillaEspecificacionesSsd({ capacidad: '1 TB', factor_forma: 'M.2 2280', temperatura: '0°C a 70°C', interfaz: 'PCIe 4.0 x4 NVMe', ancho: '22 mm', peso: '8 g', profundidad: '80 mm', altura: '2.3 mm', componente_para: 'Gaming economico', compatible_nvme: 'Si', velocidad_lectura: '4950 MB/s', velocidad_escritura: '3950 MB/s' })
  },
]
