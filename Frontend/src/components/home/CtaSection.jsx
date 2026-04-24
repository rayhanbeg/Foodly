import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
void motion

function CtaSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-neutral-900 text-white p-8 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.16em] text-amber-400 font-semibold">READY TO ORDER</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">Bring restaurant-quality meals to your door.</h2>
            <p className="mt-3 text-neutral-300">Experience a faster, cleaner and more professional food ordering journey with Foodly.</p>
          </div>
          <div className="flex gap-2 lg:gap-3">
            <Link to="/menu" className="bg-white text-neutral-900 px-3 py-1 lg:px-6 lg:py-3 rounded-xl font-semibold">Start ordering</Link>
            <Link to="/register" className="border border-white/30 px-3 py-1 lg:px-6 lg:py-3 rounded-xl font-semibold text-white">Create account</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
export default CtaSection