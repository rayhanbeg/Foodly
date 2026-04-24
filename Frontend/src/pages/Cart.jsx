import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice'
import { formatBDT } from '../utils/currency'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalPrice } = useSelector(state => state.cart)
  const deliveryCharges = totalPrice > 500 ? 0 : 50
  const finalTotal = totalPrice + deliveryCharges

  if (items.length === 0) {
    return (
      <div className="container-fluid py-16 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-600 mb-8">Start adding items to your cart</p>
        <Link to="/menu" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container-fluid py-12">
      <h1 className="font-display text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="space-y-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-neutral-200 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-primary font-semibold">{formatBDT(item.price)}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-neutral-300 rounded-lg">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="ml-auto text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">
                      {formatBDT(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-200">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-bold text-base mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">{formatBDT(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Delivery Charges</span>
                <span className="font-semibold">
                  {deliveryCharges === 0 ? 'Free' : formatBDT(deliveryCharges)}
                </span>
              </div>
              {totalPrice <= 500 && (
                <p className="text-sm text-green-600">
                  Add {formatBDT(500 - totalPrice)} more for free delivery!
                </p>
              )}
            </div>

            <div className="flex justify-between mb-8 text-base">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary text-lg">{formatBDT(finalTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary py-3 font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart