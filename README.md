# Project Microservices

## 1. Requirements

- Node.js >= 18
- npm >= 9
- Docker & Docker Compose
- PostgreSQL (or corresponding DB for Prisma)

---

## 2. Project Structure

```
ibanking/
├─ docker-compose.db.yml       # Docker DB for the project
├─ auth-service/               # Auth + Student service (Prisma + Postgres)
├─ notification-service/       # Notification service (Prisma + Postgres)
├─ payment-service/            # Payment service (Prisma + Postgres)
├─ frontend/                   # Frontend (Next.js)
├─ package.json                # Run dev scripts
└─ README.md
```

---

## 3. Run Project (Dev Mode)

In the **root folder**, install dependencies:

```bash
npm install
```

Then run all microservices + frontend + DB with a single command:

```bash
npm run start
```

### Explanation

- The `npm run start` script will:

  1. Start the Docker database (`docker-compose.db.yml`)
  2. Start `auth-service`, `notification-service`, `payment-service`
  3. Start `frontend`

- All services run concurrently, and logs are displayed in the terminal.

---

## 4. Manage Prisma Database

Each service using Prisma has its own `schema.prisma`, e.g., `auth-service/prisma/schema.prisma`, `payment-service/prisma/schema.prisma`.

Open Prisma Studio:z

```bash
# auth-service (port 5556)
npm run prisma studio auth-service -- --port 5556

# notification-service (port 5557)
npx prisma studio --port 5557

# payment-service (port 5558)
npm run prisma studio payment-service -- --port 5558
```

- Ports from **5556 to 5560** can be used for different services.
- Prisma Studio allows you to browse, add, and modify data easily.

---

## 5. Notes

- If the database is not ready, services may fail to connect.
- You can use tools like `wait-for-it` or `dockerize` to delay services until the DB is ready.
- Only one terminal is needed to run everything concurrently.
- To stop the project:

```bash
docker compose -f docker-compose.db.yml down
```

and use Ctrl+C for services if running separately.

---

## 6. Troubleshooting

- If Prisma Studio doesn't start: check the `DATABASE_URL` in the `.env` of the corresponding service.
- If MongoDB Compass cannot connect: make sure MongoDB is running and the port is correct.
- Check service logs in the terminal for quick debugging.
