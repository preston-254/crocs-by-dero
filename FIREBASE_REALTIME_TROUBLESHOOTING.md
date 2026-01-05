# 🔄 Real-Time Sync Troubleshooting Guide

If changes aren't syncing automatically across devices, follow these steps:

## ✅ Step 1: Check Firebase Security Rules

**This is the most common issue!**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **crocs-by-dero**
3. Click **Firestore Database** → **Rules** tab
4. Make sure your rules look like this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;  // ✅ Anyone can read products
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

5. Click **"Publish"** to save the rules

**⚠️ Important:** If `allow read: if true;` is missing, the real-time listener won't work!

---

## ✅ Step 2: Verify Firebase Connection

1. Open your website on any device
2. Open **Browser Console** (F12 or Right-click → Inspect → Console)
3. Look for these messages:
   - ✅ `Firebase initialized successfully`
   - ✅ `Real-time listener active and listening for changes`
   - ✅ `Real-time update received: X products`

If you see **❌ Error** messages, note them down.

---

## ✅ Step 3: Test Real-Time Sync

1. **Open your website on TWO different devices/browsers:**
   - Device 1: Your computer
   - Device 2: Your phone or another browser

2. **On Device 1 (Admin Panel):**
   - Go to `/admin`
   - Add or edit a product
   - Check the console for: `✅ Product updated successfully in Firebase!`

3. **On Device 2:**
   - Keep the homepage open
   - Watch the console for: `✅ Real-time update received: X products`
   - The product should appear/update automatically (no refresh needed!)

---

## ✅ Step 4: Check Browser Console for Errors

Common errors and fixes:

### Error: `permission-denied`
**Fix:** Update Firebase security rules (Step 1 above)

### Error: `Firebase not configured`
**Fix:** Check `src/firebase/config.js` has your Firebase config

### Error: `Failed to resolve import "firebase/app"`
**Fix:** Run `npm install firebase` in your project

### Error: `Network request failed`
**Fix:** Check your internet connection

---

## ✅ Step 5: Verify Real-Time Listener is Active

In the browser console, you should see:
```
🔄 Setting up real-time listener for products...
✅ Real-time listener active and listening for changes
```

If you don't see these messages, the listener isn't starting.

---

## ✅ Step 6: Check Network Tab

1. Open **Browser DevTools** → **Network** tab
2. Filter by **"firestore"**
3. You should see WebSocket connections to Firebase
4. If you see failed requests, check your Firebase config

---

## 🔧 Quick Fixes

### Fix 1: Refresh the Page
Sometimes a simple refresh fixes connection issues.

### Fix 2: Clear Browser Cache
1. Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Clear cached images and files
3. Refresh the page

### Fix 3: Check Firebase Quota
1. Go to Firebase Console → Usage and Billing
2. Make sure you haven't exceeded free tier limits
3. Free tier: 50K reads/day, 20K writes/day

### Fix 4: Redeploy Your Site
If you recently updated Firebase config:
1. Run `npm run build`
2. Redeploy to Netlify/Vercel
3. Clear cache and refresh

---

## 📱 Testing Checklist

- [ ] Firebase security rules allow `read: if true`
- [ ] Console shows "Firebase initialized successfully"
- [ ] Console shows "Real-time listener active"
- [ ] No permission-denied errors
- [ ] Two devices can see each other's changes
- [ ] Changes appear without refreshing

---

## 🆘 Still Not Working?

1. **Check the console** on both devices for error messages
2. **Verify Firebase config** in `src/firebase/config.js`
3. **Test with a simple change:** Add a product and watch console logs
4. **Check Firebase Console:** Go to Firestore → Data tab, see if products are being saved

---

## 📞 Need More Help?

Share these details:
- Browser console error messages (screenshot)
- Firebase security rules (screenshot)
- Whether you see "Real-time listener active" in console
- Whether products appear in Firebase Console → Firestore → Data

---

**Remember:** Real-time sync works automatically once Firebase is properly configured. No deployment needed for product changes! 🚀

