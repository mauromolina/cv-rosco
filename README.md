# CV Rosco - Juego Bíblico Estilo Pasapalabra

Una aplicación web demo jugable estilo Pasapalabra (rosco A–Z) construida con Next.js, TypeScript y TailwindCSS. La aplicación presenta 4 roscos distintos con temática bíblica, cada uno con 26 preguntas correspondientes a las letras del alfabeto.

## 🎯 Características Principales

- **4 Roscos Temáticos**: Personajes del AT, Personajes del NT, Lugares Bíblicos, y Conceptos Bíblicos
- **26 Preguntas por Rosco**: Una pregunta por cada letra del alfabeto (A-Z)
- **Timer Real**: Cuenta regresiva configurable con persistencia
- **Modo Demo**: Para probar fácilmente sin validación estricta
- **Persistencia Local**: Todo el progreso se guarda en localStorage
- **Responsive**: Optimizado para móvil y desktop
- **Animaciones**: Transiciones suaves y feedback visual

## 🚀 Cómo ejecutar

### Instalación

```bash
# Clonar o descargar el proyecto
cd cv-rosco

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎮 Cómo jugar

### Reglas básicas
1. **26 preguntas**: Una por cada letra del alfabeto
2. **Responder o Pasapalabra**: Escribe tu respuesta o presiona "Pasapalabra"
3. **Tiempo límite**: 120 segundos por rosco (configurable en modo demo)
4. **Estados de letras**:
   - 🔵 Azul: Pendiente
   - 🟡 Amarillo: Pasapalabra
   - 🟢 Verde: Correcta
   - 🔴 Rojo: Incorrecta

### Navegación de páginas
- **Home** (`/`): Selección de rosco
- **Juego** (`/game/[roscoId]`): Gameplay principal
- **Resultados** (`/results/[roscoId]`): Resultado final del rosco

### Modo Demo
- Activar con `?demo=1` en la URL
- Habilita botones "Marcar Correcta/Incorrecta"
- Controles de pausa/reanudación del timer
- Ideal para probar sin responder preguntas

## 🏗️ Arquitectura Técnica

### Stack tecnológico
- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS con animaciones custom
- **Estado**: Zustand con persistencia automática
- **Sin Backend**: Todo funciona con mock data local

### Estructura del proyecto
```
src/
├── app/                    # App Router de Next.js
│   ├── game/[roscoId]/    # Página del juego
│   ├── results/[roscoId]/ # Página de resultados
│   └── page.tsx           # Home page
├── components/            # Componentes React
│   ├── Rosco.tsx         # Rosco circular A-Z
│   ├── LetterNode.tsx    # Nodo individual de letra
│   ├── Timer.tsx         # Temporizador con cuenta regresiva
│   ├── QuestionPanel.tsx # Panel de pregunta e input
│   └── ProgressIndicator.tsx # Indicador de progreso
├── hooks/                # Custom hooks
│   ├── useGameEngine.ts  # Lógica principal del juego
│   └── useTimer.ts       # Gestión del temporizador
├── store/                # Estado global con Zustand
│   └── game-store.ts     # Store principal del juego
├── mocks/                # Datos de prueba
│   └── roscos.ts         # 4 roscos con 26 preguntas c/u
├── types/                # Definiciones TypeScript
│   └── index.ts          # Tipos del dominio
└── utils/                # Utilidades
    └── cn.ts             # Combinación de clases CSS
```

## 💾 Persistencia de datos

Los datos se guardan automáticamente en localStorage:

- **Estado de cada letra**: default, pass, correct, wrong
- **Letra actual**: Índice de pregunta activa
- **Respuestas del usuario**: Texto ingresado para cada letra
- **Tiempo restante**: Para reanudar juegos
- **Historial de resultados**: Para mostrar en la página de resultados

## 🎛️ Controles disponibles

### En el juego
- **Escribir respuesta + Enter/Enviar**: Validar respuesta
- **Botón Pasapalabra**: Marcar como "pass" y continuar
- **Modo Demo**: Botones "Marcar Correcta/Incorrecta"

### En modo demo
- **Pausar/Reanudar**: Control manual del timer
- **Reiniciar Tiempo**: Resetear a 120 segundos
- **Switch Demo**: Alternar entre validación automática y manual

### Gestión de roscos
- **Reset Rosco**: Limpiar progreso de un rosco específico
- **Reset Todo**: Limpiar todos los roscos (botón en Home)

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints adaptativos**: Layout que se ajusta a diferentes tamaños
- **Touch-friendly**: Botones y controles optimizados para touch
- **Animaciones performantes**: Uso de `transform-gpu` para fluidez

## 🎨 Diseño UI/UX

### Estilo visual
- **Tema game show**: Colores vibrantes y gradientes atractivos
- **Rosco circular**: 26 letras distribuidas en círculo
- **Feedback inmediato**: Animaciones al cambiar estados
- **Indicadores claros**: Progress bars y contadores

### Animaciones incluidas
- **Pulse glow**: Para letra activa
- **Bounce in**: Al acertar respuesta
- **Shake**: Al fallar respuesta
- **Slide transitions**: Entre pantallas
- **Hover effects**: En todos los elementos interactivos

## 🔧 Configuración y personalización

### Modificar tiempos
```typescript
// En /src/mocks/roscos.ts
export const roscos: Rosco[] = [
  {
    id: "rosco-1",
    title: "Tu Rosco",
    timeLimitSec: 180, // Cambiar tiempo aquí
    questions: [...]
  }
]
```

### Agregar nuevos roscos
1. Añadir nuevo objeto en `roscos.ts`
2. Crear 26 preguntas con claves A-Z
3. El resto es automático

### Personalizar estilos
```css
/* En /src/app/globals.css */
.gradient-custom {
  background: linear-gradient(135deg, #tu-color1, #tu-color2);
}
```

## 🚨 Resolución de problemas

### El progreso no se guarda
- Verificar que localStorage esté habilitado en el navegador
- Comprobar que no esté en modo incógnito

### Timer no funciona correctamente
- Asegurarse de que la página tenga foco
- Verificar que no haya errores en la consola del navegador

### Roscos no cargan
- Verificar que el ID del rosco existe en `/src/mocks/roscos.ts`
- Comprobar la URL de la página

### Reset de datos
Para limpiar completamente todos los datos:
```javascript
// En la consola del navegador
localStorage.removeItem('cv-rosco-storage')
location.reload()
```

## 📄 Licencia

Proyecto de demostración. Libre para usar y modificar.

---

## 🏁 Demo rápida

1. `npm install && npm run dev`
2. Visita [http://localhost:3000](http://localhost:3000)
3. Haz clic en "🚀 Demo Rápida" para probar inmediatamente
4. Usa los botones de modo demo para navegar rápidamente

¡Disfruta jugando y aprendiendo sobre la Biblia! 📖✨
