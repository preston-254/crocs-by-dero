# 🚀 Deployment Guide - Crocs by Dero

This guide will help you deploy your website so it's always online without running the terminal.

## 📦 Step 1: Build Your Website

First, create a production build of your website:

```bash
npm run build
```

This creates a `dist` folder with all the files needed to host your website.

---

## 🌐 Option 1: Netlify (Easiest - Recommended)

**Netlify is FREE and the easiest way to host your site.**

### Method A: Drag & Drop (No account needed initially)

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)**

3. **Drag and drop the `dist` folder** onto the Netlify homepage

4. **Your site is live!** You'll get a URL like `https://random-name-123.netlify.app`

5. **Optional:** Create a free account to:
   - Get a custom domain
   - Set up automatic deployments
   - Add password protection

### Method B: Connect to Git (Automatic deployments)

1. **Push your code to GitHub** (if not already done)
2. **Go to [netlify.com](https://netlify.com)** and sign up
3. **Click "Add new site" → "Import an existing project"**
4. **Connect your GitHub repository**
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Deploy!** Every time you push to GitHub, Netlify will automatically rebuild and deploy your site.

---

## ⚡ Option 2: Vercel (Also Very Easy)

**Vercel is FREE and great for React apps.**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **In your project folder, run:**
   ```bash
   vercel
   ```

3. **Follow the prompts** - it will detect your Vercel settings automatically

4. **Your site is live!** You'll get a URL like `https://your-site.vercel.app`

5. **For automatic deployments:** Connect your GitHub repository at [vercel.com](https://vercel.com)

---

## 📄 Option 3: GitHub Pages (Free)

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Build and deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be at `https://yourusername.github.io/repo-name`

---

## 🖥️ Option 4: Traditional Web Hosting

If you have web hosting (like cPanel, shared hosting, etc.):

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Upload the contents of the `dist` folder** to your hosting's `public_html` or `www` folder

3. **Your site will be live** at your domain

---

## 🔧 Important Notes

### For All Hosting Options:

1. **Admin Password:** Remember to change the admin password in `src/pages/Admin.jsx` before deploying
2. **WhatsApp Number:** Update WhatsApp numbers in:
   - `src/pages/Checkout.jsx`
   - `src/pages/ProductDetail.jsx`
   - `src/pages/Contact.jsx`

### Data Storage:

- Currently, products are stored in **localStorage** (browser storage)
- This means each visitor has their own cart, but admin changes are local to your browser
- **For production**, consider:
  - Using a backend API
  - Using a database (Firebase, Supabase, etc.)
  - Using Netlify/Vercel serverless functions

### Custom Domain:

- **Netlify/Vercel:** Both offer free custom domains
- Go to your site settings → Domain → Add custom domain
- Follow the DNS setup instructions

---

## 🎯 Recommended: Netlify

**Why Netlify is recommended:**
- ✅ Completely free
- ✅ Drag & drop deployment (no terminal needed)
- ✅ Automatic HTTPS
- ✅ Free custom domain
- ✅ Fast CDN
- ✅ Easy to use

**Quick Start:**
1. Run `npm run build`
2. Go to netlify.com
3. Drag the `dist` folder
4. Done! 🎉

---

## 📝 Need Help?

If you need help with deployment, check:
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/pages)

---

**Your website will be live 24/7 without needing to run the terminal!** 🚀

