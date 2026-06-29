# ⚙️ Genesis Hardware - Sistema de Gestión B2B

Genesis Hardware es una plataforma web integral diseñada para automatizar y centralizar la gestión interna de una fábrica de distribución de componentes de computadora. Este sistema B2B permite administrar los recursos humanos, monitorear el stock de hardware y dar seguimiento a la logística de envíos mediante una arquitectura altamente modular y escalable.

---

## 🚀 Características Principales

* **Panel de Dirección (Dashboard):** Vista centralizada para la toma de decisiones y monitoreo general.
* **Gestión de Cuentas:** Alta, baja y actualización de perfiles para empleados y repartidores mediante Firebase Auth.
* **Control de Inventario:** Monitoreo en tiempo real de piezas y cantidades en stock conectadas a Firestore.
* **Logística y Envíos:** Seguimiento del estatus de distribución de hardware.
* **Seguridad y Estabilidad:** Rutas protegidas y sistema de *fallback* (respaldo local) integrado para garantizar la continuidad del desarrollo local frente a caídas de servicios externos.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React (inicializado con Vite).
* **Estilos:** Tailwind CSS (Uso exclusivo, sin CSS puro ni estilos en línea).
* **Enrutamiento:** React Router DOM.
* **Backend & Base de Datos:** Firebase (Authentication y Firestore).

---

## 🏗️ Arquitectura y Reglas de Desarrollo

Este proyecto fue construido bajo normas estrictas de código limpio y modularidad para asegurar un rendimiento óptimo y evitar el "código espagueti":

1.  **Límite de Líneas:** Ningún componente visual o archivo excede las **50 líneas de código**. Todo bloque mayor se subdivide obligatoriamente en nuevos subcomponentes.
2.  **Flujo de Datos:** Unidireccional estricto. La información siempre pasa de **Padres a Hijos o Nietos**.
3.  **Estructura de Carpetas:** Separación lógica rigurosa:
    * `/components`: Elementos visuales reutilizables.
    * `/pages`: Vistas principales y contenedores estructurales.
    * `/services`: Lógica de negocio y llamadas exclusivas a bases de datos/APIs.
    * `/hooks`: Lógica de estado y efectos personalizados.
    * `/context`: Manejo de estados globales.
4.  **Separación de Lógica:** La interfaz visual jamás se mezcla con la lógica de base de datos. Toda la comunicación con Firebase ocurre aislada en la capa de `services`.
5.  **Nomenclatura:** Todos los nombres de archivos, carpetas y componentes están 100% en español.

---

## 💻 Instalación y Ejecución Local

Para revisar o correr el proyecto en un entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/AgustinEscamilla/Genesis-Hardware)
    ```
2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y agrega las credenciales de Firebase:
    ```env
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_dominio
    VITE_FIREBASE_PROJECT_ID=tu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_storage
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id
    ```
4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Desarrollador

**Agustín Hernández Escamilla**
*Ingeniería en Software y Sistemas Computacionales*﻿# Genesis-Hardware
