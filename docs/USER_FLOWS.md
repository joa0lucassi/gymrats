# GymRats — User Flows

## 1. Purpose

This document describes the main user flows of GymRats.

The goal is to define how users move through the application and what actions are required to complete the most important tasks.

These flows will later help define:

- application screens;
- frontend navigation;
- backend endpoints;
- database entities.

---

# 2. User Registration

## Goal

Allow a new user to create an account and access GymRats.

## Flow

**Landing Page**  
→ Sign Up  
→ Enter registration information  
→ Submit form  
→ Account created  
→ Profile created  
→ User redirected to onboarding or dashboard

Possible registration information:

- email;
- username;
- password.

---

# 3. User Login

## Goal

Allow an existing user to access the platform.

## Flow

**Landing Page**  
→ Login  
→ Enter credentials  
→ Authentication  
→ Dashboard

If authentication fails:

Login  
→ Invalid credentials message  
→ User tries again or requests password recovery

---

# 4. Initial Onboarding

## Goal

Collect basic information and introduce the user to GymRats.

## Flow

First Login  
→ Welcome Screen  
→ Basic profile configuration  
→ Training experience  
→ Optional initial goal  
→ Dashboard

Possible training experience options:

- Beginner
- Intermediate
- Advanced

The onboarding process should remain short and optional fields should not block access to the application.

---

# 5. Dashboard

The dashboard acts as the main entry point after authentication.

## Main Information

The dashboard may display:

- current level;
- XP progress;
- active goals;
- workout streak;
- recent workouts;
- recent personal records;
- next planned workout;
- quick action to start a workout.

Example:

```text
Welcome back, João

Level 8
████████░░ 820 / 1000 XP

🔥 Weekly Streak: 4 weeks

Weekly Goal
3 / 4 workouts

Recent PR
Bench Press — 90 kg

[ Start Workout ]
```

---

# 6. Create Workout Plan

## Goal

Allow users to create a reusable workout routine.

## Flow

Dashboard  
→ Workouts  
→ Create Workout Plan  
→ Enter workout name  
→ Add exercises  
→ Reorder exercises  
→ Save workout

Example:

```text
Push Day

1. Bench Press
2. Incline Dumbbell Press
3. Shoulder Press
4. Lateral Raise
5. Triceps Extension
```

After saving:

Workout Plan  
→ Saved  
→ Available in user's workout list

---

# 7. Start Workout

## Goal

Allow users to begin a training session.

## Flow

Dashboard  
→ Start Workout

or

Workouts  
→ Select Workout Plan  
→ Start Workout

The system creates a new workout session.

---

# 8. Record Workout

This is one of the most important flows in GymRats.

The process must remain fast and simple because users will interact with it during training.

## Flow

Start Workout  
→ Exercise displayed  
→ Add set  
→ Enter weight  
→ Enter repetitions  
→ Mark set as completed  
→ Continue to next set

Example:

```text
Bench Press

Previous Workout

80 kg × 10
80 kg × 9
75 kg × 10

Current Workout

Set 1
[ 82.5 kg ] [ 10 reps ] ✓

Set 2
[ 82.5 kg ] [ 8 reps ] ✓

Set 3
[          ] [        ]
```

The previous workout data may be displayed to help the user track progression.

---

# 9. Add Exercise During Workout

Users should not be forced to follow the original plan exactly.

## Flow

Active Workout  
→ Add Exercise  
→ Search Exercise Library  
→ Select Exercise  
→ Add to Current Workout

The workout plan itself should not necessarily be modified unless the user explicitly chooses to update it.

---

# 10. Finish Workout

## Flow

Active Workout  
→ Finish Workout  
→ Confirmation  
→ Workout processed  
→ Results Screen

The application calculates available workout statistics.

Example:

```text
Workout Complete

Duration
58 min

Exercises
6

Sets
18

Training Volume
7,820 kg

XP Earned
+120 XP

Personal Records
2 new PRs
```

