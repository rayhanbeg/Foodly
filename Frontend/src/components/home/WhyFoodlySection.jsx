import { motion } from 'framer-motion'
void motion

const features = [
  {
    title: 'Operational precision',
    desc: 'Optimized kitchen + rider flow keeps service reliable across peak hours.'
  },
  {
    title: 'Quality-first menu',
    desc: 'Every item is reviewed for ingredients, consistency, and packaging quality.'
  },
  {
    title: 'Transparent ordering',
    desc: 'Simple pricing, clear ETAs, and live order updates from prep to doorstep.'
  }
]

function WhyFoodlySection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-fluid">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
          <p className="text-xs tracking-[0.16em] text-amber-600 font-semibold">WHY FOODLY</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold text-neutral-900">Minimal experience, professional standards.</h2>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <p className="text-sm font-semibold text-amber-600">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="mt-3 text-neutral-600">{feature.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyFoodlySection