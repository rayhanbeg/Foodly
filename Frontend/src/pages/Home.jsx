import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure } from '../redux/slices/foodSlice'
import FoodCard from '../components/FoodCard'

export default function Home() {
  const dispatch = useDispatch()
  const { foods, isLoading } = useSelector(state => state.food)

  useEffect(() => {
    const fetchFoods = async () => {
      dispatch(fetchFoodsStart())
      try {
        const response = await axiosInstance.get('/foods')
        dispatch(fetchFoodsSuccess(response.data.slice(0, 6)))
      } catch (error) {
        dispatch(fetchFoodsFailure(error.message))
      }
    }
    fetchFoods()
  }, [dispatch])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white py-20">
        <div className="container-fluid">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl font-bold mb-6">
              Hungry? Order Your Favorite Food Now
            </h1>
            <p className="text-lg text-orange-100 mb-8">
              Discover delicious meals from your favorite restaurants, delivered fresh to your door
            </p>
            <Link to="/menu" className="btn-primary inline-block">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-fluid">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Why Choose FOODLY?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: '30-45 mins delivery guaranteed' },
              { icon: '🍲', title: 'Fresh Food', desc: 'Hot and fresh meals every time' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing with deals' }
            ].map((feature, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16 bg-neutral-50">
        <div className="container-fluid">
          <h2 className="font-display text-4xl font-bold mb-4">Featured Foods</h2>
          <p className="text-neutral-600 mb-12">Check out our most popular dishes</p>

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

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary">
              View All Foods
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container-fluid text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Browse our full menu and place your order now
          </p>
          <Link to="/menu" className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors inline-block">
            Start Ordering
          </Link>
        </div>
      </section>
    </div>
  )
}
