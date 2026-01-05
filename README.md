# 🐊 Crocs by Dero - E-Commerce Website

A modern, user-friendly, and visually appealing e-commerce website for selling Crocs. Built with React, Tailwind CSS, and Framer Motion for smooth animations.

## ✨ Features

### For Customers
- **Beautiful Homepage** with hero section and featured products
- **Product Browsing** with search and category filters
- **Product Detail Pages** with image gallery, zoom, and size/color selection
- **WhatsApp Integration** for easy ordering
- **Responsive Design** - works perfectly on all devices
- **Smooth Animations** and micro-interactions throughout

### For Admin (Dero)
- **Simple Admin Dashboard** - no technical skills required
- **Easy Product Management** - add, edit, delete products
- **One-Click Status Toggle** - switch between Available/Sold Out instantly
- **Price Updates** - change prices with a few clicks
- **Product Visibility Control** - hide/show products without deleting
- **Featured Products** - mark products as featured for homepage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deploying Your Website

Want to host your website so it's always online? Check out **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step instructions!

**Quick Deploy Options:**
- **Netlify** (Easiest) - Just drag and drop the `dist` folder
- **Vercel** - Free hosting with automatic deployments
- **GitHub Pages** - Free hosting through GitHub
- **Traditional Hosting** - Upload to any web host

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📁 Project Structure

```
crocs-by-dero/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer, ProductCard)
│   ├── pages/            # Page components (Home, ProductDetail, About, Contact, Admin)
│   ├── context/          # React Context for product management
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `crocs-green`: Primary green color
- `crocs-yellow`: Accent yellow color
- `crocs-light`: Light background color
- `crocs-dark`: Dark green color

### WhatsApp Integration
Update the WhatsApp number in:
- `src/pages/ProductDetail.jsx` (line with `wa.me/1234567890`)
- `src/pages/Contact.jsx` (line with `wa.me/1234567890`)

### Contact Information
Update contact details in:
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`

## 📱 Admin Dashboard

Access the admin dashboard at `/admin` to:
- Add new products
- Edit existing products
- Toggle product availability (Available/Sold Out)
- Show/hide products
- Update prices instantly
- Mark products as featured

**Note:** All product data is stored in browser localStorage. For production, consider connecting to a backend database.

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons

## 📝 License

This project is created for Crocs by Dero.

## 🤝 Support

For questions or support, contact:
- Email: info@crocsbydero.com
- Phone: +1 (234) 567-890
- WhatsApp: Available on the contact page

---

Made with ❤️ for Crocs by Dero

