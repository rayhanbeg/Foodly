import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { formatBDT } from '../utils/currency'

const statusSteps = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered']

function OrderTracking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${id}`)
        setOrder(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch order:', error)
        setIsLoading(false)
        navigate('/profile')
      }
    }
    fetchOrder()

    const interval = setInterval(fetchOrder, 5000)
    return () => clearInterval(interval)
  }, [id, navigate])

  if (isLoading) {
    return <div className="container-fluid py-12 text-center">Loading...</div>
  }

  if (!order) {
    return <div className="container-fluid py-12 text-center">Order not found</div>
  }

  const currentStep = statusSteps.indexOf(order.status)

  return (
    <div className="container-fluid py-12">
      <button
        onClick={() => navigate('/profile')}
        className="text-primary hover:underline mb-8 font-medium"
      >
        ← Back to Profile
      </button>

      <div className="max-w-2xl mx-auto">
        {/* Order Header */}
        <div className="card p-8 mb-8">
          <h1 className="font-display text-3xl font-bold mb-4">Order #{order._id.slice(-6)}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-600 text-sm">Order Date</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Total Amount</p>
              <p className="font-bold text-lg text-primary">
                {formatBDT(order.totalAmount)}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Payment Status</p>
              <p className="font-semibold capitalize bg-neutral-200 text-neutral-700 px-3 py-1 rounded w-fit">
                {order.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Delivery Address</p>
              <p className="font-semibold text-sm">{order.deliveryAddress}</p>
            </div>
            <div>
              <p className="text-neutral-600 text-sm">Branch</p>
              <p className="font-semibold text-sm">{order.branchName}</p>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="card p-8 mb-8">
          <h2 className="font-bold text-lg mb-6">Order Status</h2>

          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index <= currentStep ? 'bg-primary' : 'bg-neutral-300'
                    }`}
                  >
                    {index <= currentStep ? '✓' : index + 1}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`w-1 h-12 ${
                        index < currentStep ? 'bg-primary' : 'bg-neutral-300'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold capitalize text-neutral-900">
                    {step.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {index <= currentStep ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {order.status === 'delivered' && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold">
                Order delivered at {new Date(order.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="card p-8 mb-8">
          <h2 className="font-bold text-lg mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center pb-4 border-b border-neutral-200 last:border-b-0">
                <div>
                  <p className="font-semibold">{item.foodName}</p>
                  <p className="text-sm text-neutral-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">{formatBDT(item.subtotal)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="card p-8">
          <h2 className="font-bold text-lg mb-6">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold">
                {formatBDT(order.subtotalAmount || (order.totalAmount - order.deliveryCharges))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Delivery Charges</span>
              <span className="font-semibold">
                {order.deliveryCharges === 0 ? 'Free' : formatBDT(order.deliveryCharges)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Service charge</span>
              <span className="font-semibold">{formatBDT(order.serviceCharge || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">VAT</span>
              <span className="font-semibold">{formatBDT(order.vatAmount || 0)}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-3 mt-3">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg text-primary">
                {formatBDT(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderTracking
