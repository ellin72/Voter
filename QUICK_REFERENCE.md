# 🚀 Quick Reference Guide

Fast lookup guide for common tasks and information.

## Getting Started (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (add your Firebase credentials)
# Copy from .env.example and fill in values

# 3. Start development server
npm start

# 4. Open browser
# http://localhost:3000
```

## Environment Variables Quick Copy

Create `.env.local` with these variables:

```
REACT_APP_FIREBASE_API_KEY=your_value_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_value_here
REACT_APP_FIREBASE_PROJECT_ID=your_value_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_value_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_value_here
REACT_APP_FIREBASE_APP_ID=your_value_here
```

Get values from Firebase Console → Project Settings → Your apps

## URLs

| Page            | URL                               |
| --------------- | --------------------------------- |
| Home (Voting)   | http://localhost:3000             |
| Results         | http://localhost:3000/results     |
| Admin Login     | http://localhost:3000/admin-login |
| Admin Dashboard | http://localhost:3000/admin       |

## Admin Credentials (Change After First Login!)

- **Email**: `admin@hospital.com`
- **Password**: `admin123`

## Project Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## Project Structure at a Glance

```
src/
├── firebase.js          ← Firebase config
├── App.js              ← Main app & routes
├── context/            ← State management
│   ├── AuthContext.js  ← Admin auth
│   └── VotingContext.js ← Voting logic
├── pages/              ← Page components
│   ├── HomePage.js
│   ├── ResultsPage.js
│   ├── AdminLoginPage.js
│   └── AdminDashboard.js
└── components/         ← Reusable components
    └── ProtectedRoute.js
```

## Key Technologies

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling
- **Firebase** - Backend & auth
- **React Router** - Navigation
- **Lucide** - Icons

## Firestore Collection Schema

```javascript
// Collection: nurses
{
  name: "NURSE NAME",
  department: "Department/Unit",
  votes: 0,
  createdAt: timestamp
}
```

## State Management

### VotingContext provides:

- `nurses` - List of all nurses
- `addVote()` - Add vote for nurse
- `addNurse()` - Add new nurse
- `updateNurse()` - Edit nurse
- `deleteNurse()` - Delete nurse
- `resetAllVotes()` - Clear all votes
- `getTotalVotes()` - Total vote count
- `getPercentage()` - Calculate vote %
- `darkMode` / `toggleDarkMode` - Theme
- `searchTerm` / `setSearchTerm` - Search
- `userVoted` - Has user voted?

### AuthContext provides:

- `currentUser` - Logged in user
- `login()` - Login with email/password
- `logout()` - Logout user
- `loading` - Auth loading state

## Common Code Snippets

### Using VotingContext

```javascript
import { useVoting } from '../context/VotingContext';

function Component() {
  const { nurses, addVote, userVoted } = useVoting();

  return (
    // Your JSX
  );
}
```

### Using AuthContext

```javascript
import { useAuth } from '../context/AuthContext';

function Component() {
  const { currentUser, login, logout } = useAuth();

  return (
    // Your JSX
  );
}
```

### Protected Route

```javascript
import ProtectedRoute from "./components/ProtectedRoute";

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>;
```

## Tailwind Utility Classes Used

```
Colors:
- bg-blue-600, bg-blue-50, bg-blue-100
- text-blue-600, text-gray-800
- border-blue-400, border-gray-300

Spacing:
- p-6, px-4, py-2
- m-4, mb-2, ml-3
- gap-4, gap-2

Layout:
- flex, grid
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- items-center, justify-between

Effects:
- shadow-lg, shadow-md
- rounded-lg, rounded-xl
- hover:shadow-xl, active:scale-95
- transition, duration-300
```

## Firebase Firestore Rules

```javascript
// Anyone can read nurses
allow read: if true;

// Only authenticated users can write
allow write: if request.auth != null;
```

## Deployment One-Liners

### Firebase

```bash
npm run build && firebase deploy
```

### Netlify

```bash
netlify deploy --prod --dir=build
```

### Vercel

```bash
vercel --prod
```

## Environment Setup Checklist

- [ ] Node.js installed (v14+)
- [ ] npm or yarn installed
- [ ] Firebase project created
- [ ] Firestore database created
- [ ] Authentication enabled
- [ ] Admin user created
- [ ] `.env.local` file created
- [ ] All Firebase credentials filled in
- [ ] `.gitignore` updated

## Debugging Tips

### Check Firebase Connection

```javascript
// In browser console
firebase
  .firestore()
  .collection("nurses")
  .get()
  .then((snap) => {
    console.log(snap.docs.map((d) => d.data()));
  });
```

### Check Auth State

```javascript
// In browser console
auth.onAuthStateChanged((user) => {
  console.log(user);
});
```

### Check localStorage

```javascript
// In browser console
localStorage.getItem("userVoted");
localStorage.removeItem("userVoted");
```

## CSS Classes Key

```css
/* Custom animations */
@keyframes slideDown { ... }
@keyframes slideUp { ... }

/* Tailwind imports */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Color scheme */
Primary: #0066cc (blue-600)
Secondary: #0052a3 (blue-700)
Success: #4caf50 (green)
Danger: #dc3545 (red)
```

## Pre-deployment Checks

```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Build
npm run build

# Check for errors
echo "Build complete!"
```

## Performance Tips

- Images: Use emojis (already done)
- Code splitting: Already configured
- Lazy loading: Add as needed
- Database: Firestore handles scaling

## Security Checklist

✅ No hardcoded credentials  
✅ `.env.local` in `.gitignore`  
✅ Firestore rules configured  
✅ Authentication enabled  
✅ Protected admin routes  
✅ HTTPS on deployment

## File Size Goals

- Bundle: < 200KB
- Tailwind: Tree-shaked to ~50KB
- React + deps: ~100KB
- Total: ~150KB gzipped

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile browsers

## API Endpoints (None - Fully Client-Side!)

All data operations go through:

- Firebase Firestore (database)
- Firebase Auth (authentication)
- No custom backend needed

## Styling Quick Reference

```jsx
// Button
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">

// Card
<div className="bg-white rounded-lg shadow-lg p-6">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive Text
<h1 className="text-4xl md:text-3xl lg:text-2xl">

// Flex Center
<div className="flex items-center justify-center">
```

## Resources

| Resource      | Link                     |
| ------------- | ------------------------ |
| React Docs    | react.dev                |
| Tailwind Docs | tailwindcss.com          |
| Firebase Docs | firebase.google.com/docs |
| Lucide Icons  | lucide.dev               |
| React Router  | reactrouter.com          |

## Troubleshooting Quick Fix

| Issue          | Fix                          |
| -------------- | ---------------------------- |
| Won't start    | `npm install`                |
| Firebase error | Check `.env.local`           |
| Can't login    | Check admin user in Firebase |
| No votes       | Restart dev server           |
| Styling broken | Check Tailwind import        |
| Deploy fails   | Run `npm run build` first    |

## Code Quality

- ESLint: Configure as needed
- Prettier: Configure as needed
- Tests: Add Jest/React Testing Library
- TypeScript: Can add for stricter typing

---

**🎯 Pro Tip**: Bookmark this file for quick reference!
