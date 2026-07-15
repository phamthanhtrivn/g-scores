# G-Scores

This project consists of a Next.js Frontend and a NestJS Backend using PostgreSQL.

## Prerequisites (Environment Variables)

Before running the project, you must set up the environment variables. Create a `.env` file in the **root** directory (and/or inside the frontend/backend directories depending on the mode you choose) with the necessary variables.

A typical root `.env` for Docker should look like this:

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=password
POSTGRES_DB=g_scores
POSTGRES_PORT=5433
NEXT_PUBLIC_API_URL=http://localhost:3001
INTERNAL_API_URL=http://backend:3001
```

## How to run the project locally

There are two ways to run this project:

1. **Full Docker Mode (Recommended)**: Run all services (Frontend, Backend, and Database) entirely using Docker.
2. **Hybrid Mode**: Run the database in Docker, but run Frontend and Backend manually using Node.js.
3. **Live Website**: Experience the deployed application online without running it locally.

---

### Option 1: Full Docker Mode (Recommended)

In this mode, Docker Compose handles the entire stack, spinning up the Database, Backend, and Frontend containers simultaneously.

1. Ensure Docker is running.
2. Create the root `.env` file as described in the Prerequisites section.
3. Build and start all services in the root directory:

```bash
docker-compose up --build -d
```

_(Note: The backend container will automatically run database migrations on startup)._

4. **(Required) Seed Initial Data**: Since the database will be empty on first run, you need to populate it with the initial dataset. Run the following command once:

```bash
docker exec -it g-scores-backend npx prisma db seed
```

5. The services will be available at:

   **Frontend**: `http://localhost:3000`
   - **Backend API**: `http://localhost:3001`

To stop all services, run:

```bash
docker-compose down
```

---

### Option 2: Hybrid Mode

In this mode, you will run PostgreSQL via Docker and start the frontend/backend manually. This is useful if you want to run the code natively on your machine for debugging.

#### 1. Start Database & Redis

Ensure Docker is running, create the root `.env` file, then start the PostgreSQL and Redis containers:

```bash
docker-compose up -d postgres redis
```

#### 2. Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

**Create a** `backend/.env` **file** with the connection string pointing to your local mapped database port (e.g., 5433):

```env
PORT=3001
DATABASE_URL="postgresql://root:password@localhost:5433/g_scores?schema=public"
```

Then run migrations and start the server:

```bash
npx prisma migrate dev
npx prisma db seed # (Required) To seed initial data
npm run start:dev
```

_The backend will typically run on_ `http://localhost:3001`_._

#### 3. Start the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

**Create a** `frontend/.env` **file** pointing to the backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend server:

```bash
npm run dev
```

_The frontend will be available at_ `http://localhost:3000`_._

---

### Option 3: Live Website

If you just want to experience the application without running it locally, you can visit the deployed version here: [**https://g-scores-inky.vercel.app**](https://g-scores-inky.vercel.app)

> **Note**: The backend of this live version is hosted on Render's free tier. If there are no requests for 15 minutes, the server will go to sleep. As a result, the first request after a period of inactivity may take around 10–20 seconds to respond, depending on the cold start time.
