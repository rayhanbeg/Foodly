import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
void motion

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await axios.post('/api/newsletter/subscribe', { email })
      setMessage('success')
      setEmail('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-neutral-900 text-white">
      <div className="container-fluid">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.16em] text-amber-400 font-semibold">NEWSLETTER</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Join for updates and curated offers.</h2>
          <p className="mt-4 text-neutral-300">Get early access to new menu drops and limited-time seasonal deals.</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3 rounded-xl text-gray-900"
            />
            <button type="submit" disabled={loading} className="px-7 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 font-semibold">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && <p className={`mt-3 ${message === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message === 'success' ? '✓ Successfully subscribed!' : message}</p>}
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection
