# GymRats — System Architecture

## 1. Purpose

This document describes the initial system architecture of GymRats.

The goal is to define how the main parts of the application communicate and establish clear responsibilities between frontend, backend and database layers.

GymRats will initially use a modular monolith architecture.

---

# 2. High-Level Architecture

```text
                    GYMRATS

                 ┌─────────────┐
                 │   User      │
                 └──────┬──────┘
                        │
                        ▼
              ┌───────────────────┐
              │      Next.js      │
              │     Frontend      │
              └────────┬──────────┘
                       │
                       │ HTTPS / REST
                       ▼
              ┌───────────────────┐
              │      NestJS       │
              │      Backend      │
              └────────┬──────────┘
                       │
                       │ Prisma ORM
                       ▼
              ┌───────────────────┐
              │    PostgreSQL     │
              │     Database      │
              └───────────────────┘
```

The frontend communicates with the backend through a REST API.

The frontend must not access the database directly.

---

# 3. Architecture Style

GymRats will initially use a:

**Modular Monolith**

This means the backend will run as a single application while being internally divided into independent modules.

Example:

```text
NestJS Application

├── Auth Module
├── Users Module
├── Profiles Module
├── Exercises Module
├── Workouts Module
├── Goals Module
└── Gamification Module
```

This architecture provides clear separation between domains without introducing the complexity of microservices.

Microservices may only be considered in the future if there is a real technical requirement.

---

# 4. Frontend Architecture

The frontend will be developed with:

```text
Next.js
React
TypeScript
Tailwind CSS
```

The frontend is responsible for:

- rendering the user interface;
- navigation;
- user interactions;
- forms;
- client-side validation;
- API communication;
- loading states;
- error states;
- responsive layouts;
- dashboard visualizations.

The frontend must not contain authoritative business rules.

For example, the frontend may display the XP earned by a workout, but the backend must calculate the XP.

---

# 5. Initial Frontend Structure

A possible initial structure is:

```text
frontend/
│
├── src/
│   │
│   ├── app/
│   │
│   │   ├── login/
│   │   │
│   │   ├── register/
│   │   │
│   │   ├── dashboard/
│   │   │
│   │   ├── workouts/
│   │   │
│   │   ├── exercises/
│   │   │
│   │   ├── goals/
│   │   │
│   │   ├── progress/
│   │   │
│   │   └── profile/
│   │
│   ├── components/
│   │
│   ├── services/
│   │
│   ├── hooks/
│   │
│   ├── types/
│   │
│   └── utils/
│
├── public/
│
└── package.json
```

This structure may evolve during development.

---

# 6. Backend Architecture

The backend will be developed using NestJS.

The backend acts as the main source of truth for application rules.

Responsibilities include:

- authentication;
- authorization;
- validation;
- business logic;
- workout processing;
- personal record detection;
- goal progress;
- XP calculation;
- achievement unlocking;
- database access.

---

# 7. Backend Layer Structure

Each domain should generally follow the structure:

```text
Request
   ↓
Controller
   ↓
Service
   ↓
Repository / Prisma
   ↓
Database
```

Example:

```text
POST /workouts/:id/finish
        ↓
WorkoutController
        ↓
WorkoutService
        ↓
Business Logic
        ↓
Prisma
        ↓
PostgreSQL
```

Controllers should remain lightweight.

Business logic should primarily live inside services.

---

# 8. Backend Modules

The initial backend may contain the following modules:

```text
backend/src/

├── auth/
├── users/
├── profiles/
├── exercises/
├── workout-plans/
├── workouts/
├── goals/
├── gamification/
└── database/
```

Future modules may include:

```text
challenges/
social/
communities/
health/
notifications/
```

---

# 9. Authentication Module

The `AuthModule` will be responsible for:

```text
Registration
Login
Password verification
Token generation
Token refresh
Authentication guards
Password recovery
```

Authentication flow:

```text
User
 ↓
Login Request
 ↓
Auth Controller
 ↓
Auth Service
 ↓
User Validation
 ↓
Password Verification
 ↓
Token Generation
 ↓
Access Granted
```

Protected endpoints must validate the authenticated user before executing restricted actions.

---

# 10. Authorization

Authentication answers:

```text
Who is the user?
```

Authorization answers:

```text
Can this user perform this action?
```

Example:

A user may access:

```text
GET /workouts/123
```

only if the workout belongs to that user or the resource has explicitly been made accessible.

The backend must never trust resource ownership information sent by the frontend.

---

# 11. Workout Module

The workout domain will manage:

```text
Workout Plans
Workout Sessions
Exercises inside sessions
Workout Sets
Workout History
```

Example flow:

```text
User starts workout
        ↓
Frontend sends request
        ↓
WorkoutController
        ↓
WorkoutService
        ↓
WorkoutSession created
        ↓
Database
```

When the workout is completed:

```text
Finish Workout
      ↓
Validate session
      ↓
Calculate workout data
      ↓
Detect personal records
      ↓
Update goals
      ↓
Process gamification
      ↓
Store results
      ↓
Return summary
```

---

# 12. Gamification Module

Gamification should be treated as its own domain.

Responsibilities include:

```text
XP
Levels
Achievements
Streaks
Rewards
```

Example:

```text
Workout Completed
        ↓
Workout Service
        ↓
Gamification Service
        ↓
Calculate XP
        ↓
Create XP Transaction
        ↓
Check Level
        ↓
Check Achievements
```

This keeps gamification rules separated from workout logic.

---

# 13. Goals Module

The goals domain will manage:

```text
Goal creation
Goal progress
Goal completion
Goal history
```

Example:

```text
Workout Completed
       ↓
Goal Service
       ↓
Find active workout goals
       ↓
Update progress
       ↓
Goal completed?
       ↓
Gamification Service
       ↓
Reward XP
```

---

# 14. Communication Between Modules

Modules should interact through services rather than accessing each other's database logic directly.

Preferred:

```text
WorkoutService
      ↓
GamificationService
```

Avoid:

```text
WorkoutService
      ↓
Directly modify XP tables
```

This creates clear boundaries and makes future changes easier.

---

# 15. Database Layer

Prisma will act as the database access layer.

```text
NestJS Service
      ↓
Prisma
      ↓
PostgreSQL
```

Application modules should not contain raw database connection logic unless there is a specific technical reason.

---

# 16. Example Complete Request

Example:

A user records:

```text
Bench Press
80 kg × 10
```

Flow:

```text
User
 ↓
Next.js UI
 ↓
POST /workouts/{id}/sets
 ↓
NestJS Controller
 ↓
Authentication Guard
 ↓
Validation
 ↓
Workout Service
 ↓
Prisma
 ↓
PostgreSQL
 ↓
Response
 ↓
Next.js updates UI
```

---

# 17. Workout Completion Flow

Workout completion is one of the most important operations in GymRats.

```text
User clicks
Finish Workout
      ↓
Frontend
      ↓
POST /workouts/{id}/finish
      ↓
Backend
      ↓
Validate workout ownership
      ↓
Validate workout data
      ↓
Complete session
      ↓
Calculate statistics
      ↓
Detect PRs
      ↓
Update goals
      ↓
Calculate XP
      ↓
Check achievements
