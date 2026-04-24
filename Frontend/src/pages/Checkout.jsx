import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { clearCart } from '../redux/slices/cartSlice'
import { updateStoredUser } from '../redux/slices/authSlice'
import { createOrderStart, createOrderSuccess, createOrderFailure } from '../redux/slices/orderSlice'
import { formatBDT } from '../utils/currency'
import {
  SERVICE_CHARGE_RATE,
  VAT_RATE,
  DELIVERY_CHARGE,
  FREE_DELIVERY_THRESHOLD
} from '../constants/business'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(state => state.cart)
  const user = useSelector(state => state.auth.user)
  const { creatingOrder } = useSelector(state => state.order)

  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    deliveryAddress: user?.address || '',
    paymentMethod: 'cash_on_delivery',
    notes: ''
  })

  const phoneMissing = !user?.phone

  const serviceCharge = totalPrice * SERVICE_CHARGE_RATE
  const vatAmount = totalPrice * VAT_RATE
  const deliveryCharges = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE
  const finalTotal = totalPrice + serviceCharge + vatAmount + deliveryCharges

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createOrderStart())

    try {
      const orderData = {
        items: items.map(item => ({
          foodId: item.id,
          quantity: item.quantity
        })),
        ...formData
      }

      const response = await axiosInstance.post('/orders', orderData)
      dispatch(createOrderSuccess(response.data))
      dispatch(updateStoredUser({ phone: formData.phone, address: formData.deliveryAddress }))
      dispatch(clearCart())
      navigate(`/orders/${response.data._id}`)
    } catch (error) {
      dispatch(createOrderFailure(error.response?.data?.message || 'Failed to create order'))
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-fluid py-16 text-center">
        <p className="text-neutral-600 mb-8">Your cart is empty. Add items before checkout.</p>
        <button
          onClick={() => navigate('/menu')}
          className="btn-primary inline-block"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container-fluid py-12">
      <h1 className="font-display text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact + Delivery Address */}
            <div className="card p-6 space-y-4">
              <h2 className="font-bold text-base">Contact & Delivery</h2>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter 10 digit phone number"
                  pattern="[0-9]{10}"
                  required
                />
                <p className="text-xs text-neutral-500 mt-2">
                  {phoneMissing ? 'Please add your phone number to continue checkout.' : 'Your saved phone number is pre-filled. You can update it if needed.'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>

              <p className="text-xs text-neutral-500">
                Estimated delivery time: approximately 30-40 minutes from order confirmation.
              </p>
            </div>

            {/* Payment Method */}
            <div className="card p-6">
              <h2 className="font-bold text-base mb-4">Payment Method</h2>
              <div className="space-y-3">
                 <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked
                    readOnly
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">Cash on Delivery (COD)</span>
                </label>
                <p className="text-sm text-neutral-600">
                  We currently accept only Cash on Delivery for direct branch orders.
                </p>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="card p-6">
              <h2 className="font-bold text-base mb-4">Special Instructions (Optional)</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="Any special requests or instructions..."
              />
            </div>

            {/* Order Items Review */}
            <div className="card p-6">
              <h2 className="font-bold text-base mb-4">Order Review</h2>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatBDT(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={creatingOrder}
              className="w-full btn-primary py-3 text-base font-semibold disabled:opacity-50"
            >
              {creatingOrder ? 'Processing...' : `Place Order - ${formatBDT(finalTotal)}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-base mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
              {items.map(item => (
                <div key={item.id} className="text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-neutral-600">
                    {item.quantity} x {formatBDT(item.price)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">{formatBDT(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Delivery</span>
                <span className="font-semibold">
                  {deliveryCharges === 0 ? 'Free' : formatBDT(deliveryCharges)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Service charge (5%)</span>
                <span className="font-semibold">{formatBDT(serviceCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">VAT (5%)</span>
                <span className="font-semibold">{formatBDT(vatAmount)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary text-base">{formatBDT(finalTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="w-full btn-outline text-center"
            >
              Edit Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Checkout
