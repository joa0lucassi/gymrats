# GymRats — Technology Stack

## 1. Purpose

This document describes the initial technology stack selected for GymRats and the reasoning behind the main technical decisions.

The stack may evolve as the project grows.

---

# 2. Architecture Overview

GymRats will initially follow a client-server architecture with three main components:

```text
Frontend
   ↓
REST API
   ↓
Backend
   ↓
Database
```

The initial implementation will remain a modular monolith.

Microservices will not be used during the MVP because they would introduce unnecessary infrastructure and development complexity.

---

# 3. Programming Language

## TypeScript

TypeScript will be the primary programming language for both frontend and backend development.

Using the same language across the application provides:

- static typing;
- better IDE support;
- safer refactoring;
- shared knowledge between frontend and backend;
- improved maintainability.

```text
Frontend → TypeScript
Backend  → TypeScript
```

---

# 4. Frontend

## Next.js

The web application will be built with Next.js and React.

Responsibilities include:

- user interface;
- page navigation;
- responsive layouts;
- forms;
- dashboard visualization;
- communication with the GymRats API.

The application will use the Next.js App Router.

### Why Next.js?

Next.js provides a structured React environment while supporting modern application patterns and future scalability.

It also allows the project to evolve without requiring a frontend rewrite as new GymRats features are introduced.

---

# 5. Styling

## Tailwind CSS

Tailwind CSS will initially be used for styling the web application.

Reasons include:

- rapid UI development;
- responsive design support;
- consistent design tokens;
- easy creation of reusable interfaces;
- strong support for modern application layouts.

A custom GymRats design system may gradually be created on top of Tailwind.

---

# 6. Backend

## NestJS

The GymRats API will be developed using NestJS.

The backend will be independent from the frontend application.

Responsibilities include:

- authentication;
- authorization;
- business rules;
- workout management;
- goal management;
- gamification;
- personal record detection;
- database access;
- API validation.

### Why NestJS?

NestJS provides a structured architecture based on modules, controllers and services.

This makes it suitable for a project expected to grow considerably over time.

Possible modules include:

```text
AuthModule
UsersModule
ProfilesModule
ExercisesModule
WorkoutsModule
GoalsModule
GamificationModule
```

Future modules may include:

```text
ChallengesModule
SocialModule
CommunitiesModule
HealthModule
```

---

# 7. API

## REST API

The first version of GymRats will use a REST API.

Example endpoints:

```text
POST   /auth/register
POST   /auth/login

GET    /users/me

GET    /exercises
GET    /exercises/:id

POST   /workout-plans
GET    /workout-plans
GET    /workout-plans/:id
PATCH  /workout-plans/:id
DELETE /workout-plans/:id

POST   /workouts
GET    /workouts
GET    /workouts/:id

GET    /goals
POST   /goals

GET    /achievements
```

GraphQL is not required for the initial version.

---

# 8. Database

## PostgreSQL

GymRats will use PostgreSQL as its relational database.

A relational database fits the project because GymRats contains strongly related entities such as:

```text
Users
Workout Plans
Exercises
Workout Sessions
Workout Sets
Goals
Achievements
Personal Records
```

These relationships benefit from:

- foreign keys;
- constraints;
- transactions;
- relational queries;
- structured data modeling.

---

# 9. ORM

## Prisma ORM

Prisma will be used as the initial ORM between the NestJS backend and PostgreSQL.

Responsibilities include:

- data models;
- type-safe database access;
- migrations;
- database queries.

Initial development should use a stable Prisma release rather than release candidate versions.

---

# 10. Authentication

Authentication will be implemented in the backend.

The initial system is expected to use:

```text
Email / Username
        ↓
Password
        ↓
Authentication
        ↓
Access Token
        +
Refresh Token
```

Passwords must always be hashed before being stored.

Authorization rules will determine which resources belong to each authenticated user.

Implementation details will be defined in the security documentation.

---

# 11. Validation

All external data received by the backend must be validated.

Examples:

```text
Registration requests
Workout data
Exercise data
Goals
Profile updates
```

The API must never assume that data received from the frontend is valid.

---

# 12. Local Development

## Docker

Docker will be used to provide reproducible local infrastructure.

Initially, PostgreSQL will run inside a Docker container.

Example:

```text
Developer Machine

├── Next.js
├── NestJS
│
└── Docker
      └── PostgreSQL
```

As the project evolves, additional services may also run through Docker.

---

# 13. Docker Compose

Docker Compose will manage local infrastructure.

The initial Compose environment may contain:

```text
services:

  database:
    PostgreSQL
```

Future versions may include:

```text
database
redis
object-storage
```

The frontend and backend do not necessarily need to run inside containers during early development.

This keeps the development workflow simpler while preserving reproducible infrastructure.

---

# 14. Initial Project Structure

The repository will initially follow this structure:

```text
gymrats/
│
├── frontend/
│
├── backend/
│
├── docs/
│   ├── DATABASE.md
│   ├── PRODUCT_VISION.md
│   ├── REQUIREMENTS.md
│   ├── ROADMAP.md
│   ├── TECH_STACK.md
│   └── USER_FLOWS.md
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

The frontend and backend will remain separate applications inside the same repository.

---

# 15. Frontend Responsibilities

The frontend should handle:

```text
UI rendering
Navigation
Forms
Client-side interaction
API requests
Loading states
Error states
Dashboard visualization
```

Business rules should not depend exclusively on frontend logic.

---

# 16. Backend Responsibilities

The backend should handle:

```text
Authentication
Authorization
Validation
Business rules
Database operations
Personal record detection
XP calculation
Goal completion
Achievements
Workout processing
```

The backend must remain the authoritative source for important application rules.

For example, the frontend should never decide independently that a user earned XP.

Instead:

```text
Workout Completed
        ↓
Backend validates workout
        ↓
Backend calculates rewards
        ↓
XP Transaction created
        ↓
Frontend receives result
```

---

# 17. Database Responsibilities

PostgreSQL will store persistent application data.

Examples include:

```text
Users
Profiles
Exercises
Workout Plans
Workout Sessions
Workout Sets
Personal Records
Goals
Achievements
XP Transactions
```

The database should enforce important integrity rules whenever possible.

---

# 18. Future Infrastructure

The following technologies may be introduced later if required:

## Redis

Possible uses:

- caching;
- rate limiting;
- leaderboards;
- temporary data.

Redis should not be introduced until there is a clear need.

## Object Storage

Required when GymRats introduces files such as:

- profile images;
- post images;
- health documents.

## Background Jobs

Future background processing may be useful for:

- notifications;
- challenge processing;
- scheduled goals;
- statistics generation.

## WebSockets

May eventually be introduced for features requiring real-time communication.

They are not necessary for the MVP.

---

# 19. Mobile Application

The first version of GymRats will focus on a responsive web application.

A native/mobile application may be introduced later.

A possible future choice is React Native.

Because business logic and data will already be exposed through the GymRats API, a future mobile client can consume the same backend.

```text
                 GymRats API
                 /         \
                /           \
          Web App          Mobile App
```

This is one reason the backend will remain separate from the Next.js frontend.

---

# 20. Initial Technology Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Web Frontend | Next.js + React |
| Styling | Tailwind CSS |
| Backend | NestJS |
| API | REST |
| Database | PostgreSQL |
| ORM | Prisma |
| Local Infrastructure | Docker |
| Container Orchestration | Docker Compose |
| Version Control | Git |
| Repository | GitHub |

---

# 21. Engineering Principle

Technologies should be introduced because they solve an existing problem, not simply because they are popular.

The project should prefer:

**simple architecture first → complexity when required**

rather than:

**complex architecture first → justification later**
