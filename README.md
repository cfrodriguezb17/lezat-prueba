# Task Manager - Full Stack Application

Una aplicación de gestión de tareas con inteligencia artificial integrada.

## 🚀 Quick Start

### Requisitos Previos

- Node.js 18+
- PostgreSQL 14+
- pnpm (recomendado)

### 1. Base de datos

Crear la base de datos PostgreSQL:

```sql
CREATE DATABASE task_app;
```

### 2. Backend

```bash
cd task-app-backend

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=postgres
# DATABASE_PASSWORD=tu_password
# DATABASE_NAME=task_app
# GOOGLE_AI_API_KEY=tu_api_key

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm start:dev
```

El backend estará disponible en `http://localhost:3001`

### 3. Frontend

```bash
cd task-app-frontend

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El frontend estará disponible en `http://localhost:3000`

## 📚 Documentación de API

### Tasks

| Método | Endpoint   | Descripción                              |
| ------ | ---------- | ---------------------------------------- |
| GET    | /tasks     | Listar tareas (query: `?status=PENDING`) |
| GET    | /tasks/:id | Obtener tarea por ID                     |
| POST   | /tasks     | Crear tarea                              |
| PATCH  | /tasks/:id | Actualizar tarea                         |
| DELETE | /tasks/:id | Eliminar tarea                           |

### AI

| Método | Endpoint         | Descripción                  |
| ------ | ---------------- | ---------------------------- |
| GET    | /ai/summary      | Resumen de tareas pendientes |
| POST   | /ai/priorities   | Sugerir prioridades          |
| POST   | /ai/autocomplete | Auto-completar descripción   |

## 🛠 Stack Tecnológico

- **Backend**: NestJS 11, TypeORM, PostgreSQL
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **AI**: Google Gemini (Generative AI)

## 📁 Estructura del Proyecto

```
Lezat/
├── task-app-backend/
│   ├── src/
│   │   ├── ai/           # Módulo de IA
│   │   ├── tasks/        # Módulo de tareas
│   │   └── config/       # Configuración
│   └── package.json
├── task-app-frontend/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── lib/              # APIs y tipos
│   └── package.json
└── README.md
```

## � Despliegue con Docker (Recomendado para producción local)

La forma más sencilla de ejecutar la aplicación completa sin instalar dependencias manuales.

### 1. Configurar la API de Google AI

Para habilitar las funciones de IA, necesitas una Google API Key:

- **Obtén tu clave:** [Google AI Studio](https://aistudio.google.com/app/apikey) (es gratis).
- **Crea el archivo:** En la raíz del proyecto (`Lezat/`), crea un archivo llamado `.env`.
- **Pega tu clave:** Dentro del archivo `.env`, escribe lo siguiente:
  ```bash
  GOOGLE_AI_API_KEY=tu_clave_aqui
  ```

### 2. Iniciar con Docker Compose

```bash
docker-compose up --build
```

Las aplicaciones estarán disponibles en:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3001`

### Detener

```bash
docker-compose down
# Para borrar datos: docker-compose down -v
```

## 🚀 Otros Métodos de Despliegue

### Despliegue en la Nube

- **Frontend**: Vercel / Netlify (apuntar a `task-app-frontend`).
- **Backend**: Railway / Render (apuntar a `task-app-backend`).
- **Base de Datos**: Railway PostgreSQL / Supabase.
