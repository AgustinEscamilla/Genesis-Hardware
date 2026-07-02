Genesis Hardware - Plataforma de Distribución B2B
Visión General
Genesis Hardware es una plataforma integral de e-commerce mayorista (B2B) y gestión logística diseñada para controlar la distribución de componentes tecnológicos en el estado de Campeche. El sistema conecta un Centro de Distribución principal (CEDIS) con tiendas tecnológicas clientes, automatizando el control de inventario en tiempo real, la agrupación inteligente de manifiestos de carga y proporcionando herramientas operativas de última milla con soporte offline para la flotilla de repartidores.

Adicionalmente, el proyecto cuenta con una arquitectura de interoperabilidad B2B que permite recibir y procesar peticiones directamente desde sistemas de software externos asociados.

Stack Tecnológico
Frontend: React (Vite)

Estilos: Tailwind CSS (Implementación estricta de Dark Theme, sin uso de HTML/CSS tradicional)

Backend & Base de Datos: Firebase / Firestore

Autenticación: Firebase Auth

Reglas y Estándares de Arquitectura Crítica
Este proyecto sigue normas de desarrollo estrictas para garantizar la escalabilidad y evitar la degradación del código:

Límites de Código: Ningún componente visual de React debe superar el límite de 150 a 200 líneas de código.

Límite de Componentes: El ecosistema de la interfaz gráfica se mantendrá con un máximo de 50 componentes altamente reutilizables.

Aislamiento de Lógica (Backend): Toda comunicación con Firestore y reglas de negocio complejas operan única y exclusivamente dentro de la carpeta services.

Flujo Unidireccional: El estado y la información fluyen estrictamente de padres a hijos (y a nietos) mediante props. Queda prohibida la comunicación directa de datos entre componentes hermanos.

Nomenclatura: Todos los archivos, variables y funciones del proyecto se escriben obligatoriamente en español.

Estructura de Directorios
La organización del proyecto se basa en la separación funcional de responsabilidades:

/components: Elementos UI reutilizables (botones, tarjetas, entradas de texto).

/context: Gestión del estado global de la aplicación.

/hooks: Lógica reutilizable de React (ej. useAutenticacion).

/pages: Vistas completas agrupadas por perfil de usuario (/administrador, /empleados, /cliente, /publico).

/services: Archivos que gestionan peticiones a la base de datos y la lógica de negocio pura.

Perfiles de Usuario y Módulos
1. Cliente B2B (Tiendas Asociadas)
Catálogo Interactivo: Visualización de componentes con stock en tiempo real.

Trazabilidad (Tracking): Seguimiento paso a paso del estado del envío.

Atención y Reclamos: Sistema de tickets para reportar mercancía dañada o faltantes vinculados a la orden de compra.

Notificaciones: Alertas automatizadas sobre el procesamiento y envío de pedidos.

2. Administración y Dirección
Dashboard Analítico: Visualización de métricas de rentabilidad por ruta y eficacia de los repartidores.

Gestión de Cuentas: Alta de empleados y repartidores sin interrumpir la sesión activa del director.

Control de CEDIS: Alertas de reabastecimiento preventivo e ingreso de lotes por pieza o caja máster.

3. Empleado de Bodega (CEDIS)
Picking & Packing: Bandeja de manifiestos con botones de transición rápida de estado (Recibido -> En Empaque -> Listo para Despacho).

Agrupación Logística: Unificación de pedidos basada en las zonas logísticas predefinidas (Norte, Centro, Sur, Este).

4. Repartidor (Última Milla)
Rutas Secuenciales: Listado de paradas organizadas en un orden numérico estático predefinido, optimizando el trayecto por carretera.

Persistencia Offline: Caché de Firestore que permite confirmar entregas en zonas sin cobertura de internet, sincronizando los datos automáticamente al recuperar la señal.

Comprobante de Entrega (POD) y Rechazos: Captura de firma/fotografía y botones rápidos para procesar devoluciones al inventario.

Autor y Desarrollo
Agustín Byron Giancarlos Hernández Escamilla - Ingeniería de Software, Liderazgo Técnico y Desarrollo Full-Stack.
