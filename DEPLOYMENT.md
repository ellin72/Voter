# 🚀 Deployment Guide

Quick deployment options for the Nurse Voting System.

## Option 1: Firebase Hosting (Recommended)

### Fastest Method

```bash
# Build the app
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

**Live at**: `https://YOUR-PROJECT-ID.firebaseapp.com`

See `FIREBASE_SETUP.md` for detailed instructions.

---

## Option 2: Netlify

### Method A: Git Integration (Recommended)

1. **Push code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nurse-voting-system.git
git push -u origin main
```

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Choose GitHub
   - Select repository
3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Add Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add all variables from `.env.example`:
     - REACT_APP_FIREBASE_API_KEY
     - REACT_APP_FIREBASE_AUTH_DOMAIN
     - REACT_APP_FIREBASE_PROJECT_ID
     - REACT_APP_FIREBASE_STORAGE_BUCKET
     - REACT_APP_FIREBASE_MESSAGING_SENDER_ID
     - REACT_APP_FIREBASE_APP_ID

5. **Deploy**
   - Netlify will auto-deploy on push
   - Live at: `https://YOUR-SITE.netlify.app`

### Method B: CLI Deployment

```bash
npm install -g netlify-cli

netlify deploy --prod --dir=build
```

---

## Option 3: Vercel

### Method A: Git Integration (Recommended)

1. **Push code to GitHub** (same as Netlify)

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Choose your GitHub repo
   - Click "Import"

3. **Configure Project**
   - Framework: React
   - Build command: `npm run build`
   - Output directory: `build`

4. **Add Environment Variables**
   - In "Environment Variables" section, add all Firebase credentials

5. **Deploy**
   - Vercel will auto-deploy
   - Live at: `https://YOUR-PROJECT.vercel.app`

### Method B: CLI Deployment

```bash
npm install -g vercel

vercel --prod
```

---

## Option 4: GitHub Pages

### Requirements

- Public GitHub repository

### Steps

1. **Update package.json**

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/nurse-voting-system"
}
```

2. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

3. **Add Deploy Scripts**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. **Deploy**

```bash
npm run deploy
```

5. **Enable GitHub Pages**
   - Go to repo Settings > Pages
   - Choose `gh-pages` branch
   - Live at: `https://YOUR_USERNAME.github.io/nurse-voting-system`

---

## Option 5: Docker + Any Cloud

### Build Docker Image

1. **Create Dockerfile**

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf**

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Build and Run**

```bash
docker build -t nurse-voting-system .
docker run -p 80:80 nurse-voting-system
```

---

## Deployment Comparison

| Platform     | Ease       | Speed      | Cost | Scaling |
| ------------ | ---------- | ---------- | ---- | ------- |
| Firebase     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | Auto    |
| Netlify      | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐   | Free | Auto    |
| Vercel       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free | Auto    |
| GitHub Pages | ⭐⭐⭐⭐   | ⭐⭐⭐     | Free | Limited |
| AWS          | ⭐⭐⭐     | ⭐⭐⭐     | $$   | Full    |
| GCP          | ⭐⭐⭐     | ⭐⭐⭐     | $$   | Full    |

---

## Pre-Deployment Checklist

- [ ] `.env.local` created with Firebase credentials
- [ ] `.env.local` added to `.gitignore`
- [ ] `npm run build` completes without errors
- [ ] No secrets in code
- [ ] Firestore collection "nurses" has test data
- [ ] Admin user created in Firebase
- [ ] Firestore rules published
- [ ] Authentication enabled in Firebase
- [ ] All environment variables configured

---

## Post-Deployment Verification

1. **Test Voting**
   - Vote for a nurse
   - Verify vote count increases
   - Check vote persists on refresh

2. **Test Admin**
   - Login with admin credentials
   - Add/edit/delete nurses
   - Reset votes

3. **Test Results**
   - Check results page updates
   - Verify percentages calculate correctly
   - Check leading nurse highlighted

4. **Mobile Test**
   - Test on phone/tablet
   - Check responsive layout
   - Test voting on mobile

---

## Custom Domain Setup

### Netlify

1. Go to Site settings > Domain management
2. Click "Add domain"
3. Enter your domain
4. Update DNS records at your registrar

### Vercel

1. Go to Settings > Domains
2. Enter domain
3. Update DNS records at your registrar

### Firebase Hosting

1. Go to Hosting > Custom domains
2. Add domain
3. Complete domain verification
4. Update DNS records

---

## SSL/HTTPS

All deployment platforms provide free SSL:

- ✅ Firebase Hosting - Automatic
- ✅ Netlify - Automatic
- ✅ Vercel - Automatic
- ✅ GitHub Pages - Automatic

---

## Performance Tips

1. **Enable Caching**
   - Netlify: Automatic
   - Vercel: Automatic
   - Firebase: 24-hour default

2. **Optimize Images**
   - Use emoji avatars (already done)
   - Minify CSS (Tailwind PurgeCSS)

3. **Monitor Performance**
   - Netlify Analytics
   - Vercel Analytics
   - Firebase Performance Monitoring

---

## Troubleshooting

### "Build failed"

```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Cannot find Firebase credentials"

- Check environment variables are set correctly
- Verify variable names match exactly
- Restart deployment

### "404 on page refresh"

- Configure SPA routing (already done in firebase.json)
- Netlify/Vercel auto-detect React apps

### "Firestore not connecting"

- Verify Firebase rules allow access
- Check project ID matches
- Check internet connection

---

## Support

- Firebase Docs: https://firebase.google.com/docs
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com

---

**Choose your platform and deploy! 🚀**
