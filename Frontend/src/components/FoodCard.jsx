import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { formatBDT } from '../utils/currency'

export default function FoodCard({ food }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: food._id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1
    }))
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatBDT(food.price)}
        </div>
      </div>

      <div className="p-4">
        <Link to={`/food/${food._id}`} className="hover:text-primary transition-colors">
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
            {food.name}
          </h3>
        </Link>

        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {food.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-semibold text-neutral-700">
              {food.rating ? food.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
          <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-1 rounded">
            {food.category}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary text-sm"
          >
            Add to Cart
          </button>
          <Link
            to={`/food/${food._id}`}
            className="flex-1 btn-outline text-sm text-center"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
