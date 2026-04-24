import { motion } from 'framer-motion'
void motion

const services = [
  { title: 'Fast dispatch', description: 'Orders are assigned instantly to nearby riders for shorter delivery windows.' },
  { title: 'Secure checkout', description: 'Encrypted payments with trusted gateways and a straightforward refund flow.' },
  { title: 'Dedicated support', description: 'Human support team available for updates, refunds, and issue resolution.' }
]

function ServicesSection() {
  return (
    <section className="section container-fluid">
      <div className="max-w-2xl mb-8">
        <p className="text-xs tracking-[0.16em] text-amber-600 font-semibold">SERVICES</p>
        <h2 className="mt-2 text-xl md:text-2xl font-bold text-neutral-900">Everything built for a premium ordering flow.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="bg-white border border-neutral-200 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900">{service.title}</h3>
            <p className="mt-3 text-neutral-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection