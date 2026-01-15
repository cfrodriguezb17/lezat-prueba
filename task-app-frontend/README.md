# Task App Frontend

Interfaz web para gestión de tareas con IA.

## Instalación

```bash
pnpm install
```

## Configuración

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Comandos

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Producción
pnpm start

# Lint
pnpm lint
```

## Funcionalidades

- ✅ CRUD completo de tareas
- ✅ Filtros por estado
- ✅ Cambio rápido de estado
- ✅ Diseño responsive y minimalista
- 🤖 Resumen inteligente con IA
- 🤖 Sugerencias de prioridad con IA
- 🤖 Auto-completar descripción con IA

## Estructura

```
app/
├── page.tsx           # Página principal
├── layout.tsx         # Layout global
└── globals.css        # Estilos globales

components/
├── ui/                # Componentes base
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── modal.tsx
│   └── badge.tsx
├── tasks/             # Componentes de tareas
│   ├── task-card.tsx
│   ├── task-list.tsx
│   ├── task-form.tsx
│   ├── task-filters.tsx
│   └── delete-confirm-modal.tsx
└── ai/                # Componentes de IA
    └── ai-panels.tsx

lib/
├── api.ts             # Cliente Axios
├── types.ts           # Tipos TypeScript
├── tasks-api.ts       # API de tareas
└── ai-api.ts          # API de IA
```
