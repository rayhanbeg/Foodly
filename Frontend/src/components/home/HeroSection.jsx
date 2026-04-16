import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' },
]

export default function HeroSection() {
  return (
    <section className="flex w-full justify-center px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-11">
      <div className="grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="order-2 flex flex-col items-start gap-6 pt-0 lg:order-1 lg:pt-5"
        >
          <p className="inline-flex items-center whitespace-nowrap rounded-full border border-black/10 bg-white/60 px-[18px] py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9ca3af]">
            Modern Food Delivery
          </p>

          <h1 className="max-w-[620px] text-[40px] font-bold leading-[1.02] tracking-[-0.045em] text-[#0f1724] sm:text-[52px] lg:text-[64px]">
            Clean flavors, fast delivery,
            <span className="text-[#ffb400]"> zero hassle.</span>
          </h1>

          <p className="max-w-[560px] text-[17px] leading-[1.65] text-[#9ca3af] lg:text-[18px]">
            Discover chef-crafted meals with a polished ordering experience built for speed and consistency.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3.5">
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

          <div className="mt-3 grid w-full max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <article
                key={item.label}
                className="min-w-0 rounded-xl border border-black/10 bg-white/70 px-[22px] pb-5 pt-[22px]"
                aria-label={`${item.label}: ${item.value}`}
              >
                <p className="truncate text-[18px] font-bold leading-[1.1] text-[#0f1724]">{item.value}</p>
                <p className="mt-2.5 text-[13px] leading-[1.35] text-[#9ca3af]">{item.label}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto flex min-h-[400px] max-w-[580px] items-center justify-center lg:min-h-[640px]">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[32px] bg-white sm:h-[520px] lg:h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&auto=format&fit=crop&q=80"
                alt="Fresh food bowl"
                className="block h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-3 min-w-[250px] rounded-xl bg-white/95 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,36,0.1)] sm:bottom-8 sm:left-0 sm:px-7 sm:py-5 lg:-left-7 lg:min-w-[308px]">
              <p className="text-[14px] leading-[1.4] text-[#9ca3af]">Today&apos;s delivery slots</p>
              <p className="mt-2 text-[16px] font-semibold leading-[1.3] text-[#0f1724] sm:text-[18px]">Open • 11:00 AM – 10:00 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
