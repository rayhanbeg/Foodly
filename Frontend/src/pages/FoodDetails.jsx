import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { setSelectedFood } from '../redux/slices/foodSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { formatBDT } from '../utils/currency'

function FoodDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const selectedFood = useSelector(state => state.food.selectedFood)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewError, setReviewError] = useState('')

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get(`/foods/${id}`)
        dispatch(setSelectedFood(response.data))
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch food:', error)
        setIsLoading(false)
        navigate('/menu')
      }
    }
    fetchFood()
  }, [id, dispatch, navigate])

  const handleAddToCart = () => {
    if (selectedFood) {
      dispatch(addToCart({
        id: selectedFood._id,
        name: selectedFood.name,
        price: selectedFood.price,
        image: selectedFood.image,
        branchCode: selectedFood.branchCode,
        branchName: selectedFood.branchName,
        quantity
      }))
      navigate('/cart')
    }
  }

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setReviewError('')
      await axiosInstance.post(`/foods/${id}/reviews`, {
        ...reviewData
      })
      setReviewData({ rating: 5, comment: '' })
      setShowReviewForm(false)

      const response = await axiosInstance.get(`/foods/${id}`)
      dispatch(setSelectedFood(response.data))
    } catch (error) {
      console.error('Failed to add review:', error)
      setReviewError(error.response?.data?.message || 'Review submission failed')
    }
  }

  if (isLoading) {
    return <div className="container-fluid py-12 text-center">Loading...</div>
  }

  if (!selectedFood) {
    return <div className="container-fluid py-12 text-center">Food not found</div>
  }

  return (
    <div className="container-fluid py-12">
      <button
        onClick={() => navigate('/menu')}
        className="text-primary hover:underline mb-8 font-medium"
      >
        ← Back to Menu
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div>
          <img
            src={selectedFood.image}
            alt={selectedFood.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-4xl font-bold mb-4">{selectedFood.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-lg">
                {selectedFood.rating ? selectedFood.rating.toFixed(1) : 'N/A'}
              </span>
              <span className="text-neutral-600">
                ({selectedFood.reviews?.length || 0} reviews)
              </span>
            </div>
            <span className="bg-neutral-200 text-neutral-700 px-4 py-2 rounded-full font-semibold">
              {selectedFood.category}
            </span>
          </div>
          <p className="text-neutral-600 mb-6">
            Prepared at <span className="font-semibold">{selectedFood.branchName}</span> • Estimated prep time {selectedFood.prepTimeMinutes || 25} mins
          </p>

          <p className="text-neutral-700 text-lg mb-6">
            {selectedFood.description}
          </p>

          <div className="mb-8">
            <p className="text-neutral-600 mb-2">Price:</p>
            <p className="font-display text-4xl font-bold text-primary">
              {formatBDT(selectedFood.price)}
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-neutral-700 font-semibold mb-3">Quantity:</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn-outline w-10 h-10 flex items-center justify-center"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn-outline w-10 h-10 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {selectedFood.available ? (
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-3 text-lg font-semibold mb-4"
            >
              Add to Cart - {formatBDT(selectedFood.price * quantity)}
            </button>
          ) : (
            <div className="w-full bg-neutral-300 text-neutral-600 py-3 text-lg font-semibold rounded-lg text-center">
              Not Available
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-neutral-200 pt-12">
        <h2 className="font-display text-3xl font-bold mb-8">Reviews</h2>

        {!showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn-primary mb-8"
          >
            {isAuthenticated ? 'Add Your Review' : 'Login to Review'}
          </button>
        )}

        {showReviewForm && (
          <div className="card p-6 mb-8">
            <h3 className="font-bold text-lg mb-1">Add Your Review</h3>
            <p className="text-sm text-neutral-500 mb-3">Only verified users with a delivered purchase can submit ratings.</p>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Rating</label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
                  className="input-field"
                >
                  {[5, 4, 3, 2, 1].map(r => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  className="input-field"
                  rows="4"
                  placeholder="Your review..."
                />
              </div>
              {reviewError && <p className="text-sm text-red-500">{reviewError}</p>}
              <div className="flex gap-4">
                <button
                  onClick={handleAddReview}
                  className="btn-primary"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {selectedFood.reviews && selectedFood.reviews.length > 0 ? (
            selectedFood.reviews.map((review, idx) => (
              <div key={idx} className="card p-4 border border-neutral-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-neutral-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-neutral-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-neutral-600">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default FoodDetails
