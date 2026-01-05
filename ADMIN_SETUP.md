# 🔐 Admin Authentication Setup

Your admin panel now uses Firebase Authentication, so you can log in from **any device**!

## ✅ What You Get

- ✅ **Login from anywhere** - Use your email and password on any device
- ✅ **Secure authentication** - Firebase handles security
- ✅ **Persistent sessions** - Stay logged in across devices
- ✅ **Real-time access** - Manage products from phone, tablet, or computer

---

## 🚀 Setup Steps

### Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **crocs-by-dero**
3. Click **"Authentication"** in the left menu
4. Click **"Get started"**
5. Click on **"Email/Password"**
6. **Enable** "Email/Password" (toggle it on)
7. Click **"Save"**

### Step 2: Create Your Admin Account

You have two options:

#### Option A: Create Admin via Code (One-time setup)

1. Open browser console on your website (F12)
2. Run this code (replace with your email and password):

```javascript
import { createAdminUser } from './src/firebase/authService'

// Replace with your email and password
createAdminUser('your-email@example.com', 'your-secure-password')
  .then(() => console.log('Admin created!'))
  .catch(error => console.error('Error:', error))
```

#### Option B: Create Admin Manually (Easier)

1. Go to Firebase Console → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter your email and password
4. Click **"Add user"**
5. Copy the **User UID** (the long string)
6. Go to **Firestore Database** → **Data**
7. Create a new collection called **"admins"**
8. Add a document with:
   - **Document ID:** (paste the User UID)
   - **Fields:**
     - `email`: (your email)
     - `isAdmin`: `true`
     - `createdAt`: (current timestamp)

### Step 3: Update Firestore Security Rules

1. Go to **Firestore Database** → **Rules**
2. Update the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - anyone can read, only admins can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Admins collection - only admins can read
    match /admins/{adminId} {
      allow read: if request.auth != null && 
                     exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      allow write: if false; // Only create via code/console
    }
  }
}
```

3. Click **"Publish"**

---

## 🔑 How to Use

1. **Go to Admin Panel:** `/admin`
2. **Enter your email and password**
3. **Click "Login"**
4. **You're in!** You can now manage products from any device

---

## 📱 Login from Any Device

Once set up, you can:
- ✅ Log in from your phone
- ✅ Log in from your tablet
- ✅ Log in from your computer
- ✅ Log in from any browser
- ✅ All changes sync in real-time!

---

## 🔒 Security Notes

- Your password is securely stored by Firebase
- Sessions persist across devices
- Only users in the `admins` collection can access admin panel
- Products are readable by everyone, but only admins can edit

---

## 🆘 Troubleshooting

**"Access denied. You are not an admin."**
- Make sure you added your user to the `admins` collection in Firestore
- Check that the User UID matches the document ID

**Can't log in:**
- Verify Email/Password is enabled in Firebase Authentication
- Check that your email and password are correct
- Make sure Firestore rules allow admin access

**Session not persisting:**
- This is normal - Firebase Auth sessions persist automatically
- If you log out, you'll need to log in again

---

## ✅ That's It!

Once set up, you can manage your products from **anywhere in the world** on **any device**! 🚀

