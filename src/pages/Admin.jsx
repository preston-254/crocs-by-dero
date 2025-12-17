import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProducts, formatPrice } from '../context/ProductContext'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Upload, Lock } from 'lucide-react'

const ADMIN_PASSWORD = 'dero2024' // Change this to your desired password

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Men',
    type: 'crocs',
    sizes: '',
    colors: [],
    image: '',
    description: '',
    status: 'available',
    visible: true,
    featured: false,
  })

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin-authenticated', 'true')
      setPassword('')
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin-authenticated')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    // Convert colors to the format needed for editing
    const colors = product.colors?.map(c => {
      if (typeof c === 'string') {
        return { name: c, available: true }
      }
      return c
    }) || []
    
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      type: product.type || 'crocs',
      sizes: product.sizes?.join(', ') || '',
      colors: colors,
      image: product.image,
      description: product.description || '',
      status: product.status,
      visible: product.visible,
      featured: product.featured || false,
    })
    // Don't set showAddForm - the modal will show based on editingId
  }

  const handleColorChange = (index, field, value) => {
    const newColors = [...formData.colors]
    if (field === 'name') {
      newColors[index] = { ...newColors[index], name: value }
    } else if (field === 'available') {
      newColors[index] = { ...newColors[index], available: value }
    }
    setFormData({ ...formData, colors: newColors })
  }

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { name: '', available: true }]
    })
  }

  const removeColor = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index)
    setFormData({ ...formData, colors: newColors })
  }

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in required fields (name and price)')
      return
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      category: formData.category,
      type: formData.type,
      sizes: formData.type === 'crocs' ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
      colors: formData.colors.filter(c => c.name.trim()),
      image: formData.image,
      images: [formData.image],
      description: formData.description,
      status: formData.status,
      visible: formData.visible,
      featured: formData.featured,
    }

    if (editingId) {
      updateProduct(editingId, productData)
      setEditingId(null)
    } else {
      addProduct(productData)
      setShowAddForm(false)
    }
    resetForm()
  }

  const handleCancel = () => {
    if (editingId) {
      setEditingId(null)
    } else {
      setShowAddForm(false)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: 'Men',
      type: 'crocs',
      sizes: '',
      colors: [],
      image: '',
      description: '',
      status: 'available',
      visible: true,
      featured: false,
    })
  }

  const toggleStatus = (id, currentStatus) => {
    updateProduct(id, { status: currentStatus === 'available' ? 'sold-out' : 'available' })
  }

  const toggleVisibility = (id, currentVisible) => {
    updateProduct(id, { visible: !currentVisible })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
    }
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-crocs-green mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter password to access admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                autoFocus
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-crocs-green text-white rounded-lg font-semibold hover:bg-crocs-dark transition-all"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="page-transition min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your products easily</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => {
                  setShowAddForm(true)
                  setEditingId(null)
                  resetForm()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-crocs-green text-white rounded-lg font-semibold flex items-center space-x-2 hover:bg-crocs-dark transition-all"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </motion.button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Add Form (only shown when adding, not editing) */}
        <AnimatePresence>
          {showAddForm && !editingId && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Product
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                    placeholder="Classic Slip-On Clog - Black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                    placeholder="4500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Original Price (KES) <span className="text-gray-400">(optional, for discounts)</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                    placeholder="5500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                  >
                    <option value="crocs">Crocs</option>
                    <option value="charm">Charm/Accessory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                {formData.type === 'crocs' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sizes (comma-separated) *
                    </label>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                      placeholder="7, 8, 9, 10, 11"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Colors with Availability
                  </label>
                  <div className="space-y-2">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={color.name}
                          onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                          placeholder="Color name"
                          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                        />
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={color.available}
                            onChange={(e) => handleColorChange(index, 'available', e.target.checked)}
                            className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                          />
                          <span className="text-sm text-gray-700">Available</span>
                        </label>
                        <button
                          onClick={() => removeColor(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addColor}
                      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-crocs-green hover:text-crocs-green transition-all"
                    >
                      + Add Color
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    )}
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Or enter image URL"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none mt-2"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none resize-none"
                    placeholder="Product description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="sold-out">Sold Out</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                    />
                    <span className="text-sm font-semibold text-gray-700">Visible on website</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                    />
                    <span className="text-sm font-semibold text-gray-700">Featured</span>
                  </label>
                </div>

                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-crocs-green text-white rounded-lg font-semibold hover:bg-crocs-dark transition-all flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Save Product</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Modal (shown when editing) */}
        <AnimatePresence>
          {editingId && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCancel}
                className="fixed inset-0 bg-black/50 z-40"
              />
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Edit Product
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                          placeholder="Classic Slip-On Clog - Black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Price (KES) *
                        </label>
                        <input
                          type="number"
                          step="1"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                          placeholder="4500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Original Price (KES) <span className="text-gray-400">(optional, for discounts)</span>
                        </label>
                        <input
                          type="number"
                          step="1"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                          placeholder="5500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Product Type *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                        >
                          <option value="crocs">Crocs</option>
                          <option value="charm">Charm/Accessory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                        >
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Kids">Kids</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>

                      {formData.type === 'crocs' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Sizes (comma-separated) *
                          </label>
                          <input
                            type="text"
                            value={formData.sizes}
                            onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                            placeholder="7, 8, 9, 10, 11"
                          />
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Colors with Availability
                        </label>
                        <div className="space-y-2">
                          {formData.colors.map((color, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={color.name}
                                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                placeholder="Color name"
                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                              />
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={color.available}
                                  onChange={(e) => handleColorChange(index, 'available', e.target.checked)}
                                  className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                                />
                                <span className="text-sm text-gray-700">Available</span>
                              </label>
                              <button
                                onClick={() => removeColor(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addColor}
                            className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-crocs-green hover:text-crocs-green transition-all"
                          >
                            + Add Color
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Product Image *
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                          />
                          {formData.image && (
                            <div className="mt-2">
                              <img
                                src={formData.image}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                              />
                            </div>
                          )}
                          <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="Or enter image URL"
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none mt-2"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none resize-none"
                          placeholder="Product description..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-crocs-green focus:outline-none"
                        >
                          <option value="available">Available</option>
                          <option value="sold-out">Sold Out</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.visible}
                            onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                            className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                          />
                          <span className="text-sm font-semibold text-gray-700">Visible on website</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-5 h-5 text-crocs-green rounded focus:ring-crocs-green"
                          />
                          <span className="text-sm font-semibold text-gray-700">Featured</span>
                        </label>
                      </div>

                      <div className="md:col-span-2 flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleCancel}
                          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                        <motion.button
                          onClick={handleSave}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-crocs-green text-white rounded-lg font-semibold hover:bg-crocs-dark transition-all flex items-center space-x-2"
                        >
                          <Save size={20} />
                          <span>Save Product</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Products ({products.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Image</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-crocs-green">{formatPrice(product.price)}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-crocs-light text-crocs-green rounded-full text-sm capitalize">
                        {product.type || 'crocs'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleStatus(product.id, product.status)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                            product.status === 'available'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {product.status === 'available' ? 'Available' : 'Sold Out'}
                        </button>
                        <button
                          onClick={() => toggleVisibility(product.id, product.visible)}
                          className="flex items-center space-x-1 text-xs text-gray-600 hover:text-crocs-green"
                        >
                          {product.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                          <span>{product.visible ? 'Hide' : 'Show'}</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-crocs-green hover:bg-crocs-light rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
