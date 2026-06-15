# StudyFlow

StudyFlow is a production-style MVP for an AI-powered study flow and learning roadmap platform. It includes a NestJS API, Prisma/PostgreSQL persistence, JWT auth, mock AI generation, and a React Flow editor.

## Structure

```txt
mindai/
  backend/
  frontend/
  README.md
```

## Prerequisites

- Node.js 20+
- PostgreSQL
- npm

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run seed
npm run start:dev
```

Swagger docs are available at `http://localhost:4000/api/docs`.

Backend runs on `http://localhost:4000` by default.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend defaults to `http://localhost:5173`.

## Environment

Backend variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `FRONTEND_URL`
- `AI_PROVIDER`
- `AI_API_KEY`

Frontend variables:

- `VITE_API_URL`

## MVP Flow

Register, log in, create a study flow, add/edit/drag/delete nodes, generate mock AI study maps, expand selected nodes, and export JSON.

## API Summary

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /mindmaps`
- `GET /mindmaps`
- `GET /mindmaps/:id`
- `PATCH /mindmaps/:id`
- `DELETE /mindmaps/:id`
- `POST /mindmaps/:mindMapId/nodes`
- `GET /mindmaps/:mindMapId/nodes`
- `PATCH /nodes/:id`
- `DELETE /nodes/:id`
- `POST /ai/generate-mindmap`
- `POST /ai/expand-node`

## Demo Account

After running `npm run seed`, use:

- Email: `demo@mindai.dev`
- Password: `password123`

## Notes

The AI service currently returns mock data when `AI_API_KEY` is empty. The service shape is ready for a real OpenAI or Gemini adapter later without changing the frontend contract.
