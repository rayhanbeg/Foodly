import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const kpis = [
  { label: 'Minutes avg delivery', value: '24' },
  { label: 'Active restaurants', value: '350+' },
  { label: 'Customer rating', value: '4.9' },
];

const tags = ['Healthy Bowls', 'Chef Specials', 'Fast Checkout'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-[#fff7e8]">
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#ffc443]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#ff8f6b]/25 blur-3xl" />

      <div className="container-fluid relative py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center lg:text-left"
          >
            <p className="inline-flex items-center rounded-full border border-[#f3d59a] bg-white/80 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-[#7c5a16]">
              FOODLY • MODERN DELIVERY
            </p>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#101828] sm:text-4xl lg:text-[56px] lg:leading-[1.08]">
              Fresh food,
              <br className="hidden sm:block" />
              designed to arrive
              <span className="text-[#f97316]"> perfectly.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm text-neutral-600 sm:text-base lg:mx-0 lg:max-w-lg">
              Order handcrafted meals from trusted kitchens near you with a premium, delightfully
              simple experience from browse to doorstep.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#ead5b3] bg-white/75 px-3 py-1.5 text-xs font-medium text-[#7c5a16]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                to="/menu"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#111827] px-7 text-sm font-semibold text-white transition hover:bg-black"
              >
                Explore Menu
              </Link>
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#d9c29d] bg-white px-7 text-sm font-semibold text-[#111827] transition hover:bg-[#fffaf1]"
              >
                Start Free Account
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-[#eddcbf] bg-white/85 p-4 shadow-[0_15px_35px_-28px_rgba(15,23,42,0.8)]">
              {kpis.map((item) => (
                <div key={item.label} className="text-center lg:text-left">
                  <p className="text-xl font-bold text-[#0f172a] sm:text-2xl">{item.value}</p>
                  <p className="text-[11px] font-medium text-neutral-500 sm:text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[28px] border border-[#f2dcc1] bg-white p-3 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.45)] sm:p-4">
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80"
                alt="Colorful healthy meal plate"
                className="h-72 w-full rounded-2xl object-cover sm:h-96 lg:h-[500px]"
              />
            </div>

            <div className="absolute -left-2 top-5 rounded-2xl border border-[#f3debe] bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-6 sm:px-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                Estimated arrival
              </p>
              <p className="text-lg font-bold text-[#111827]">11:18 AM</p>
            </div>

            <div className="absolute -bottom-5 right-2 max-w-[240px] rounded-2xl border border-[#f0d8b5] bg-[#111827] px-4 py-4 text-white shadow-xl sm:-right-6 sm:max-w-[280px] sm:px-5">
              <p className="text-xs text-white/80">Today’s top offer</p>
              <p className="mt-1 text-sm font-semibold sm:text-base">20% off on first 3 orders</p>
              <p className="mt-2 text-xs text-white/75">Use code: FOODLY20 at checkout.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
