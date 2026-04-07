import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
void motion

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' }
]

export default function HeroSection() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200/70">
      <div className="container-fluid py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="inline-flex px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wide text-neutral-600">MODERN FOOD DELIVERY</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight text-neutral-900">
              Clean flavors, fast delivery,
              <span className="text-amber-600"> zero hassle.</span>
            </h1>
            <p className="mt-5 text-neutral-600 max-w-xl">
              Discover chef-crafted meals with a polished ordering experience built for speed and consistency.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary rounded-full px-7">Browse Menu</Link>
              <Link to="/register" className="btn-outline rounded-full px-7">Create Account</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {stats.map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-neutral-200 p-3">
                  <p className="text-lg font-bold text-neutral-900">{item.value}</p>
                  <p className="text-xs text-neutral-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop&q=80"
              alt="Fresh food bowl"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-xl"
            />
            <div className="absolute -bottom-6 left-6 bg-white border border-neutral-200 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-neutral-500">Today’s delivery slots</p>
              <p className="text-xl font-semibold text-neutral-900">Open • 11:00 AM - 10:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
