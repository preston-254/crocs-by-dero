# 🔥 Firebase Setup Guide

Follow these steps to set up Firebase for your Crocs by Dero website.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **"crocs-by-dero"** (or any name you like)
4. Click **Continue**
5. **Disable Google Analytics** (optional, you can enable later)
6. Click **Create project**
7. Wait for project to be created, then click **Continue**

## Step 2: Create Firestore Database

1. In your Firebase project, click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add security rules later)
4. Choose a **location** (closest to your users)
5. Click **Enable**

## Step 3: Get Your Firebase Config

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. Register app with nickname: **"Crocs by Dero Web"**
6. **Copy the `firebaseConfig` object** (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 4: Add Config to Your Project

1. Create a file called `.env.local` in your project root
2. Add your Firebase config (see instructions in the file)

**OR** directly edit `src/firebase/config.js` and paste your config there.

## Step 5: Set Up Security Rules (Important!)

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - readable by everyone, writable by authenticated users
    match /products/{productId} {
      allow read: if true; // Anyone can read products
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

**For now, we'll use a simple setup. Later you can add proper authentication.**

## Step 6: Install Dependencies

Run in your terminal:
```bash
npm install firebase
```

## Step 7: Deploy Your Site

After setup, rebuild and redeploy:
```bash
npm run build
```

Then redeploy to Netlify/Vercel.

---

## ✅ That's It!

Your products will now sync across all devices and users in real-time!

---

## 🔒 Optional: Add Admin Authentication

If you want to secure the admin panel with Firebase Auth:

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. Update the admin login to use Firebase Auth instead of password

---

## 📝 Notes

- **Free Tier:** Firebase has a generous free tier (50K reads/day, 20K writes/day)
- **Real-time:** Changes appear instantly across all devices
- **Backup:** Your data is automatically backed up by Firebase
- **Scalable:** Grows with your business

---

## 🆘 Need Help?

If you encounter issues:
1. Check that your Firebase config is correct
2. Verify Firestore is enabled
3. Check browser console for errors
4. Make sure security rules allow reads

---

**Once set up, your products will sync automatically!** 🚀

