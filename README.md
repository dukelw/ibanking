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
npx prisma studio --port 5556

# notification-service (port 5557)
npx prisma studio --port 5557

# payment-service (port 5558)
npx prisma studio --port 5558
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
- Check service logs in the terminal for quick debugging.

## 7. Run Project with Docker

```bash
docker compose build
```

## 8. Environment Variables

```bash
# api-gateway (env)
PORT=4000
USER_API_URL=http://localhost:4001
NOTIFICATION_API_URL=http://localhost:4002
STUDENT_API_URL=http://localhost:4003
TRANSACTION_API_URL=http://localhost:4004
USER_SWAGGER_URL=http://localhost:4001
NOTIFICATION_SWAGGER_URL=http://localhost:4002
STUDENT_SWAGGER_URL=http://localhost:4003
TRANSACTION_SWAGGER_URL=http://localhost:4004

# api-gateway (env.pro)
PORT=4000
USER_API_URL=http://user-service:4001
NOTIFICATION_API_URL=http://notification-service:4002
STUDENT_API_URL=http://student-service:4003
TRANSACTION_API_URL=http://transaction-service:4004

# frontend
NEXT_PUBLIC_API_URL=http://localhost:4000

# notification-service
DATABASE_URL=postgresql://postgres:postgres@localhost:5436/notification
EMAIL_USER="YOUR_EMAIL"
EMAIL_PASS="YOUR_PASSWORD"

# student-service
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/payment
# DATABASE_URL=postgresql://postgres:postgres@postgres-payment:5432/payment
PORT=4003
AUTH_SERVICE=http://localhost:4001

# transaction-service
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/transaction
# DATABASE_URL=postgresql://postgres:postgres@postgres-transaction:5432/transaction
PORT=4004
USER_SERVICE=http://localhost:4001
REDIS_HOST=localhost
REDIS_PORT=6379

# user-service
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/user"
# DATABASE_URL="postgresql://postgres:postgres@postgres-user:5432/user"
PORT=4001
```