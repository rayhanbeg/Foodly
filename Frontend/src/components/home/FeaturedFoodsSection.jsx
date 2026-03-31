import { Link } from 'react-router-dom'
import FoodCard from '../FoodCard'

export default function FeaturedFoodsSection({ foods, isLoading }) {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl font-bold mb-2">Featured Foods</h2>
            <p className="text-neutral-600">Most-loved dishes from our customers this week.</p>
          </div>
          <Link to="/menu" className="hidden md:inline-flex text-primary font-semibold hover:underline">
            See full menu →
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading foods...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foods.map(food => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 md:hidden">
          <Link to="/menu" className="btn-primary">
            View All Foods
          </Link>
        </div>
      </div>
    </section>
  )
}
