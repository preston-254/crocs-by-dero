# 🔧 Fixing Vercel Deployment Issues

If you're getting build errors on Vercel, follow these steps:

## ✅ Solution 1: Update Vercel Project Settings

1. Go to your Vercel project dashboard
2. Click **Settings** → **General**
3. Under **Build & Development Settings**, set:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## ✅ Solution 2: Use the Updated Configuration

The `vercel.json` file has been updated with the correct settings. Make sure it's in your repository.

## ✅ Solution 3: Clear Build Cache

1. Go to your Vercel project
2. Click **Settings** → **General**
3. Scroll down and click **Clear Build Cache**
4. Redeploy your project

## ✅ Solution 4: Check Node Version

Make sure Vercel is using Node.js 18 or higher:

1. Go to **Settings** → **General**
2. Under **Node.js Version**, select **18.x** or **20.x**

## ✅ Solution 5: Manual Build Test

Test the build locally first:

```bash
npm install
npm run build
```

If this works locally, the issue is with Vercel's build environment.

## 🚀 Alternative: Use Netlify Instead

If Vercel continues to have issues, **Netlify is often easier**:

1. Build your site: `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder
4. Done! ✅

Netlify usually works without any configuration.

---

## 📝 Common Issues

### Issue: "Cannot resolve /src/main.jsx"
**Solution:** This is usually a Vercel configuration issue. Make sure:
- Framework is set to "Vite"
- Build command is `npm run build`
- Output directory is `dist`

### Issue: Build fails with module errors
**Solution:** 
1. Clear Vercel build cache
2. Make sure all dependencies are in `package.json`
3. Try deleting `node_modules` and `.vercel` folder locally, then redeploy

---

**If problems persist, try Netlify - it's often more reliable for Vite projects!**

