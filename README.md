# CYCS & Co. | Ingeniería y Proyectos

![CYCS Logo](./assets/img/favicon.png)

## Descripción General
**CYCS & Co.** es una empresa con más de 25 años de trayectoria especializada en la ingeniería de seguridad, inteligencia artificial y telecomunicaciones. Este proyecto es la renovación del sitio web corporativo, diseñado para mostrar su portafolio de servicios, clientes y proyectos emblemáticos.

La plataforma ofrece soluciones avanzadas en:
- **IA & Automatización**: Orquestación de IA y sistemas automatizados.
- **Sistemas Críticos**: Modernización de infraestructura crítica.
- **Seguridad & Redes**: Suministro, instalación y mantenimiento de seguridad electrónica y redes de datos.

## Características Principales
- **Diseño Moderno y Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio.
- **Modo Oscuro/Claro**: Soporte nativo para cambio de tema visual.
- **Animaciones Fluídas**: Uso de ScrollReveal para una experiencia de navegación dinámica.
- **Sliders Interactivos**: Implementación de Swiper para galerías y secciones destacadas.
- **Optimización de Imágenes**: Procesamiento automático de activos visuales para carga rápida.
- **Integración con WhatsApp**: Canal directo de comunicación para clientes.

## Tecnologías Utilizadas
- **Core**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Herramientas de Construcción**: [Vite](https://vitejs.dev/) v8.x.
- **Bibliotecas**:
  - [Swiper](https://swiperjs.com/) (Carouseles/Sliders).
  - [ScrollReveal](https://scrollrevealjs.org/) (Animaciones de scroll).
  - [Remix Icons](https://remixicon.com/) (Iconografía).
- **Plugins de Vite**:
  - `vite-plugin-image-optimizer`: Optimización de imágenes en tiempo de construcción.

## Estructura del Proyecto
```text
├── assets/             # Recursos del proyecto
│   ├── css/            # Estilos globales y específicos
│   ├── html/           # Páginas secundarias (Servicios, Contacto, etc.)
│   ├── img/            # Imágenes y logotipos
│   └── js/             # Lógica de componentes y efectos
├── backup_nav_logo/    # (Ignorado) Backups de recursos gráficos
├── docs/               # (Ignorado) Documentación adicional
├── index.html          # Página de inicio principal
├── package.json        # Dependencias y scripts de NPM
├── vite.config.js      # Configuración de Vite y optimización
└── netlify.toml        # Configuración para despliegue en Netlify
```

## Instalación y Desarrollo

### Requisitos Previos
- [Node.js](https://nodejs.org/) (Versión recomendada: 18 o superior)
- NPM (Incluido con Node.js)

### Pasos para configurar el entorno
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Construir para producción:
   ```bash
   npm run build
   ```

## Despliegue
El proyecto está configurado para desplegarse automáticamente en **Netlify** mediante el archivo `netlify.toml`. Cada "push" a la rama principal disparará una nueva construcción y actualización del sitio.

---
**Desarrollado por:** Ing. Carlos Colmenares A.
**Sitio Web:** [cycs.netlify.app](https://cycs.netlify.app)
