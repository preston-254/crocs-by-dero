import { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

// Helper to format prices in KSH
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(price)
}

const defaultProducts = [
  {
    id: 1,
    name: 'Classic Slip-On Clog - Black',
    price: 4500,
    originalPrice: 5500,
    category: 'Men',
    type: 'crocs',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Black', available: true },
      { name: 'Navy', available: true },
      { name: 'Gray', available: false },
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'The iconic Classic Slip-On Clog. Comfortable, lightweight, and perfect for everyday wear. Features ventilation holes and adjustable heel strap.',
    featured: true,
  },
  {
    id: 2,
    name: 'Classic Slip-On Clog - Green',
    price: 4500,
    originalPrice: 5500,
    category: 'Men',
    type: 'crocs',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Green', available: true },
      { name: 'Black', available: true },
      { name: 'Navy', available: true },
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Vibrant green Classic Slip-On Clog. Stand out with style and comfort. Perfect for casual wear.',
    featured: true,
  },
  {
    id: 3,
    name: 'Classic Slip-On Clog - White',
    price: 4500,
    originalPrice: 5500,
    category: 'Women',
    type: 'crocs',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: [
      { name: 'White', available: true },
      { name: 'Pink', available: true },
      { name: 'Yellow', available: false },
    ],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Clean and classic white slip-on clog. Versatile and easy to style with any outfit.',
    featured: true,
  },
  {
    id: 4,
    name: 'Kids Classic Slip-On - Rainbow',
    price: 3500,
    originalPrice: 4000,
    category: 'Kids',
    type: 'crocs',
    sizes: ['1', '2', '3', '4', '5', '6'],
    colors: [
      { name: 'Rainbow', available: true },
      { name: 'Blue', available: true },
      { name: 'Pink', available: true },
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Fun and colorful slip-on Crocs for kids. Durable, easy to clean, and perfect for active play.',
    featured: true,
  },
  {
    id: 5,
    name: 'Classic Slip-On Clog - Pink',
    price: 4500,
    originalPrice: 5500,
    category: 'Women',
    type: 'crocs',
    sizes: ['5', '6', '7', '8', '9'],
    colors: [
      { name: 'Pink', available: true },
      { name: 'Rose', available: true },
      { name: 'Lavender', available: false },
    ],
    image: 'https://images.unsplash.com/photo-1605812860427-401443163141?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605812860427-401443163141?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Sweet and stylish pink slip-on clog. Add a pop of color to your wardrobe.',
    featured: false,
  },
  {
    id: 6,
    name: 'Classic Slip-On Clog - Navy',
    price: 4500,
    originalPrice: 5500,
    category: 'Men',
    type: 'crocs',
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Navy', available: true },
      { name: 'Black', available: true },
      { name: 'Gray', available: true },
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Sophisticated navy slip-on clog. Perfect for both casual and semi-formal occasions.',
    featured: false,
  },
  // Charms/Accessories
  {
    id: 101,
    name: 'Jibbitz Charm Pack - Sports',
    price: 800,
    originalPrice: 1000,
    category: 'Accessories',
    type: 'charm',
    sizes: [],
    colors: [],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Set of 4 sports-themed Jibbitz charms. Perfect for personalizing your Crocs!',
    featured: true,
  },
  {
    id: 102,
    name: 'Jibbitz Charm Pack - Animals',
    price: 800,
    originalPrice: 1000,
    category: 'Accessories',
    type: 'charm',
    sizes: [],
    colors: [],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Adorable animal-themed Jibbitz charms. Includes 4 different animal designs.',
    featured: true,
  },
  {
    id: 103,
    name: 'Jibbitz Charm Pack - Emojis',
    price: 800,
    originalPrice: 1000,
    category: 'Accessories',
    type: 'charm',
    sizes: [],
    colors: [],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Fun emoji-themed Jibbitz charms. Express yourself with these colorful designs!',
    featured: false,
  },
  {
    id: 104,
    name: 'Jibbitz Single Charm - Custom',
    price: 250,
    originalPrice: 300,
    category: 'Accessories',
    type: 'charm',
    sizes: [],
    colors: [],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop',
    ],
    status: 'available',
    visible: true,
    description: 'Single Jibbitz charm. Choose from various designs to personalize your Crocs.',
    featured: false,
  },
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load products from localStorage or use defaults
    const savedProducts = localStorage.getItem('crocs-products')
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts)
        // Migrate old format to new format if needed
        const migrated = parsed.map(p => {
          if (p.colors && Array.isArray(p.colors) && p.colors.length > 0 && typeof p.colors[0] === 'string') {
            // Old format: colors is array of strings
            return {
              ...p,
              colors: p.colors.map(c => ({ name: c, available: true })),
              type: p.type || 'crocs',
            }
          }
          return { ...p, type: p.type || 'crocs' }
        })
        setProducts(migrated)
      } catch (e) {
        setProducts(defaultProducts)
        localStorage.setItem('crocs-products', JSON.stringify(defaultProducts))
      }
    } else {
      setProducts(defaultProducts)
      localStorage.setItem('crocs-products', JSON.stringify(defaultProducts))
    }
    setLoading(false)
  }, [])

  const updateProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('crocs-products', JSON.stringify(newProducts))
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      images: product.images || [product.image],
      type: product.type || 'crocs',
      // Ensure colors are in the right format
      colors: product.colors?.map(c => typeof c === 'string' ? { name: c, available: true } : c) || [],
    }
    const updated = [...products, newProduct]
    updateProducts(updated)
    return newProduct
  }

  const updateProduct = (id, updates) => {
    const updated = products.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates }
        // Ensure colors are in the right format
        if (updates.colors) {
          merged.colors = updates.colors.map(c => 
            typeof c === 'string' ? { name: c, available: true } : c
          )
        }
        return merged
      }
      return p
    })
    updateProducts(updated)
  }

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id)
    updateProducts(updated)
  }

  const getProduct = (id) => {
    return products.find(p => p.id === parseInt(id))
  }

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured && p.visible)
  }

  const getProductsByCategory = (category) => {
    if (!category || category === 'All') return products.filter(p => p.visible)
    if (category === 'Accessories') return products.filter(p => p.type === 'charm' && p.visible)
    return products.filter(p => p.category === category && p.visible && p.type === 'crocs')
  }

  const getCharms = () => {
    return products.filter(p => p.type === 'charm' && p.visible)
  }

  const searchProducts = (query) => {
    if (!query) return products.filter(p => p.visible)
    const lowerQuery = query.toLowerCase()
    return products.filter(p => 
      p.visible && (
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      )
    )
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      getFeaturedProducts,
      getProductsByCategory,
      getCharms,
      searchProducts,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider')
  }
  return context
}
