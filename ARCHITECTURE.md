# 🏗️ Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           REACT APPLICATION                         │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │         React Router v6                        │  │   │
│  │  │  Route: /        → HomePage (Voting)           │  │   │
│  │  │  Route: /results → ResultsPage                 │  │   │
│  │  │  Route: /admin-login → AdminLoginPage          │  │   │
│  │  │  Route: /admin   → AdminDashboard (Protected)  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                       ↓                               │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │         State Management (Context)             │  │   │
│  │  │  • VotingContext (votes, nurses, search)       │  │   │
│  │  │  • AuthContext (user, login, logout)           │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                       ↓                               │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │         Firebase SDK                           │  │   │
│  │  │  • Firestore (database)                        │  │   │
│  │  │  • Auth (authentication)                       │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                       ↓                               │   │
│  │  localStorage                                       │   │
│  │  • userVoted: true/false                          │   │
│  │  • userTheme: light/dark                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTPS ↓
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE BACKEND                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firebase Authentication                            │   │
│  │  • Email/Password                                   │   │
│  │  • User sessions                                    │   │
│  │  • JWT tokens                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firestore Database                                 │   │
│  │  Collections:                                        │   │
│  │  • nurses (documents with name, dept, votes)       │   │
│  │  • Real-time listeners                             │   │
│  │  • Security rules enforcement                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Firebase Hosting (Deployment)                      │   │
│  │  • Static files                                     │   │
│  │  • CDN & caching                                    │   │
│  │  • HTTPS & SSL                                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Navigation
│   ├── Logo
│   ├── Menu Links
│   └── Dark Mode Toggle
│
├── Routes
│   ├── / (HomePage)
│   │   ├── Header
│   │   ├── SearchBar
│   │   ├── NurseCards (Grid)
│   │   │   ├── Avatar
│   │   │   ├── Name
│   │   │   ├── Department
│   │   │   ├── Vote Count
│   │   │   └── Vote Button
│   │   └── Footer Stats
│   │
│   ├── /results (ResultsPage)
│   │   ├── Header
│   │   ├── Statistics Cards
│   │   └── Results List
│   │       ├── Rank
│   │       ├── Nurse Info
│   │       ├── Vote Count
│   │       ├── Percentage Bar
│   │       └── Leading Badge
│   │
│   ├── /admin-login (AdminLoginPage)
│   │   ├── Login Form
│   │   │   ├── Email Input
│   │   │   ├── Password Input
│   │   │   └── Login Button
│   │   └── Demo Credentials Info
│   │
│   └── /admin (AdminDashboard - Protected)
│       ├── Header with Logout
│       ├── Statistics Cards
│       ├── Action Buttons
│       ├── Add Nurse Form (Conditional)
│       └── Nurses Table
│           ├── Name (Editable)
│           ├── Department (Editable)
│           ├── Vote Count
│           └── Actions (Edit, Delete)
│
└── Providers
    ├── AuthProvider
    │   └── currentUser, login, logout
    │
    └── VotingProvider
        ├── nurses, userVoted, darkMode
        ├── addVote, addNurse, updateNurse
        ├── deleteNurse, resetAllVotes
        └── getTotalVotes, getPercentage
```

## Data Flow Diagram

### Voting Flow

```
User Opens App
    ↓
Check localStorage (userVoted)
    ↓
If voted: Disable vote buttons
If not voted: Enable vote buttons
    ↓
User clicks "Vote Now"
    ↓
Confirmation Dialog
    ↓
User Confirms
    ↓
Update Firestore: nurses[id].votes++
    ↓
Real-time listener updates UI
    ↓
Set localStorage.userVoted = true
    ↓
Disable vote buttons
    ↓
Show thank you animation
    ↓
Update Results Page live
```

### Admin Dashboard Flow

```
Admin Goes to /admin-login
    ↓
Enters Email + Password
    ↓
Firebase Authentication
    ↓
Token Generated
    ↓
Admin Dashboard Accessible
    ↓
Real-time Firestore listener activated
    ↓
Admin Actions:
├── Add: POST to nurses collection
├── Edit: UPDATE nurse document
├── Delete: DELETE nurse document
└── Reset: UPDATE all votes to 0
    ↓
Firestore Security Rules check
    ↓
Update applied (if authorized)
    ↓
Real-time update sent to all connected clients
```

### Real-time Update Flow

```
User 1 votes for Nurse A
    ↓
Firestore updated (votes: 5 → 6)
    ↓
Real-time listener triggers
    ↓
VotingContext updates state
    ↓
React re-renders affected components
    ↓
User 2's browser gets update automatically
    ↓
Results page shows updated count (6)
    ↓
