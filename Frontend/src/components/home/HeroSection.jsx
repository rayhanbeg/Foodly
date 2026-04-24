import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
void motion

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' },
];

export default function HeroSection() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200/70">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Grid with responsive order */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Image - appears first on mobile, second on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop&q=80"
              alt="Fresh food bowl"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[520px] object-cover rounded-2xl lg:rounded-3xl shadow-xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 left-4 right-4 lg:left-6 lg:right-auto bg-white border border-neutral-200 rounded-2xl p-3 lg:p-4 shadow-lg">
              <p className="text-xs text-neutral-500">Today’s delivery slots</p>
              <p className="text-base lg:text-lg font-semibold text-neutral-900">Open • 11:00 AM – 10:00 PM</p>
            </div>
          </motion.div>

          {/* Text content - appears second on mobile, first on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="inline-flex px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wide text-neutral-600">
              MODERN FOOD DELIVERY
            </p>
            <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-neutral-900">
              Clean flavors, fast delivery,
              <span className="text-[#ffb400]"> zero hassle.</span>
            </h1>
            <p className="mt-5 text-sm md:text-base text-neutral-600 max-w-xl mx-auto lg:mx-0">
              Discover chef-crafted meals with a polished ordering experience built for speed and consistency.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <Link
              to="/menu"
              className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-[#ffb400] px-[26px] text-[15px] font-medium text-[#0f1724] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb400] focus-visible:ring-offset-2"
            >
              Browse Menu
            </Link>
            <Link
              to="/register"
              className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white/70 px-[26px] text-[15px] font-medium text-[#0f1724] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
            >
              Create Account
            </Link>
            </div>

            {/* Stats cards */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {stats.map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-neutral-200 p-3 text-center">
                  <p className="text-base font-bold text-neutral-900">{item.value}</p>
                  <p className="text-xs text-neutral-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
