# 🔥 Firebase Setup Instructions

Complete step-by-step guide to configure Firebase for the Nurse Voting System.

## Prerequisites

- Google account
- Firebase account (free tier is sufficient)
- This React application

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console

- Visit https://console.firebase.google.com/
- Click "Add project" or "Create a project"

### 1.2 Enter Project Details

- **Project Name**: `nurse-voting-system`
- **Project ID**: Will auto-generate (can customize)
- **Accept terms**: Check the boxes
- Click "Continue"

### 1.3 Enable Google Analytics (Optional)

- Choose: "Enable Google Analytics for this project"
- Accept terms
- Click "Create project"

### 1.4 Wait for Setup

- Firebase will create your project (takes 1-2 minutes)
- Click "Continue" when ready

## Step 2: Register Web App

### 2.1 Add Web App

- Click the `</> icon` next to Android/iOS icons
- Enter app nickname: `nurse-voting-system`
- Click "Register app"

### 2.2 Copy Firebase Config

You'll see a config object:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

**Save this! You'll need it next.**

## Step 3: Setup Firestore Database

### 3.1 Create Database

- In Firebase Console, click **"Firestore Database"** (left sidebar)
- Click **"Create database"**

### 3.2 Configure Database

- **Location**: Select your region (e.g., `us-central1`)
- **Security Rules**: Choose **"Start in production mode"**
  - (Don't worry, we'll add proper rules in Step 6)
- Click **"Create"**

### 3.3 Wait for Creation

- Database will be created (takes 1-2 minutes)
- You should see an empty database

## Step 4: Setup Authentication

### 4.1 Enable Authentication

- Click **"Authentication"** (left sidebar)
- Click **"Get started"**

### 4.2 Enable Email/Password Provider

- Click **"Email/Password"** (first option)
- Toggle **"Enable"** to ON
- Click **"Save"**

### 4.3 Create Admin User

- Click **"Users"** tab
- Click **"Add user"**
- Enter credentials:
  - **Email**: `admin@hospital.com`
  - **Password**: `admin123`
- Click **"Add user"**

**Note**: Change these credentials after first login!

## Step 5: Create Environment Variables

### 5.1 Create .env.local File

In your project root directory, create a file named `.env.local`

### 5.2 Add Firebase Credentials

Copy this template and fill in your Firebase config:

```
REACT_APP_FIREBASE_API_KEY=<YOUR_API_KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN=<YOUR_PROJECT>.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<YOUR_PROJECT>.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<YOUR_SENDER_ID>
REACT_APP_FIREBASE_APP_ID=<YOUR_APP_ID>
```

### 5.3 Replace Placeholders

Replace `<YOUR_API_KEY>`, etc. with values from Step 2.2

### 5.4 Save File

- Save the file as `.env.local` in project root
- **Never commit this file to Git!**

## Step 6: Update Firestore Security Rules

### 6.1 Go to Firestore Rules

- Click **"Firestore Database"** (left sidebar)
- Click **"Rules"** tab

### 6.2 Replace Rules

Delete everything and paste:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read nurse data
    match /nurses/{document=**} {
      allow read: if true;

      // Only authenticated users (admins) can write
      allow create, update, delete: if request.auth != null;
    }

    // Configuration collection (admin only)
    match /config/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 6.3 Publish Rules

- Click **"Publish"** button
- Confirm the changes

## Step 7: Initialize Firestore with Nurses

### 7.1 Start the Application

```bash
npm install
npm start
```

### 7.2 Login as Admin

- Go to http://localhost:3000/admin-login
- Email: `admin@hospital.com`
- Password: `admin123`

### 7.3 Add Default Nurses

Click "Add Nurse" and add:

1. **Nurse 1**
   - Name: `ELLI N SHITUNA`
   - Department: `ICU`

2. **Nurse 2**
   - Name: `PETRINA K NANYANGA`
   - Department: `Emergency`

3. **Nurse 3**
   - Name: `SOLASTICA N NEHEMIA`
   - Department: `Surgery`

### 7.4 Verify in Firestore

- Go to Firebase Console > Firestore Database
- You should see a `nurses` collection with 3 documents

## Step 8: Test the Application

### 8.1 Test Voting

- Go to http://localhost:3000
- Click "Vote Now" for any nurse
- Confirm the vote
- See thank you message
- Vote buttons should be disabled

### 8.2 Check Results

- Go to http://localhost:3000/results
- See the nurse with 1 vote at the top
- Ranking should update in real-time

### 8.3 Test Admin Features

- Go to http://localhost:3000/admin-login
- Login with admin credentials
- Add/Edit/Delete nurses
- Reset votes with confirmation

## Step 9: Deploy to Firebase Hosting

### 9.1 Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 9.2 Login to Firebase

```bash
firebase login
```

- Open browser to Google login
- Follow the flow

### 9.3 Initialize Firebase

```bash
firebase init
```

When prompted:

- **Select features**: Press Space to select:
  - ✓ Firestore
  - ✓ Hosting
- **Choose project**: Select your project
- **Firestore rules file**: Press Enter (use default)
- **Firestore indexes file**: Press Enter (use default)
- **Public directory**: Enter `build`
- **Configure as single-page app**: Type `y`
- **GitHub deployment**: Skip (type `n`)

### 9.4 Build the App

```bash
npm run build
```

### 9.5 Deploy

```bash
firebase deploy
```

### 9.6 Access Your App

Your app is now live at:

```
https://YOUR-PROJECT-ID.firebaseapp.com
```

Find your project ID in Firebase Console.

## 10: Deploy to Netlify (Alternative)

### 10.1 Build the App

```bash
npm run build
```

### 10.2 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nurse-voting-system.git
git push -u origin main
```

### 10.3 Connect to Netlify

- Go to https://netlify.com
- Click "New site from Git"
- Choose GitHub
- Select your repository
- Build command: `npm run build`
- Publish directory: `build`
- Click "Deploy"

### 10.4 Add Environment Variables

- In Netlify dashboard, go to Site settings > Build & deploy > Environment
- Add all variables from `.env.local`
- Redeploy

Your app is now live at: `https://YOUR-SITE.netlify.app`

## 11: Deploy to Vercel (Alternative)

### 11.1 Push to GitHub (same as Netlify Step 10.2)

### 11.2 Connect to Vercel

- Go to https://vercel.com
- Click "Add New..." > "Project"
- Choose your GitHub repo
- Click "Import"

### 11.3 Add Environment Variables

- In "Environment Variables" section, add all from `.env.local`
- Click "Deploy"

Your app is now live at: `https://YOUR-PROJECT.vercel.app`

## Troubleshooting

### Firebase Config Not Working

✓ Check `.env.local` file exists  
✓ Check all values are copied correctly  
✓ Restart dev server after creating `.env.local`  
✓ No quotes in .env.local values

### Can't Login to Admin

✓ Verify admin user exists in Firebase > Authentication > Users  
✓ Check email is exactly: `admin@hospital.com`  
✓ Check password is exactly: `admin123`  
✓ Check Authentication is enabled in Firebase

### Firestore Collection Not Found

✓ Manually add first nurse via admin panel  
✓ Or manually create collection in Firebase Console  
✓ Collection name must be exactly: `nurses`

### Deploy Fails

✓ Run `npm run build` first  
✓ Check `build/` folder exists  
✓ Check `.env.local` has all Firebase credentials  
✓ Verify Firebase project is active

### Real-time Updates Not Working

✓ Check Firestore rules are published  
✓ Check Firestore is enabled in Firebase  
✓ Check browser console for errors  
✓ Try refreshing the page

## Security Checklist

- [ ] Changed admin password from default
- [ ] Firestore rules are published
- [ ] Authentication is enabled
- [ ] `.env.local` is in `.gitignore`
- [ ] No credentials in GitHub
- [ ] Only needed permissions enabled
- [ ] Firebase project is in "Production" mode
- [ ] Web app is registered in Firebase

## Important Security Notes

🔒 **Never commit `.env.local` to Git!**  
🔒 **Change default admin password immediately!**  
🔒 **Use strong passwords for production!**  
🔒 **Enable 2FA on Firebase account!**  
🔒 **Review Firestore rules regularly!**

## Support

- Firebase Docs: https://firebase.google.com/docs
- Firestore: https://firebase.google.com/docs/firestore
- Authentication: https://firebase.google.com/docs/auth
- Hosting: https://firebase.google.com/docs/hosting
- Troubleshooting: https://firebase.google.com/support

---

**Setup Complete!** Your Nurse Voting System is ready to use. 🎉
