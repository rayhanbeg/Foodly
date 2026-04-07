import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('/api/newsletter/subscribe', { email });
      setMessage('success');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white section">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Get Latest Offers</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter and get exclusive deals, recipes, and food inspiration delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 rounded-md font-semibold transition-colors whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={message === 'success' ? 'text-green-400 mt-3' : 'text-red-400 mt-3'}
            >
              {message === 'success' 
                ? '✓ Successfully subscribed!' 
                : message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
export default NewsletterSection