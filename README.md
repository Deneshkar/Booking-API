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
- Password hashing using bcrypt
- Role-based authorization
- Service Management (CRUD)
- Booking Management
- Booking Status Updates
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

No local installation of Node.js or PostgreSQL is required.

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd booking-platform-api
```

Install dependencies (only for local development):

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
JWT_EXPIRES_IN=1d
```

> **Note:** When running with Docker, the provided Docker configuration supplies the required environment variables automatically. You only need a `.env` file if you want to customize the configuration.

---

# Database Setup (Local)

1. Make sure PostgreSQL is installed and running.

2. Create the database:

```sql
CREATE DATABASE booking_platform;
```

3. Run the migrations:

```bash
npm run migration:run
```

---

# Running Migrations

This project uses **TypeORM migrations** to manage the database schema.

## Run existing migrations

```bash
npm run migration:run
```

## Generate a new migration

After modifying an entity:

```bash
npm run migration:generate -- src/migrations/YourMigrationName
```

## Revert the latest migration

```bash
npm run migration:revert
```

> **Docker Note:** When the application is started with Docker Compose, migrations are executed automatically during container startup. You do **not** need to run them manually.

---

# Running the Application (Local)

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

Application URL:

```
http://localhost:3000
```

---

# Running with Docker

The easiest way to run this project—no need to install PostgreSQL or Node.js locally.

## Start the application

```bash
docker-compose up --build
```

This command will:

- Build the application image
- Start the NestJS API
- Start a PostgreSQL database
- Run TypeORM migrations automatically
- Expose the API at:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/api
```

## Stop the application

```bash
docker-compose down
```

If you also want to remove the database volume:

```bash
docker-compose down -v
```

---

# Swagger Documentation

After starting the application, open:

```
http://localhost:3000/api
```

Swagger provides interactive documentation for every endpoint.

---

# API Modules

## Authentication

- Register
- Login
- JWT Authentication

---

## Users

- User Management

---

## Services

- Create Service
- Get All Services
- Get Service by ID
- Update Service
- Delete Service

---

## Bookings

- Create Booking
- Get All Bookings
- Get Booking by ID
- Update Booking Status
- Delete Booking

---

# Project Structure

```
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

Start in development:

```bash
npm run start:dev
```

Build the project:

```bash
npm run build
```

Run in production:

```bash
npm run start:prod
```

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate a migration:

```bash
npm run migration:generate -- src/migrations/MigrationName
```

Run migrations:

```bash
npm run migration:run
```

Revert the latest migration:

```bash
npm run migration:revert
```

---

# Testing

Swagger can be used to test every endpoint.

Typical testing flow:

1. Register a user
2. Login
3. Copy the JWT access token
4. Click **Authorize** in Swagger
5. Enter:

```
Bearer YOUR_TOKEN
```

6. Test the protected endpoints.

---

# Assumptions Made

- JWT is used for authentication.
- Passwords are securely hashed using bcrypt.
- Database schema is managed using TypeORM migrations instead of `synchronize: true`.
- Validation is handled using NestJS ValidationPipe.
- PostgreSQL is the primary database.
- Docker Compose automatically starts the database and applies migrations.

---

# Future Improvements

- Refresh Tokens
- Email Verification
- Password Reset
- Pagination
- Search & Filtering
- CI/CD Pipeline
- Unit & Integration Test Coverage
- Granular role-based permissions
- Health Check Endpoint
- Logging & Monitoring

---

# License

This project is licensed under the MIT License.

---

# Author

Developed as part of the Booking Platform API assignment using **NestJS**, **PostgreSQL**, **TypeORM**, **JWT Authentication**, **Swagger**, and **Docker**.
