import { motion } from 'framer-motion';

function ServicesSection() {
  const services = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30-45 minutes with real-time tracking'
    },
    {
      icon: '⭐',
      title: 'Quality Guaranteed',
      description: 'Carefully selected restaurants ensuring the highest food standards'
    },
    {
      icon: '💰',
      title: 'Great Prices',
      description: 'Competitive pricing with special offers and discounts available'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Safe and encrypted transactions with multiple payment options'
    },
    {
      icon: '📱',
      title: 'Easy to Use',
      description: 'Simple and intuitive app interface for seamless ordering'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Dedicated customer support available round the clock'
    }
  ];

  return (
    <section className="section container-fluid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Choose Foodly?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We provide the best food delivery experience with quality, speed, and excellent service
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card card-border p-8"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default ServicesSection