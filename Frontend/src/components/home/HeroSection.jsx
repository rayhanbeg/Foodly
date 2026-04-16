import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' },
]

export default function HeroSection() {
  return (
    <section className="bg-[#fef9f2] border-b border-black/10">
      <div className="container-fluid py-16 md:py-24 lg:py-28 xl:py-32">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <p className="inline-flex rounded-xl border border-black/10 bg-[#fef9f2] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#9ca3af]">
              Modern Food Delivery
            </p>

            <h1 className="mt-6 text-[40px] font-bold leading-[1.15] text-[#0f1724] sm:text-[48px] lg:text-[56px]">
              Clean flavors, fast delivery,
              <span className="text-[#ffb400]"> zero hassle.</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-[18px] leading-[1.6] text-[#9ca3af]">
              Discover chef-crafted meals with a polished ordering experience built for speed and consistency.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#ffb400] px-8 py-3.5 text-[15px] font-medium text-[#0f1724] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ffb400]"
              >
                Browse Menu
              </Link>
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-black/10 bg-[#fef9f2] px-8 py-3.5 text-[15px] font-medium text-[#0f1724] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/30"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
              {stats.map((item) => (
                <article
                  key={item.label}
                  className="min-w-[140px] rounded-lg border border-black/10 bg-white px-6 py-5"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <p className="text-2xl font-bold text-[#0f1724]">{item.value}</p>
                  <p className="mt-2 text-[13px] text-[#9ca3af]">{item.label}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop&q=80"
                alt="Fresh food bowl"
                className="block h-[360px] w-full rounded-[32px] object-cover sm:h-[480px] lg:h-[600px]"
              />
              <div className="absolute -bottom-6 left-4 rounded-lg border border-black/10 bg-white px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:-bottom-8 sm:-left-4 sm:px-8 sm:py-6 lg:-left-8">
                <p className="text-[13px] text-[#9ca3af]">Today&apos;s delivery slots</p>
                <p className="mt-2 text-base font-semibold text-[#0f1724] sm:text-lg">Open • 11:00 AM – 10:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
