import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure } from '../redux/slices/foodSlice'
import FoodCard from '../components/FoodCard'
import SkeletonCard from '../components/SkeletonCard'
void motion

const categories = [
  { id: 'all', name: 'All' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Mains' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'sides', name: 'Sides' }
]

const sortOptions = [
  { id: 'newest', name: 'Newest' },
  { id: 'rating', name: 'Top Rated' },
  { id: 'price_asc', name: 'Price: Low to High' },
  { id: 'price_desc', name: 'Price: High to Low' },
  { id: 'name_asc', name: 'Name: A-Z' }
]

function Menu() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { foods, isLoading } = useSelector(state => state.food)

  const category = searchParams.get('category') || 'all'
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'newest'

  useEffect(() => {
    const fetchFoods = async () => {
      dispatch(fetchFoodsStart())
      try {
        const response = await axiosInstance.get('/foods', {
          params: {
            ...(category !== 'all' && { category }),
            ...(search && { search }),
            sort
          }
        })
        const foodData = Array.isArray(response.data) ? response.data : response.data.foods || []
        dispatch(fetchFoodsSuccess(foodData))
      } catch (error) {
        dispatch(fetchFoodsFailure(error.message))
      }
    }

    fetchFoods()
  }, [dispatch, category, search, sort])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all' || (key === 'sort' && value === 'newest')) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next)
  }

  return (
    <div className="container-fluid py-12 md:py-16">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 mb-8">
        <p className="text-xs tracking-[0.16em] text-amber-600 font-semibold">MENU</p>
        <h1 className="mt-2 text-xl md:text-3xl font-bold text-neutral-900">Find your next favorite meal.</h1>
        <p className="mt-3 text-sm md:text-base text-neutral-600">Filter by category, search quickly, and sort exactly the way you want.</p>

        <div className="mt-6 grid lg:grid-cols-[1fr_auto] gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
            className="input-field"
          />
          <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="input-field lg:w-56">
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat.id ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-12 text-neutral-600 text-base">No foods found. Try different filters.</div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {foods.map(food => (
            <motion.div key={food._id} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
              <FoodCard food={food} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Menu
