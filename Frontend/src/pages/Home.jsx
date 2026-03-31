import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure } from '../redux/slices/foodSlice'
import FoodCard from '../components/FoodCard'

const highlights = [
  { label: 'Fast delivery', value: '30-45 min' },
  { label: 'Happy customers', value: '25k+' },
  { label: 'Restaurants', value: '200+' }
]

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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white py-24">
        <div className="container-fluid relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/20 mb-5">
                🔥 Trending now in your city
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Cravings delivered
                <span className="block text-orange-100">fresh, fast, and hot.</span>
              </h1>
              <p className="text-lg text-orange-100 mb-8 max-w-xl">
                Browse top-rated meals from local kitchens and get your favorites delivered to your door in minutes.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/menu" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                  Explore Menu
                </Link>
                <Link to="/register" className="border border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Create Account
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                {highlights.map(item => (
                  <div key={item.label} className="bg-white/15 rounded-xl p-3 text-center">
                    <p className="font-bold text-xl">{item.value}</p>
                    <p className="text-xs text-orange-100">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80"
                  alt="Food bowl"
                  className="w-full h-[420px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-fluid">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Why FOODLY works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning delivery', desc: 'Real-time rider tracking and fastest routes.' },
              { icon: '🍱', title: 'Freshly prepared', desc: 'Partner kitchens prepare every order on demand.' },
              { icon: '🏷️', title: 'Smart deals', desc: 'Get exclusive discounts and loyalty rewards.' }
            ].map((feature, i) => (
              <div key={i} className="card p-8 text-center border border-orange-100 hover:border-orange-200">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-fluid">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Featured Foods</h2>
              <p className="text-neutral-600">Most-loved dishes from our customers this week.</p>
            </div>
            <Link to="/menu" className="hidden md:inline-flex text-primary font-semibold hover:underline">See full menu →</Link>
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

      <section className="bg-secondary text-white py-16">
        <div className="container-fluid text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready for your next bite?</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Sign up, pick your meal, and track your order from kitchen to doorstep.
          </p>
          <Link to="/menu" className="bg-white text-secondary px-8 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors inline-block">
            Start Ordering
          </Link>
        </div>
      </section>
    </div>
  )
}
