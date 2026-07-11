<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# Booking Platform API

A RESTful Booking Platform API built with **NestJS**, **TypeORM**, and **PostgreSQL**. The system allows users to register, authenticate, manage services, and create bookings through secure API endpoints documented with Swagger.

---

# Features

- User Registration & Login (JWT Authentication)
- Refresh Token Authentication
- Secure Logout
- Password hashing using bcrypt
- Service Management (CRUD)
- Booking Management
- Booking Status Updates
- Pagination
- Search & Filtering
- Duplicate Booking Prevention
- PostgreSQL database integration
- TypeORM Migrations
- Request Validation
- Global Exception Handling
- Swagger API Documentation
- Dockerized development environment

---

# Technologies Used

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Passport
- bcrypt
- Swagger / OpenAPI
- Docker & Docker Compose

---

# Prerequisites

## Option 1 – Run Locally

Install:

- Node.js (v18 or newer recommended)
- PostgreSQL
- npm

## Option 2 – Run with Docker (Recommended)

Install:

- Docker Desktop

No local installation of PostgreSQL is required.

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd booking-platform-api
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=booking_platform

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

> **Note:** When using Docker Compose, the required environment variables can be supplied through the Docker configuration.

---

# Database Setup (Local)

1. Ensure PostgreSQL is running.

2. Create the database:

```sql
CREATE DATABASE booking_platform;
```

3. Run migrations:

```bash
npm run migration:run
```

---

# Running Migrations

This project uses **TypeORM migrations** for database schema management.

## Run migrations

```bash
npm run migration:run
```

## Generate a migration

After modifying entities:

```bash
npm run migration:generate -- src/migrations/MigrationName
```

## Revert the latest migration

```bash
npm run migration:revert
```

> **Docker Note:** When running with Docker Compose, migrations execute automatically during application startup.

---

# Running the Application (Local)

Development:

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

Application:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/api
```

---

# Running with Docker

Start everything:

```bash
docker-compose up --build
```

This command will:

- Build the NestJS application
- Start PostgreSQL
- Run TypeORM migrations
- Launch the API

Application:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/api
```

Stop:

```bash
docker-compose down
```

Remove database volume:

```bash
docker-compose down -v
```

---

# API Documentation

Interactive Swagger docs are available at:

```
http://localhost:3000/api
```

Swagger provides interactive, up-to-date documentation for every API endpoint, including:

- Full list of routes grouped by module (Auth, Users, Services, Bookings)
- Request and response schemas for each endpoint
- Example payloads and validation rules
- A built-in **Authorize** flow for testing protected routes with a JWT token

---

# API Endpoints

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout` 🔒

---

## Users

- User Management

---

## Services

- `POST /services`
- `GET /services`
- `GET /services/:id`
- `PATCH /services/:id`
- `DELETE /services/:id`

Supports pagination:

```
GET /services?page=1&limit=10
```

---

## Bookings

- `POST /bookings`
- `GET /bookings`
- `GET /bookings/:id`
- `PATCH /bookings/:id/status`
- `DELETE /bookings/:id`

Supports:

Pagination

```
GET /bookings?page=1&limit=10
```

Search

```
GET /bookings?search=john
```

Filter by status

```
GET /bookings?status=PENDING
```

Combined

```
GET /bookings?page=1&limit=10&search=john&status=PENDING
```

---

# Project Structure

```text
src/
│
├── auth/
├── bookings/
├── services/
├── users/
├── common/
├── config/
├── migrations/
├── app.module.ts
└── main.ts
```

---

# Available Scripts

Install dependencies:

```bash
npm install
```

Development:

```bash
npm run start:dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm run start:prod
```

Run tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate migration:

```bash
npm run migration:generate -- src/migrations/MigrationName
```

Run migrations:

```bash
npm run migration:run
```

Revert migration:

```bash
npm run migration:revert
```

---

# Testing

Swagger can be used to test every endpoint.

Typical workflow:

1. Register a user.
2. Login.
3. Copy the access token.
4. Click **Authorize** in Swagger.
5. Enter:

```text
Bearer YOUR_ACCESS_TOKEN
```

6. Test all protected endpoints.
7. When the access token expires, call:

```
POST /auth/refresh
```

to obtain a new access token.

---

# Bonus Features Implemented

- ✅ Pagination (Services & Bookings via `?page=&limit=`)
- ✅ Search bookings (customer name, email, or phone via `?search=`)
- ✅ Filter bookings by status (`?status=PENDING`)
- ✅ Swagger documentation (`/api`)
- ✅ Docker support (`docker-compose up --build`)
- ✅ Validation using `class-validator` on all DTOs
- ✅ Global Exception Handling with consistent error responses
- ✅ Refresh Token authentication (short-lived access token + long-lived refresh token, token rotation, logout invalidation)
- ✅ Prevent duplicate bookings (same service, date, and time)

---

# Assumptions Made

- JWT is used for authentication.
- Access tokens are short-lived.
- Refresh tokens are securely stored and rotated.
- Passwords are hashed using bcrypt.
- TypeORM migrations manage the database schema.
- Validation is handled globally using ValidationPipe.
- PostgreSQL is the primary database.
- Docker Compose automatically starts the database and applies migrations.

---

# Future Improvements

- Add comprehensive unit and end-to-end tests (Jest is already scaffolded by NestJS CLI)
- Add rate limiting on public booking creation to prevent abuse
- Implement full role-based access control (Admin, Staff, Customer)
- Token blacklist/rotation tracking for additional refresh token security
- Email verification
- Password reset
- Health check endpoint
- Logging and monitoring
- CI/CD pipeline

---

# License

This project is licensed under the MIT License.

---

# Author

Developed as part of the **Booking Platform API Assignment** using:

- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- Refresh Tokens
- Swagger/OpenAPI
- Docker
- TypeScript
