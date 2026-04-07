import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FoodCard from '../FoodCard'
void motion

export default function FeaturedFoodsSection({ foods, isLoading }) {
  return (
    <section className="py-16 md:py-20 bg-neutral-50 border-y border-neutral-200/70">
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.16em] text-amber-600 font-semibold">FEATURED</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Popular this week</h2>
          </div>
          <Link to="/menu" className="hidden md:inline-flex text-neutral-900 font-semibold hover:text-amber-600">
            View all menu →
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-14 text-neutral-600">Loading foods...</div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {foods.map(food => (
              <motion.div key={food._id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                <FoodCard food={food} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}