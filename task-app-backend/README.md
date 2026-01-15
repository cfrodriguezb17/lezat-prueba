# Task App Backend

API REST para gestión de tareas con integración de IA.

## Instalación

```bash
pnpm install
```

## Configuración

Crear archivo `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=task_app
GOOGLE_AI_API_KEY=your_api_key
PORT=3001
```

## Comandos

```bash
# Desarrollo
pnpm start:dev

# Producción
pnpm build
pnpm start:prod

# Tests
pnpm test
pnpm test:e2e
```

## API Endpoints

### Tasks (`/tasks`)

- `GET /tasks` - Listar tareas (query: `?status=PENDING|IN_PROGRESS|COMPLETED`)
- `GET /tasks/:id` - Obtener tarea
- `POST /tasks` - Crear tarea
- `PATCH /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

#### Create Task Body

```json
{
  "title": "string (required, min 3 chars)",
  "description": "string (optional)",
  "status": "PENDING | IN_PROGRESS | COMPLETED (optional)",
  "priority": "number 1-5 (optional)"
}
```

### AI (`/ai`)

- `GET /ai/summary` - Resumen de tareas pendientes
- `POST /ai/priorities` - Sugerir prioridades `{ "taskIds": ["uuid"] }`
- `POST /ai/autocomplete` - Auto-completar descripción `{ "title": "string" }`

## Estructura

```
src/
├── ai/
│   ├── ai.controller.ts
│   ├── ai.service.ts
│   ├── ai.module.ts
│   └── dto/
├── tasks/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.module.ts
│   ├── entities/
│   ├── dto/
│   └── enums/
├── config/
│   └── database.config.ts
├── app.module.ts
└── main.ts
```
