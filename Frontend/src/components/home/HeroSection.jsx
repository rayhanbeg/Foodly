import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Avg. delivery', value: '28 min' },
  { label: 'Happy customers', value: '22k+' },
  { label: 'Top rating', value: '4.9/5' },
];

export default function HeroSection() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200/70">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl md:rounded-[2rem] border border-neutral-200 shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&auto=format&fit=crop&q=80"
            alt="Fresh food spread"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1724]/90 via-[#0f1724]/70 to-[#0f1724]/50" />

          <div className="relative px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div className="max-w-3xl text-white">
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/90 backdrop-blur">
                MODERN FOOD DELIVERY
              </p>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fresh meals delivered
                <span className="text-[#ffb400]"> fast, warm, and right on time.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-100/95">
                Enjoy chef-crafted dishes with a premium ordering experience designed for every screen and every craving.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className="inline-flex h-[50px] items-center justify-center whitespace-nowrap rounded-full bg-[#ffb400] px-6 text-sm sm:text-[15px] font-semibold text-[#0f1724] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1724]"
                >
                  Browse Menu
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-[50px] items-center justify-center whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-6 text-sm sm:text-[15px] font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1724]"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-xs sm:text-sm text-slate-100/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
