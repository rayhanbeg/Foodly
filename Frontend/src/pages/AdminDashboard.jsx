import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export default function AdminDashboard() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="container-fluid py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 h-fit sticky top-24">
            <nav className="space-y-2">
              <Link
                to="/admin/orders"
                className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPath.includes('/orders')
                    ? 'bg-primary text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Orders
              </Link>
              <Link
                to="/admin/foods"
                className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPath.includes('/foods')
                    ? 'bg-primary text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Foods
              </Link>
              <Link
                to="/admin/users"
                className={`block px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPath.includes('/users')
                    ? 'bg-primary text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                Users
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route index element={<AdminOrders />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="foods" element={<AdminFoods />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders')
        setOrders(response.data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, { status })
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o))
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div className="card p-6">
      <h2 className="font-bold text-2xl mb-6">Orders Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left py-3 px-4 font-semibold">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold">Customer</th>
              <th className="text-left py-3 px-4 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 font-semibold">#{order._id.slice(-6)}</td>
                <td className="py-3 px-4">{order.userId.name}</td>
                <td className="py-3 px-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="px-3 py-1 border border-neutral-300 rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button className="text-primary hover:underline font-semibold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AdminFoods() {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'mains',
    image: ''
  })

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance.get('/foods')
        setFoods(response.data)
      } catch (error) {
        console.error('Failed to fetch foods:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFoods()
  }, [])

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        setIsUploadingImage(true)
        const response = await axiosInstance.post('/foods/upload', {
          imageData: reader.result
        })
        setFormData(prev => ({ ...prev, image: response.data.url }))
      } catch (error) {
        console.error('Failed to upload image:', error)
        alert(error.response?.data?.message || 'Image upload failed')
      } finally {
        setIsUploadingImage(false)
      }
    }

    reader.readAsDataURL(file)
  }

  const handleAddFood = async () => {
    if (!formData.image) {
      alert('Please upload a food image first.')
      return
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price)
      }
      const response = await axiosInstance.post('/foods', payload)
      setFoods([response.data, ...foods])
      setFormData({ name: '', description: '', price: '', category: 'mains', image: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to add food:', error)
      alert(error.response?.data?.message || 'Failed to add food')
    }
  }

  const handleDeleteFood = async (foodId) => {
    try {
      await axiosInstance.delete(`/foods/${foodId}`)
      setFoods(foods.filter(f => f._id !== foodId))
    } catch (error) {
      console.error('Failed to delete food:', error)
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="card p-6">
        {showForm ? (
          <div className="space-y-4">
            <h2 className="font-bold text-xl mb-2">Add New Food</h2>
            <p className="text-sm text-neutral-500 mb-4">Upload an image and create a new menu item.</p>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field"
              rows="3"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="input-field"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="input-field"
            >
              <option value="appetizers">Appetizers</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
              <option value="sides">Sides</option>
            </select>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Food image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input-field"
              />
              {isUploadingImage && <p className="text-sm text-primary">Uploading image to Cloudinary...</p>}
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-28 w-28 object-cover rounded-lg border border-neutral-200" />
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={handleAddFood} className="btn-primary" disabled={isUploadingImage}>
                Add Food
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Add New Food
          </button>
        )}
      </div>

      <div className="card p-6">
        <h2 className="font-bold text-2xl mb-6">Foods Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foods.map(food => (
            <div key={food._id} className="border border-neutral-200 rounded-lg p-4 bg-white/70 backdrop-blur-sm">
              <div className="flex gap-4">
                <img src={food.image} alt={food.name} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold">{food.name}</h3>
                  <p className="text-primary font-semibold">${food.price}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-3">{food.description.slice(0, 90)}...</p>
              <button
                onClick={() => handleDeleteFood(food._id)}
                className="text-red-500 hover:text-red-700 font-semibold mt-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div className="card p-6">
      <h2 className="font-bold text-2xl mb-6">Users Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 font-semibold">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
