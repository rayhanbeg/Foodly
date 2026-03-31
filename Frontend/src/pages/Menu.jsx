import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure } from '../redux/slices/foodSlice'
import FoodCard from '../components/FoodCard'

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
        dispatch(fetchFoodsSuccess(response.data))
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
    <div className="container-fluid py-12">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Our Menu</h1>
          <p className="text-neutral-500 mt-2">Smart search & sorting with shareable URLs.</p>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[320px]">
          <input
            type="text"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="card p-4 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-neutral-600">Sort:</label>
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="input-field !w-auto !py-2"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">Loading foods...</p>
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">No foods found. Try a different search, sort, or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foods.map(food => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu
