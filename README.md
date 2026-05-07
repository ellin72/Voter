# 🏥 Best Nurse Voting System

A modern, professional web application for healthcare facilities to conduct nurse recognition voting with real-time updates, secure admin dashboard, and responsive design.

## ✨ Features

### 👥 Voting System

- **Browse Nurses**: View all nurses with photos, names, and departments
- **Vote**: One-click voting with confirmation dialog
- **One Vote Per Device**: Prevent duplicate voting using localStorage
- **Real-time Updates**: See votes update instantly
- **Search**: Find nurses quickly by name

### 📊 Results Dashboard

- **Live Rankings**: Nurses ranked by vote count
- **Vote Percentages**: See percentage of total votes each nurse received
- **Leading Nurse**: Highlighted with gold styling
- **Vote Statistics**: Total votes, total nurses, leading nurse

### 🔐 Admin Dashboard

- **Secure Login**: Firebase authentication
- **Manage Nurses**: Add, edit, delete nurses
- **View Statistics**: Dashboard with key metrics
- **Reset Votes**: Clear all votes with confirmation
- **Live Vote Updates**: See votes update in real-time

### 🎨 User Experience

- **Dark Mode Toggle**: Switch between light and dark themes
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops
- **Smooth Animations**: Professional animations and transitions
- **Healthcare Theme**: Blue and white medical-themed design
- **Fast Loading**: Optimized for speed

## 🚀 Quick Start

### Prerequisites

- Node.js 14+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**

```bash
cd nurse-voting-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Firebase** (see SETUP_GUIDE.md for detailed instructions)
   - Create Firebase project
   - Create `.env.local` file with Firebase credentials
   - Initialize Firestore and Authentication

4. **Start development server**

```bash
npm start
```

5. **Open in browser**

```
http://localhost:3000
```

## 🔑 Default Admin Credentials

- **Email**: `admin@hospital.com`
- **Password**: `admin123`

**⚠️ Change these immediately after first login!**

## 📱 Pages

### 1. **Home Page** (`/`)

- Vote for nurses
- Search nurses by name
- See current vote counts
- Voting confirmation and thank you message

### 2. **Results Page** (`/results`)

- View all nurses ranked by votes
- See vote counts and percentages
- Leading nurse highlighted
- Real-time updates

### 3. **Admin Login** (`/admin-login`)

- Secure Firebase authentication
- Email and password login

### 4. **Admin Dashboard** (`/admin`)

- View all statistics
- Add new nurses
- Edit existing nurses
- Delete nurses with confirmation
- Reset all votes with confirmation
- Live vote count updates

## 🏗️ Project Structure

```
src/
├── components/
│   └── ProtectedRoute.js      # Route protection for admin
├── context/
│   ├── AuthContext.js          # Firebase authentication
│   └── VotingContext.js        # Voting logic and state
├── pages/
│   ├── HomePage.js             # Main voting page
│   ├── ResultsPage.js          # Results and rankings
│   ├── AdminLoginPage.js       # Admin login
│   └── AdminDashboard.js       # Admin control panel
├── App.js                      # Main app with routing
├── index.js                    # React entry point
└── index.css                   # Tailwind and custom styles
```

## 🔐 Security

- ✅ Firebase Authentication for admin panel
- ✅ Firestore Security Rules for data protection
- ✅ One vote per browser using localStorage
- ✅ Protected admin routes
- ✅ HTTPS required for all deployments

## 🚀 Deployment

### Firebase Hosting (Recommended)

```bash
npm run build
firebase deploy
```

### Netlify

1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Deploy!

### Vercel

1. Push code to GitHub
2. Import project on Vercel
3. Deploy!

See `SETUP_GUIDE.md` for detailed deployment instructions.

## 📊 Database Schema

### Firestore Collection: `nurses`

```javascript
{
  id: "unique-id",
  name: "NURSE NAME",
  department: "Department/Unit",
  votes: 0,
  createdAt: timestamp
}
```

## 🎯 Roadmap

- [ ] Export results to PDF
- [ ] Email notifications for admins
- [ ] Voting analytics and reports
- [ ] Multiple voting periods/rounds
- [ ] Social sharing of results
- [ ] Integration with HR systems

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Firebase** - Backend and authentication
- **React Router** - Navigation
- **Lucide React** - Icons
- **Chart.js** - (Optional) for advanced analytics

## 📝 Environment Variables

Create `.env.local` file with Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx
```

## 🐛 Troubleshooting

| Problem                 | Solution                               |
| ----------------------- | -------------------------------------- |
| Firebase not configured | Check `.env.local` has all credentials |
| Can't login to admin    | Verify admin user exists in Firebase   |
| No nurses showing       | Add nurses via admin dashboard         |
| Votes not saving        | Check Firestore is initialized         |
| Deploy fails            | Run `npm run build` and check errors   |

## 📞 Support

- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎉 Credits

Built with ❤️ for healthcare professionals

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Status**: ✅ Production Ready
