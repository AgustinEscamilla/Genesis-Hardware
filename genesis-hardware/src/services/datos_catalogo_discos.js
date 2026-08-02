import { plantillaEspecificacionesDisco } from './plantillas_especificaciones_tecnicas'

export const productos_discos = [
  {
    nombre: 'WD Red Pro 12TB NAS',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5 pulgadas 12TB 7200RPM cache 256MB RAID optimizado 24/7 duty cycle 72MB/s',
    descripcionPrecios: 'Disco NAS profesional Ideal para servidores RAID y backups criticos',
    stockVisible: 7,
    precio: 7999,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Red+12TB',
    especificaciones_tecnicas: plantillaEspecificacionesDisco({ capacidad: '12 TB', factor_forma: '3.5 pulgadas', temperatura: '5°C a 60°C', interfaz: 'SATA III 6 Gb/s', ancho: '101.6 mm', peso: '690 g', profundidad: '147 mm', altura: '26.1 mm', componente_para: 'NAS y servidores empresariales', compatible_nvme: 'No', tipo_disco: '7200 RPM', velocidad_escritura: '272 MB/s' })
  },
  {
    nombre: 'Seagate Barracuda 8TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5 pulgadas 8TB 5400RPM cache 256MB buen MTBF acceso 8.5ms promedio',
    descripcionPrecios: 'Almacenamiento masivo economico Perfecto para archivos y backups',
    stockVisible: 12,
    precio: 3999,
    imagen: 'https://via.placeholder.com/400x300?text=Seagate+8TB',
    especificaciones_tecnicas: plantillaEspecificacionesDisco({ capacidad: '8 TB', factor_forma: '3.5 pulgadas', temperatura: '5°C a 60°C', interfaz: 'SATA III 6 Gb/s', ancho: '101.6 mm', peso: '620 g', profundidad: '147 mm', altura: '20.2 mm', componente_para: 'PC de escritorio y backups', compatible_nvme: 'No', tipo_disco: '5400 RPM', velocidad_escritura: '190 MB/s' })
  },
  {
    nombre: 'WD Blue 4TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5 pulgadas 4TB 5400RPM cache 256MB bajo ruido perfil bajo 64MB/s',
    descripcionPrecios: 'Disco confiable para almacenamiento general WD Blue es estandar industrial',
    stockVisible: 15,
    precio: 1899,
    imagen: 'https://via.placeholder.com/400x300?text=WD+Blue+4TB',
    especificaciones_tecnicas: plantillaEspecificacionesDisco({ capacidad: '4 TB', factor_forma: '3.5 pulgadas', temperatura: '0°C a 60°C', interfaz: 'SATA III 6 Gb/s', ancho: '101.6 mm', peso: '600 g', profundidad: '147 mm', altura: '20.2 mm', componente_para: 'PC de escritorio', compatible_nvme: 'No', tipo_disco: '5400 RPM', velocidad_escritura: '175 MB/s' })
  },
  {
    nombre: 'Seagate IronWolf 6TB NAS',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5 pulgadas 6TB 5900RPM NAS cache 256MB optimizado para RAID vibracion minima',
    descripcionPrecios: 'Disco RAID confiable para pequenos servidores Excelente en multi-bahia',
    stockVisible: 9,
    precio: 4499,
    imagen: 'https://via.placeholder.com/400x300?text=IronWolf+6TB',
    especificaciones_tecnicas: plantillaEspecificacionesDisco({ capacidad: '6 TB', factor_forma: '3.5 pulgadas', temperatura: '0°C a 70°C', interfaz: 'SATA III 6 Gb/s', ancho: '101.6 mm', peso: '640 g', profundidad: '147 mm', altura: '26.1 mm', componente_para: 'NAS multi-bahia', compatible_nvme: 'No', tipo_disco: '5900 RPM', velocidad_escritura: '210 MB/s' })
  },
  {
    nombre: 'Toshiba X300 2TB',
    categoria: 'Discos duros',
    descripcionTecnica: 'HDD 3.5 pulgadas 2TB 7200RPM cache 64MB velocidad alta gaming optimizado',
    descripcionPrecios: 'Disco gaming antiguo Aun funcional para drives secundarios o backup',
    stockVisible: 11,
    precio: 1499,
    imagen: 'https://via.placeholder.com/400x300?text=Toshiba+2TB',
    especificaciones_tecnicas: plantillaEspecificacionesDisco({ capacidad: '2 TB', factor_forma: '3.5 pulgadas', temperatura: '5°C a 60°C', interfaz: 'SATA III 6 Gb/s', ancho: '101.6 mm', peso: '600 g', profundidad: '147 mm', altura: '26.1 mm', componente_para: 'PC gaming y desktop', compatible_nvme: 'No', tipo_disco: '7200 RPM', velocidad_escritura: '230 MB/s' })
  },
]
