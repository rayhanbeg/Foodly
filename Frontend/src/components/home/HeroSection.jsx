import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' },
]

export default function HeroSection() {
  return (
    <section className="border-b border-black/10 bg-[#fef9f2]">
      <div className="container-fluid py-12 md:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="order-2 lg:order-1"
          >
            <p className="inline-flex rounded-xl border border-black/10 bg-[#fef9f2] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#9ca3af]">
              Modern Food Delivery
            </p>

            <h1 className="mt-5 text-[34px] font-bold leading-[1.14] text-[#0f1724] sm:text-[40px] lg:text-[48px]">
              Clean flavors, fast delivery,
              <span className="text-[#ffb400]"> zero hassle.</span>
            </h1>

            <p className="mt-4 max-w-[500px] text-[16px] leading-[1.65] text-[#9ca3af]">
              Discover chef-crafted meals with a polished ordering experience built for speed and consistency.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                to="/menu"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ffb400] px-7 py-3 text-[14px] font-medium text-[#0f1724] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb400] focus-visible:ring-offset-2"
              >
                Browse Menu
              </Link>
              <Link
                to="/register"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-black/10 bg-[#fef9f2] px-7 py-3 text-[14px] font-medium text-[#0f1724] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <article
                  key={item.label}
                  className="min-w-[128px] rounded-lg border border-black/10 bg-white px-5 py-4"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <p className="text-[22px] font-bold text-[#0f1724]">{item.value}</p>
                  <p className="mt-1.5 text-[12px] text-[#9ca3af]">{item.label}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop&q=80"
                alt="Fresh food bowl"
                className="block h-[300px] w-full rounded-[28px] object-cover sm:h-[380px] lg:h-[460px]"
              />
              <div className="absolute -bottom-5 left-3 rounded-lg border border-black/10 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:-bottom-6 sm:left-4 sm:px-6 sm:py-4 lg:-left-5">
                <p className="text-[12px] text-[#9ca3af]">Today&apos;s delivery slots</p>
                <p className="mt-1.5 text-[15px] font-semibold text-[#0f1724] sm:text-base">Open • 11:00 AM – 10:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