---

# 11. Personal Record Detection

## Flow

Workout completed  
→ System analyzes workout sets  
→ Compares results with previous performances  
→ Detects personal record  
→ Stores PR  
→ Displays achievement

Example:

```text
🏆 New Personal Record

Bench Press

Previous PR
90 kg

New PR
92.5 kg
```

The user may later share the achievement when social features are available.

---

# 12. Workout History

## Goal

Allow users to review previous training sessions.

## Flow

Dashboard  
→ History  
→ Workout List  
→ Select Workout  
→ Workout Details

The workout list may display:

```text
September 28
Push Day
58 min

September 26
Pull Day
64 min

September 24
Leg Day
71 min
```

Selecting a workout displays:

- exercises;
- sets;
- weights;
- repetitions;
- notes;
- duration;
- training volume;
- personal records.

---

# 13. Exercise Progress

## Goal

Allow the user to analyze progression in a specific exercise.

## Flow

Exercises  
→ Select Exercise  
→ Exercise History  
→ Progress Dashboard

Possible information:

- highest weight;
- estimated 1RM;
- total volume;
- repetitions;
- recent sessions.

Example:

```text
Bench Press

Current PR
92.5 kg

Previous PR
90 kg

Last 30 Days

82.5 kg
85 kg
87.5 kg
90 kg
92.5 kg
```

---

# 14. Create Personal Goal

## Flow

Dashboard  
→ Goals  
→ Create Goal  
→ Select goal type  
→ Define target  
→ Define deadline  
→ Save

Example:

```text
Goal

Complete 4 workouts per week

Duration
4 weeks
```

The application begins tracking the goal.

---

# 15. Goal Progress

## Flow

Dashboard  
→ Active Goal

Example:

```text
Weekly Training Goal

3 / 4 workouts

███████░░░ 75%

2 days remaining
```

When the target is reached:

Goal Completed  
→ XP awarded  
→ Possible achievement  
→ Goal added to history

---

# 16. Gamification Flow

Gamification should normally happen automatically.

The user should not need to manually interact with the XP system.

## Example

Workout Completed  
→ +100 XP

Personal Record  
→ +50 XP

Weekly Goal Completed  
→ +200 XP

Total XP reaches level threshold  
→ Level Up

Example:

```text
⚡ LEVEL UP

Level 8 → Level 9

New Achievement Unlocked

Consistency II
```

---

# 17. Achievements

## Flow

User performs activity  
→ Achievement condition verified  
→ Achievement unlocked  
→ Notification displayed  
→ Achievement added to profile

Example:

```text
🏆 Achievement Unlocked

50 Workouts

Complete 50 workout sessions.
```

---

# 18. Future Friend Flow

This feature will be introduced after the core MVP.

## Flow

Users  
→ Search User  
→ View Profile  
→ Send Friend Request

Other User:

Notification  
→ Friend Request  
→ Accept / Reject

After acceptance:

Users become friends  
→ Selected activity becomes visible

---

# 19. Future Challenge Flow

## Creating a Challenge

Challenges  
→ Create Challenge  
→ Select metric  
→ Define target  
→ Define duration  
→ Invite friends  
→ Create

Example:

```text
October Challenge

Goal
20 workouts

Duration
October 1–31

Participants
João
Lucas
Pedro
```

## Challenge Progress

Challenge  
→ Participant progress  
→ Leaderboard  
→ Challenge deadline  
→ Results

---

# 20. Future Community Flow

## Flow

Community  
→ Browse Communities  
→ Join Community  
→ View Feed  
→ Participate in challenges and discussions

Communities may represent:

- universities;
- gyms;
- friend groups;
- sports;
- training styles.

---

# 21. Future Health Tracking Flow

Health information must remain private by default.

## Add Health Metric

Dashboard  
→ Health  
→ Select Metric  
→ Add Measurement  
→ Save

Example:

```text
Body Weight

95.4 kg
September 29
