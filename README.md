# Task Manager - Full Stack Application

Una aplicación de gestión de tareas con inteligencia artificial integrada.

## 🚀 Quick Start (Docker)

La forma más rápida de ejecutar la aplicación es utilizando Docker Compose.

1.  Asegúrate de tener Docker y Docker Compose instalados.
2.  **Configuración de IA (Opcional pero recomendado):**

    Para habilitar las funciones de inteligencia artificial (resúmenes, priorización), necesitas una API Key de Google Gemini.

    - Obtén tu clave gratis aquí: [Google AI Studio](https://aistudio.google.com/app/apikey)
    - Crea un archivo llamado `.env` en la carpeta raíz del proyecto (`Lezat/`) y pega tu clave:

    ```bash
    GOOGLE_AI_API_KEY=tu_clave_que_empieza_con_AIzr...
    ```

3.  Ejecuta la aplicación:
    ```bash
    docker-compose up --build
    ```

Las aplicaciones estarán disponibles en:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3001`
- **Base de Datos**: `localhost:5434`

### Detener

```bash
docker-compose down
# Para borrar datos también: docker-compose down -v
```

## ⚙️ Configuración Manual (Desarrollo)

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
