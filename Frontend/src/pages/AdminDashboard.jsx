import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { formatBDT } from '../utils/currency'

const initialFoodForm = {
  name: '',
  description: '',
  price: '',
  category: 'mains',
  image: '',
  prepTimeMinutes: 25,
  available: true
}

function AdminDashboard() {
  return (
    <div className="container-fluid py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Control Center</h1>
          <p className="text-neutral-500 mt-1">Manage your own restaurant branches, menu items, and orders.</p>
        </div>
        <Link to="/admin/foods/new" className="btn-primary">+ Add New Food</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="card p-4 h-fit sticky top-24">
            <nav className="space-y-2">
              <AdminNavLink to="/admin/orders">Orders</AdminNavLink>
              <AdminNavLink to="/admin/foods">Foods</AdminNavLink>
              <AdminNavLink to="/admin/foods/new">Add Food</AdminNavLink>
              <AdminNavLink to="/admin/users">Users</AdminNavLink>
            </nav>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

function AdminNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `block px-4 py-2.5 rounded-lg font-semibold transition-colors ${isActive ? 'bg-primary text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
    >
      {children}
    </NavLink>
  )
}

export function AdminOrders() {
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
      setOrders(orders.map(o => (o._id === orderId ? { ...o, status } : o)))
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
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="py-3 px-4 font-semibold">#{order._id.slice(-6)}</td>
                <td className="py-3 px-4">{order.userId.name}</td>
                <td className="py-3 px-4 font-semibold">{formatBDT(order.totalAmount)}</td>
                <td className="py-3 px-4">
                  <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="px-3 py-1 border border-neutral-300 rounded-lg text-sm">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminFoods() {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl">Foods Management</h2>
        <Link to="/admin/foods/new" className="btn-primary">Add Food</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foods.map(food => (
          <div key={food._id} className="border border-neutral-200 rounded-lg p-4 bg-white/70 backdrop-blur-sm">
            <div className="flex gap-4">
              <img src={food.image} alt={food.name} className="h-16 w-16 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold">{food.name}</h3>
                <p className="text-amber-600 font-semibold">{formatBDT(food.price)}</p>
                <p className="text-xs text-neutral-500">{food.category}</p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mt-3">{food.description.slice(0, 90)}...</p>
            <div className="mt-4 flex gap-5">
              <Link to={`/admin/foods/${food._id}/edit`} className="text-primary hover:underline font-semibold">Edit</Link>
              <button onClick={() => handleDeleteFood(food._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminFoodForm() {
  const { foodId } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(foodId)
  const [formData, setFormData] = useState(initialFoodForm)
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isEditMode) return

    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get(`/foods/${foodId}`)
        const food = response.data
        setFormData({
          name: food.name,
          description: food.description,
          price: food.price,
          category: food.category,
          image: food.image,
          prepTimeMinutes: food.prepTimeMinutes || 25,
          available: food.available
        })
      } catch (error) {
        console.error('Failed to fetch food for edit:', error)
        navigate('/admin/foods')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFood()
  }, [foodId, isEditMode, navigate])

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
        const response = await axiosInstance.post('/foods/upload', { imageData: reader.result })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.image) {
      alert('Please upload a food image first.')
      return
    }

    try {
      setIsSubmitting(true)
      const payload = { ...formData, price: Number(formData.price), prepTimeMinutes: Number(formData.prepTimeMinutes) }
      if (isEditMode) {
        await axiosInstance.put(`/foods/${foodId}`, payload)
      } else {
        await axiosInstance.post('/foods', payload)
      }
      navigate('/admin/foods')
    } catch (error) {
      console.error('Failed to submit food:', error)
      alert(error.response?.data?.message || 'Failed to save food')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div className="card p-6">
      <h2 className="font-bold text-2xl mb-2">{isEditMode ? 'Edit Food' : 'Add New Food'}</h2>
      <p className="text-sm text-neutral-500 mb-6">Use this dedicated page to keep food data clean and consistent.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" rows="4" required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" min="0" placeholder="Price in BDT" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field" required />
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
            <option value="appetizers">Appetizers</option>
            <option value="mains">Mains</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            <option value="sides">Sides</option>
          </select>
        </div>
        <input type="number" min="5" max="120" placeholder="Prep time in minutes" value={formData.prepTimeMinutes} onChange={(e) => setFormData({ ...formData, prepTimeMinutes: e.target.value })} className="input-field" required />

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} />
          Food is available for ordering
        </label>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Food image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
          {isUploadingImage && <p className="text-sm text-primary">Uploading image to Cloudinary...</p>}
          {formData.image && <img src={formData.image} alt="Preview" className="h-28 w-28 object-cover rounded-lg border border-neutral-200" />}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary" disabled={isUploadingImage || isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Food' : 'Add Food'}
          </button>
          <Link to="/admin/foods" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export function AdminUsers() {
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

export default AdminDashboard
