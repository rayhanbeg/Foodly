import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure, filterByCategory, searchFoods } from '../redux/slices/foodSlice'
import FoodCard from '../components/FoodCard'

const categories = [
  { id: 'all', name: 'All' },
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Mains' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'sides', name: 'Sides' }
]

function Menu() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const { filteredFoods, isLoading, currentCategory } = useSelector(state => state.food)

  useEffect(() => {
    const fetchFoods = async () => {
      dispatch(fetchFoodsStart())
      try {
        const response = await axiosInstance.get('/foods')
        dispatch(fetchFoodsSuccess(response.data))
      } catch (error) {
        dispatch(fetchFoodsFailure(error.message))
      }
    }
    fetchFoods()
  }, [dispatch])

  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category))
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchInput(value)
    dispatch(searchFoods(value))
  }

  return (
    <div className="container-fluid py-12">
      <h1 className="font-display text-4xl font-bold mb-8">Our Menu</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchInput}
          onChange={handleSearch}
          className="input-field max-w-md"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Foods Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">Loading foods...</p>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 text-lg">No foods found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map(food => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Menu