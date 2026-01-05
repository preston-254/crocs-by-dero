import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useProducts, formatPrice } from '../context/ProductContext'
import { Trash2, Plus, Minus, MessageCircle, ArrowLeft } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const { getCharms } = useProducts()
  const [suggestedCharms, setSuggestedCharms] = useState([])

  const charms = getCharms()
  const total = getCartTotal()

  // Suggest charms if cart has crocs
  useEffect(() => {
    if (cart.some(item => item.product.type === 'crocs') && charms.length > 0) {
      setSuggestedCharms(charms.slice(0, 3))
    }
  }, [cart, charms])

  const handleWhatsAppCheckout = () => {
    let message = 'Hi! I would like to order:\n\n'
    
    cart.forEach(item => {
      message += `• ${item.product.name}`
      if (item.size) message += ` - Size: ${item.size}`
      if (item.color) message += `, Color: ${item.color}`
      message += ` x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })

    if (suggestedCharms.length > 0) {
      message += '\nSuggested Charms:\n'
      suggestedCharms.forEach(charm => {
        message += `• ${charm.name} - ${formatPrice(charm.price)}\n`
      })
    }

    message += `\nTotal: ${formatPrice(total)}`

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-crocs-green text-white rounded-lg font-semibold hover:bg-crocs-dark transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-crocs-green transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Cart ({cart.length} items)</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                      <p className="text-lg font-bold text-crocs-green mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-lg hover:bg-gray-100"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-lg hover:bg-gray-100"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggested Charms */}
            {suggestedCharms.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Suggested Charms</h2>
                <p className="text-gray-600 mb-4">Personalize your Crocs with these charms!</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedCharms.map((charm) => (
                    <div key={charm.id} className="border border-gray-200 rounded-lg p-4">
                      <img
                        src={charm.image}
                        alt={charm.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-semibold text-sm mb-1">{charm.name}</h3>
                      <p className="text-crocs-green font-bold">{formatPrice(charm.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-crocs-green">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-crocs-green">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleWhatsAppCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2 mb-4"
              >
                <MessageCircle size={24} />
                <span>Checkout via WhatsApp</span>
              </motion.button>

              <button
                onClick={clearCart}
                className="w-full py-2 text-gray-600 hover:text-red-500 transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

