import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { formatBDT } from '../utils/currency'

function UserProfile() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axiosInstance.get('/users/profile')
        setProfile(profileRes.data)
        setFormData(profileRes.data)

        const ordersRes = await axiosInstance.get('/orders/user/my-orders')
        setOrders(ordersRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put('/users/profile', formData)
      setProfile(response.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (isLoading) {
    return <div className="container-fluid py-12 text-center">Loading...</div>
  }

  return (
    <div className="container-fluid py-12">
      <h1 className="font-display text-2xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white">
                👤
              </div>
              <h2 className="font-bold text-lg">{profile?.name}</h2>
              <p className="text-neutral-600">{profile?.email}</p>
            </div>

            <div className="space-y-4 border-t border-neutral-200 pt-4">
              <div>
                <p className="text-sm text-neutral-600">Phone</p>
                <p className="font-semibold">{profile?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Address</p>
                <p className="font-semibold">{profile?.address || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Role</p>
                <p className="font-semibold capitalize">{profile?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl">Profile Settings</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    className="input-field bg-neutral-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    rows="3"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData(profile)
                    }}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          {/* Recent Orders */}
          <div className="card p-8 mt-8">
            <h2 className="font-bold text-xl mb-6">Recent Orders</h2>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-600 mb-4">No orders yet</p>
                <Link to="/menu" className="btn-primary inline-block">
                  Start Ordering
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <Link
                    key={order._id}
                    to={`/orders/${order._id}`}
                    className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-neutral-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatBDT(order.totalAmount)}</p>
                      <p className="text-sm capitalize bg-neutral-200 text-neutral-700 px-2 py-1 rounded">
                        {order.status}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserProfile