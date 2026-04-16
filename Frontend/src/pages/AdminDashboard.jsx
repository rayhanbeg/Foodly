import { useEffect, useMemo, useState } from 'react'
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

const orderStatusStyles = {
  pending: 'bg-amber-100 text-amber-800 border border-amber-200',
  confirmed: 'bg-blue-100 text-blue-800 border border-blue-200',
  preparing: 'bg-violet-100 text-violet-800 border border-violet-200',
  out_for_delivery: 'bg-cyan-100 text-cyan-800 border border-cyan-200',
  delivered: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-800 border border-rose-200'
}

const statusLabel = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
}

function AdminDashboard() {
  return (
    <div className="container-fluid py-10 lg:py-12">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 sm:px-8 text-white shadow-xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300 mb-2">Foodly Admin Suite</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Restaurant Operations Dashboard</h1>
            <p className="text-slate-200 mt-2 max-w-3xl">Track orders, manage the menu, and supervise customers from one professional control center.</p>
          </div>
          <Link to="/admin/foods/new" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-3 font-semibold text-slate-900 shadow-lg transition-colors">
            + Add New Menu Item
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <aside className="lg:col-span-1">
          <div className="card p-4 h-fit sticky top-24 border border-slate-200/80 shadow-lg shadow-slate-200/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 px-2 mb-3">Management</p>
            <nav className="space-y-2">
              <AdminNavLink to="/admin/orders" description="Track live order flow">Orders</AdminNavLink>
              <AdminNavLink to="/admin/foods" description="Maintain full menu">Menu Items</AdminNavLink>
              <AdminNavLink to="/admin/foods/new" description="Create new dishes">Add Item</AdminNavLink>
              <AdminNavLink to="/admin/users" description="Review customers & admins">Users</AdminNavLink>
            </nav>
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <QuickStatCard title="Service Mode" value="Live" helper="Orders and menu sync enabled" />
            <QuickStatCard title="Visibility" value="Public" helper="Customers can place orders" />
            <QuickStatCard title="Coverage" value="All Branches" helper="Centralized controls active" />
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

function QuickStatCard({ title, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{helper}</p>
    </div>
  )
}

function AdminNavLink({ to, children, description }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `block rounded-xl px-4 py-3 transition-all ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'}`}
    >
      <p className="font-semibold">{children}</p>
      <p className={`text-xs mt-1 ${description ? '' : 'hidden'} text-inherit/80`}>{description}</p>
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

  const orderSummary = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
    const activeOrders = orders.filter(order => !['delivered', 'cancelled'].includes(order.status)).length
    const deliveredCount = orders.filter(order => order.status === 'delivered').length

    return {
      totalOrders: orders.length,
      activeOrders,
      deliveredCount,
      totalRevenue
    }
  }, [orders])

  if (isLoading) return <div className="text-center text-slate-500">Loading orders...</div>

  return (
    <div className="card p-6 border border-slate-200 shadow-lg shadow-slate-200/60 rounded-2xl">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="font-bold text-2xl text-slate-900">Order Operations</h2>
          <p className="text-sm text-slate-500 mt-1">Monitor and update the complete restaurant order lifecycle.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <SummaryChip label="Total Orders" value={orderSummary.totalOrders} />
        <SummaryChip label="In Progress" value={orderSummary.activeOrders} />
        <SummaryChip label="Delivered" value={orderSummary.deliveredCount} />
        <SummaryChip label="Revenue" value={formatBDT(orderSummary.totalRevenue)} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Current Status</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">#{order._id.slice(-6)}</td>
                <td className="py-3 px-4 text-slate-700">{order.userId?.name || 'Unknown User'}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{formatBDT(order.totalAmount)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${orderStatusStyles[order.status] || 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                    {statusLabel[order.status] || order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="w-full max-w-[190px] px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
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

function SummaryChip({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900 mt-2">{value}</p>
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

  if (isLoading) return <div className="text-center text-slate-500">Loading menu items...</div>

  return (
    <div className="card p-6 border border-slate-200 shadow-lg shadow-slate-200/60 rounded-2xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-2xl text-slate-900">Menu Management</h2>
          <p className="text-sm text-slate-500 mt-1">Curate dish details, pricing, and availability from one view.</p>
        </div>
        <Link to="/admin/foods/new" className="btn-primary">Add Menu Item</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {foods.map(food => (
          <div key={food._id} className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <img src={food.image} alt={food.name} className="h-16 w-16 rounded-lg object-cover border border-slate-200" />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">{food.name}</h3>
                <p className="text-amber-600 font-semibold">{formatBDT(food.price)}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">{food.category}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">{food.description.slice(0, 90)}...</p>
            <div className="mt-4 flex gap-5 text-sm">
              <Link to={`/admin/foods/${food._id}/edit`} className="text-slate-800 hover:text-black hover:underline font-semibold">Edit</Link>
              <button onClick={() => handleDeleteFood(food._id)} className="text-rose-600 hover:text-rose-800 font-semibold">Delete</button>
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

  if (isLoading) return <div className="text-center text-slate-500">Loading menu form...</div>

  return (
    <div className="card p-6 border border-slate-200 shadow-lg shadow-slate-200/60 rounded-2xl">
      <h2 className="font-bold text-2xl text-slate-900 mb-2">{isEditMode ? 'Edit Menu Item' : 'Create Menu Item'}</h2>
      <p className="text-sm text-slate-500 mb-6">Maintain consistent, guest-friendly menu data for your restaurant storefront.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Menu item name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
        <textarea placeholder="Menu description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" rows="4" required />
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

        <label className="flex items-center gap-2 text-sm text-slate-700 font-medium">
          <input type="checkbox" checked={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} />
          Menu item is currently available for ordering
        </label>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Menu image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
          {isUploadingImage && <p className="text-sm text-amber-600">Uploading image to Cloudinary...</p>}
          {formData.image && <img src={formData.image} alt="Preview" className="h-28 w-28 object-cover rounded-lg border border-slate-200" />}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn-primary" disabled={isUploadingImage || isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Item' : 'Create Item'}
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

  if (isLoading) return <div className="text-center text-slate-500">Loading users...</div>

  return (
    <div className="card p-6 border border-slate-200 shadow-lg shadow-slate-200/60 rounded-2xl">
      <h2 className="font-bold text-2xl mb-2 text-slate-900">User Directory</h2>
      <p className="text-sm text-slate-500 mb-6">View customer and team account details in a secure, organized layout.</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">{user.name}</td>
                <td className="py-3 px-4 text-slate-700">{user.email}</td>
                <td className="py-3 px-4 text-slate-700">{user.phone}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-700">{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard