# Pets Üp\! - Aplicación Móvil

**Sitio Web Oficial:** [**https://www.petsup.cl**](https://www.petsup.cl)

[](https://expo.dev/)
[](https://reactnative.dev/)
[](https://www.typescriptlang.org/)

Esta es la aplicación móvil oficial de **Pets Üp\!**, una plataforma para la adopción, búsqueda de mascotas perdidas y cuidado comunitario.

La aplicación está construida con **React Native** utilizando el ecosistema de **Expo** y **Expo Router**, enfocada en el rendimiento y la escalabilidad.

-----

## 🛠️ Stack Tecnológico

  * **Framework:** [Expo](https://expo.dev/) (Managed Workflow).
  * **Lenguaje:** TypeScript.
  * **Navegación:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing).
  * **Estado Global:** React Context API (`AuthContext`, `CatalogContext`).
  * **Manejo de Datos:** Custom Hooks (`usePets`, `useLostPets`) con Axios e Interceptores.
  * **Mapas:** `react-native-maps` (Google Maps / Apple Maps).
  * **UI & Animaciones:**
      * `react-native-reanimated` (Animaciones a 60fps en hilo nativo).
      * `react-native-gesture-handler` (Gestos nativos).
      * `@gorhom/bottom-sheet` (Paneles deslizables de alto rendimiento).
  * **Almacenamiento Seguro:** `expo-secure-store` (para JWT).

-----

## 🏛️ Arquitectura y Patrones

El proyecto sigue principios estrictos de ingeniería de software para asegurar la mantenibilidad:

1.  **Co-ubicación (Co-location):** Los estilos (`.styles.ts`) y la lógica viven junto a sus componentes, no en carpetas separadas globales.
2.  **SRP (Single Responsibility Principle):**
      * **Pantallas (`app/`):** Solo definen rutas y layouts.
      * **Componentes (`components/screens/`):** Contienen la UI y la lógica de presentación.
      * **Hooks (`hooks/`):** Encapsulan la lógica de negocio y llamadas a la API.
3.  **Patrón Fachada en Hooks:** Los componentes no llaman a `axios` directamente. Usan hooks específicos (ej. `useLostPets`) que abstraen la configuración, paginación y manejo de errores.
4.  **Type Safety:** Tipado estricto de TypeScript para todas las respuestas de la API y props de componentes.
5.  **Theming:** Soporte nativo para Modo Oscuro y Claro mediante `useThemeColor`.

-----

## 📂 Estructura del Proyecto

```text
petsup-frontend/
├── app/                  # Rutas de Expo Router (File-based navigation)
│   ├── (auth)/           # Stack de Autenticación (Login, Registro)
│   ├── (tabs)/           # Stack Principal (Tabs de navegación)
│   └── _layout.tsx       # Layout raíz con Proveedores (Auth, Theme, Gestures)
├── components/           # Componentes de UI
│   ├── PetCard/          # Componente tarjeta (UI + Styles)
│   ├── PetDeck/          # Componente mazo swipeable (Lógica + UI)
│   ├── PetDetail/        # BottomSheet de detalle
│   └── screens/          # Pantallas completas (lógica separada de rutas)
├── constants/            # Tokens de diseño (Colors.ts, ApiRoutes.ts)
├── context/              # Estado Global (AuthContext, CatalogContext)
├── hooks/                # Lógica de Negocio (usePets, useApi, useLostPetsMap)
├── services/             # Configuración de Axios y SecureStore
└── types/                # Definiciones de Tipos (Interfaces)
```

-----

## 🚀 Instalación y Ejecución

### Prerrequisitos

  * Node.js (LTS recomendado).
  * Dispositivo físico (con app **Expo Go**) o Simulador (iOS/Android).
  * Backend de Pets Üp\! corriendo localmente.

### 1\. Clonar e Instalar

```bash
git clone <url-del-repo>
cd petsup-frontend
npm install
```

### 2\. Configurar API (Importante para entorno local)

Debido a que Expo corre en tu teléfono y el backend en tu PC, no puedes usar `localhost`.

1.  Abre el archivo `services/api.ts`.
2.  Busca la constante `YOUR_MAC_IP_ADDRESS`.
3.  Reemplázala con la IP local de tu computadora (ej. `192.168.x.x`).
      * *Mac/Linux:* Ejecuta `ipconfig getifaddr en0` en la terminal.
      * *Windows:* Ejecuta `ipconfig`.

### 3\. Ejecutar la App

```bash
npx expo start
```

  * Escanea el código QR con la app **Expo Go** (Android) o la Cámara (iOS).
  * Para limpiar caché (si algo falla): `npx expo start -c`.

-----

## ✨ Funcionalidades Clave (MVP)

  * **Autenticación:**
      * Login y Registro (Wizard de pasos).
      * Sesión persistente con JWT seguro.
      * Guardia de rutas (Redirección automática).
  * **Adopción (Tinder-style):**
      * Feed de mascotas con gestos de Swipe.
      * Detalle de mascota en Bottom Sheet.
  * **Mascotas Perdidas (Geoespacial):**
      * Mapa interactivo con marcadores optimizados.
      * Carga de datos basada en ubicación y zoom.
      * Switch entre vista de Mapa y Lista.
  * **Catálogos:**
      * Carga inicial optimizada de datos estáticos (Razas, Comunas, etc.) para traducción instantánea de IDs.