Ranking updates if needed
```

## State Management Flow

```
VotingContext
├── State
│   ├── nurses: Nurse[]
│   ├── loading: boolean
│   ├── userVoted: boolean
│   ├── darkMode: boolean
│   └── searchTerm: string
│
├── Effects
│   ├── Load initial nurses
│   └── Subscribe to real-time updates
│
├── Functions
│   ├── addVote(nurseId)
│   ├── addNurse(name, dept)
│   ├── updateNurse(id, name, dept)
│   ├── deleteNurse(id)
│   ├── resetAllVotes()
│   ├── getTotalVotes()
│   ├── getPercentage(votes)
│   └── checkIfUserVoted()
│
└── Provider wraps entire app
    └── All components can useVoting()

AuthContext
├── State
│   ├── currentUser: User | null
│   └── loading: boolean
│
├── Functions
│   ├── login(email, password)
│   ├── signup(email, password)
│   └── logout()
│
├── Firebase Auth listener
└── Provider wraps entire app
    └── All components can useAuth()
```

## Firestore Real-time Listeners

```
App mounts
    ↓
VotingContext initialized
    ↓
onSnapshot(collection(db, 'nurses'))
    ↓
Listener activated
    ↓
Any change to 'nurses' collection
    ↓
Callback triggered
    ↓
setNurses(newData)
    ↓
Component re-renders
    ↓
UI updates instantly across all browsers
    ↓
Unsubscribe on app unmount
```

## Security Flow

```
User attempts voting
    ↓
Check: localStorage.userVoted?
    ↓
If true: Show alert, disable buttons
If false: Continue
    ↓
Firestore rule check:
"allow read: if true"
    ↓
Vote recorded
    ↓
Set localStorage.userVoted = true
    ↓
Button disabled

Admin attempts to edit nurses
    ↓
Check: User authenticated?
    ↓
If no: Redirect to login
If yes: Continue
    ↓
Firestore rule check:
"allow write: if request.auth != null"
    ↓
Update applied
```

## Page Load Sequence

```
1. Browser loads index.html
2. React app initializes
3. AuthProvider mounts
   ├── Check Firebase auth state
   └── Set currentUser
4. VotingProvider mounts
   ├── Load nurses from Firestore
   ├── Check localStorage for userVoted
   └── Set up real-time listener
5. App component renders
6. Router renders current route
7. Components render and use context
8. Real-time listener activated
9. App ready for interaction
```

## Database Transactions

### Vote Recording

```
Client: updateDoc(nurseRef, { votes: current + 1 })
    ↓
Firestore receives update
    ↓
Security rule evaluated
    ↓
If auth != null → Allow
    ↓
Database updated atomically
    ↓
Real-time subscribers notified
    ↓
All connected clients receive update
    ↓
UI updates in real-time
```

### Nurse Management

```
Admin: addDoc(collection, { name, dept, votes: 0 })
    ↓
Firestore receives new document
    ↓
Document ID auto-generated
    ↓
Security rule evaluated
    ↓
If auth != null → Allow
    ↓
Document created
    ↓
Real-time listeners triggered
    ↓
All components update
```

## Authentication Flow

```
Admin enters credentials
    ↓
onClick: login(email, password)
    ↓
Firebase Auth processes
    ↓
Credentials validated
    ↓
JWT token generated
    ↓
Token stored in browser
    ↓
onAuthStateChanged fires
    ↓
currentUser set in AuthContext
    ↓
ProtectedRoute allows access
    ↓
AdminDashboard renders
    ↓
Firestore rules allow writes (auth != null)
    ↓
Admin can modify nurses
```

## Offline Behavior

```
App online
    ↓
Real-time listeners active
    ↓
Data synced continuously

App goes offline
    ↓
Firestore continues working (cached data)
    ↓
Write operations queued
    ↓
App comes back online
    ↓
Queued operations sync
    ↓
Real-time listeners resume
    ↓
Data reconciled automatically
```

## Performance Architecture

```
React Optimization
├── Context-based state (avoids prop drilling)
├── Lazy component loading (Route-based)
├── Memoization (where needed)
└── Efficient re-renders

Tailwind Optimization
├── Tree-shaking (prod build)
├── PurgeCSS (unused styles removed)
└── Minimal CSS bundle

Firebase Optimization
├── Real-time listeners (no polling)
├── Automatic caching
├── Connection pooling
├── CDN for static files
└── Indexed queries

Browser Optimization
├── localStorage (one-vote enforcement)
├── SPA routing (no page reloads)
└── CSS-in-JS (Tailwind utilities)
```

---

This architecture ensures:

- ✅ Real-time updates
- ✅ Secure authentication
- ✅ Scalable database
- ✅ Mobile responsive
- ✅ Fast performance
- ✅ One vote per browser
- ✅ Admin control
- ✅ Professional UI
