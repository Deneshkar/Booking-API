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

---

# Prerequisites

Before running the project, install:

- Node.js (v18 or newer recommended)
- PostgreSQL
- npm

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
JWT_EXPIRES_IN=1d
```

---

# Database Setup

1. Make sure PostgreSQL is installed and running.

2. Create the database:

```sql
CREATE DATABASE booking_platform;
```

3. Run migrations to create the schema (see **Running Migrations** below).

---

# Running Migrations

Tables are created and managed via TypeORM migrations (not auto-sync).

### Run existing migrations

```bash
npm run migration:run
```

### Generate a new migration after changing an entity

```bash
npm run migration:generate -- src/migrations/YourMigrationName
```

### Revert the last migration

```bash
npm run migration:revert
```

---

# Running the Application

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

# Swagger Documentation

After starting the server, open:

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

Run e2e tests:

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

Typical testing flow:

1. Register a user
2. Login
3. Copy JWT token
4. Click **Authorize** in Swagger
5. Paste:

```
Bearer YOUR_TOKEN
```

6. Test protected endpoints.

---

# Assumptions Made

- JWT is used for authentication.
- Passwords are securely hashed using bcrypt.
- Database schema is managed through TypeORM migrations rather than `synchronize: true`, for safer and more production-realistic schema control.
- Validation is performed using NestJS ValidationPipe.
- PostgreSQL is used as the primary database.

---

# Future Improvements

- Refresh Tokens
- Email Verification
- Password Reset
- Pagination
- Search & Filtering
- Docker Support
- CI/CD Pipeline
- Unit & Integration Test Coverage
- Role-based permissions with granular access control

---

# License

This project is licensed under the MIT License.

---

# Author

Developed as part of the Booking Platform API assignment using NestJS, PostgreSQL, TypeORM, JWT Authentication, and Swagger.