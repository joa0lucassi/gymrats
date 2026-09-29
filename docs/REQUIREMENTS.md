# GymRats — Requirements

## 1. Purpose

This document defines the initial functional and non-functional requirements for GymRats.

The requirements are focused primarily on the first version of the platform and may evolve as the project grows.

---

# 2. Functional Requirements

## Authentication

### FR-001 — User Registration

The system must allow users to create an account.

### FR-002 — User Login

The system must allow registered users to authenticate using their credentials.

### FR-003 — User Logout

The system must allow authenticated users to log out.

### FR-004 — Password Recovery

The system should allow users to recover access to their account.

---

# 3. User Profile

### FR-005 — Profile Creation

The system must create a profile for every registered user.

### FR-006 — Profile Editing

Users must be able to edit basic profile information.

Possible information includes:

- username;
- profile picture;
- biography;
- training experience.

### FR-007 — Public Profile

Users should be able to view public information from other users.

Sensitive and private information must not be displayed publicly.

---

# 4. Exercise Management

### FR-008 — Exercise Library

The system must provide a predefined exercise library.

Each exercise may contain:

- name;
- muscle group;
- equipment;
- category.

### FR-009 — Custom Exercises

Users should be able to create custom exercises.

### FR-010 — Exercise Search

Users must be able to search and filter exercises.

---

# 5. Workout Plans

### FR-011 — Create Workout Plan

Users must be able to create reusable workout plans.

Example:

**Push Day**

- Bench Press
- Incline Dumbbell Press
- Shoulder Press
- Lateral Raise
- Triceps Extension

### FR-012 — Edit Workout Plan

Users must be able to modify existing workout plans.

### FR-013 — Delete Workout Plan

Users must be able to delete workout plans.

### FR-014 — Add Exercises to Workout

Users must be able to add exercises from the exercise library to a workout plan.

---

# 6. Workout Sessions

### FR-015 — Start Workout

Users must be able to start a workout based on an existing workout plan.

### FR-016 — Record Sets

Users must be able to record information for each exercise set.

Initially, the system should support:

- weight;
- repetitions;
- set completion status.

### FR-017 — Workout Notes

Users should be able to add notes to exercises or workout sessions.

### FR-018 — Complete Workout

Users must be able to mark a workout session as completed.

### FR-019 — Workout Duration

The system should record the duration of a workout session.

---

# 7. Workout History

### FR-020 — Workout History

Users must be able to view previous workout sessions.

### FR-021 — Workout Details

Users must be able to inspect the exercises, sets, repetitions and weights from previous workouts.

### FR-022 — Training Volume

The system should calculate training volume when applicable.

A possible initial calculation is:

**Volume = Weight × Repetitions**

The system may aggregate this value across sets and exercises.

---

# 8. Personal Records

### FR-023 — Detect Personal Records

The system should automatically identify selected personal records.

Examples include:

- highest weight;
- highest repetitions with a given weight;
- highest training volume.

### FR-024 — Personal Record History

Users should be able to view previous personal records.

---

# 9. Goals

### FR-025 — Create Goals

Users should be able to create personal goals.

Goals may be:

- daily;
- weekly;
- monthly;
- yearly.

### FR-026 — Workout Goals

The system should support workout-related goals.

Example:

> Complete four workouts this week.

### FR-027 — Goal Progress

The system must display the current progress of active goals.

### FR-028 — Goal Completion

The system should automatically detect completion when the required data is available.

---

# 10. Gamification

### FR-029 — Experience Points

Users should earn XP for selected activities.

Possible activities include:

- completing workouts;
- completing goals;
- achieving personal records;
- completing challenges.

### FR-030 — User Levels

The system should calculate a user's level based on accumulated XP.

### FR-031 — Achievements

Users should be able to unlock achievements.

Examples:

- First Workout;
- 10 Workouts;
- First Personal Record;
- Four Consistent Weeks.

### FR-032 — Consistency Streak

The system should track workout consistency.

Streaks should be based on goal completion or planned training frequency rather than requiring daily workouts.

---

# 11. Progress Dashboard

### FR-033 — Personal Dashboard

Users must have access to a dashboard displaying relevant fitness information.

The dashboard may include:

- workouts completed;
- active goals;
- recent personal records;
- current XP;
- level;
- streak;
- recent training activity.

### FR-034 — Progress Visualization

The system should display historical progress using charts when appropriate.

Examples include:

- workout frequency;
- training volume;
- exercise performance;
- personal records over time.

---

# 12. Social Features — Future Version

The following requirements are planned after the core MVP.

### FR-035 — Friend Requests

Users should be able to send, accept and reject friend requests.

### FR-036 — Challenges

Users should be able to create and participate in challenges.

### FR-037 — Official Challenges

GymRats should be able to provide platform-created challenges.

### FR-038 — Challenge Progress

Participants should be able to view their progress during a challenge.

### FR-039 — Leaderboards

The system may provide rankings for specific challenges and groups.

### FR-040 — Activity Feed

Users may eventually share selected workout activities and achievements with other users.

---

# 13. Health Hub — Future Version

Health tracking will not be part of the initial MVP.

### FR-041 — Health Metrics

Users may optionally record health-related information such as:

- body weight;
- body measurements;
- blood pressure;
- blood glucose;
- cholesterol;
- water intake.

### FR-042 — Health History

Users should be able to view historical health information.

### FR-043 — Health Dashboards

The system may provide charts showing changes over time.

### FR-044 — Health Documents

Users may eventually upload health-related documents.

Health information must remain private by default.

---

# 14. Non-Functional Requirements

## NFR-001 — Responsive Interface

The application must work properly on desktop and mobile screen sizes.

## NFR-002 — Usability

Core actions such as recording a workout should require as few steps as reasonably possible.

## NFR-003 — Performance

Common application interactions should provide fast feedback to the user.

## NFR-004 — Security

Passwords must never be stored as plain text.

Authentication and authorization mechanisms must protect restricted resources.

## NFR-005 — Privacy

Private user information must only be accessible to authorized users.

## NFR-006 — Sensitive Data Protection

Future health-related information must receive additional protection and must never be public by default.

## NFR-007 — Data Integrity

The system must avoid inconsistent or duplicated workout data whenever possible.

## NFR-008 — Maintainability

The project should use a modular structure that allows new features to be added without unnecessarily affecting existing functionality.

## NFR-009 — Scalability

The architecture should allow the system to evolve from an initial portfolio project into a larger application without requiring a complete rewrite.

## NFR-010 — Accessibility

The interface should follow basic accessibility practices such as readable text, clear contrast and keyboard-friendly interactions where applicable.

---

# 15. MVP Scope

The first development milestone should focus on:

- authentication;
- user profile;
- exercise library;
- workout plans;
- workout sessions;
- workout history;
- personal records;
- basic goals;
- XP;
- levels;
- achievements;
- consistency tracking;
- personal dashboard.

Social competition, community features and health tracking will be developed in later phases.

---

# 16. Requirement Status

Requirements may be marked using the following states during development:

- `Planned`
- `In Progress`
- `Implemented`
- `Tested`

This document should evolve together with the project.
