import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
void motion

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('/api/orders/user/my-orders', config);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 container-fluid section flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Order History</h1>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {['all', 'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {status === 'all' ? 'All Orders' : formatStatus(status)}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <div className="card card-border p-12 text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? "You haven't placed any orders yet. Start ordering now!" 
                  : `No ${filter.replace(/_/g, ' ')} orders`}
              </p>
              <button
                onClick={() => navigate('/menu')}
                className="btn-primary"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="card card-border p-6 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-bold text-base text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span><strong>{order.items.length}</strong> item{order.items.length !== 1 ? 's' : ''}</span>
                        <span>📍 {order.deliveryAddress}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-amber-600">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${order._id}`);
                        }}
                        className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
export default OrderHistory