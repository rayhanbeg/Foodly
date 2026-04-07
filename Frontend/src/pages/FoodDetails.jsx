import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'
import { setSelectedFood } from '../redux/slices/foodSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { formatBDT } from '../utils/currency'
void motion

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
      } catch (error) {
        console.error('Failed to fetch food:', error)
        navigate('/menu')
      } finally {
        setIsLoading(false)
      }
    }
    fetchFood()
  }, [id, dispatch, navigate])

  const handleAddToCart = () => {
    if (!selectedFood) return
    dispatch(addToCart({
      id: selectedFood._id,
      name: selectedFood.name,
      price: selectedFood.price,
      image: selectedFood.image,
      quantity
    }))
    navigate('/cart')
  }

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setReviewError('')
      await axiosInstance.post(`/foods/${id}/reviews`, { ...reviewData })
      setReviewData({ rating: 5, comment: '' })
      setShowReviewForm(false)
      const response = await axiosInstance.get(`/foods/${id}`)
      dispatch(setSelectedFood(response.data))
    } catch (error) {
      console.error('Failed to add review:', error)
      setReviewError(error.response?.data?.message || 'Review submission failed')
    }
  }

  if (isLoading) return <div className="container-fluid py-12 text-center">Loading...</div>
  if (!selectedFood) return <div className="container-fluid py-12 text-center">Food not found</div>

  return (
    <div className="container-fluid py-12">
      <button onClick={() => navigate('/menu')} className="text-neutral-700 hover:text-amber-600 mb-8 font-medium">← Back to Menu</button>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-[420px] md:h-[520px] object-cover rounded-3xl border border-neutral-200" />

        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-700">{selectedFood.category}</span>
            <span className="text-sm text-neutral-600">⭐ {selectedFood.rating ? selectedFood.rating.toFixed(1) : 'N/A'} ({selectedFood.reviews?.length || 0} reviews)</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{selectedFood.name}</h1>
          <p className="mt-4 text-neutral-600">{selectedFood.description}</p>

          <div className="mt-6 flex items-end justify-between border-y border-neutral-200 py-5">
            <div>
              <p className="text-sm text-neutral-500">Price</p>
              <p className="text-3xl font-bold text-neutral-900">{formatBDT(selectedFood.price)}</p>
            </div>
            <p className="text-sm text-neutral-500">Prep time: {selectedFood.prepTimeMinutes || 25} mins</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn-outline !px-4">-</button>
            <span className="w-10 text-center text-lg font-semibold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="btn-outline !px-4">+</button>
          </div>

          {selectedFood.available ? (
            <button onClick={handleAddToCart} className="w-full btn-primary mt-6 py-3 text-lg">Add to Cart • {formatBDT(selectedFood.price * quantity)}</button>
          ) : (
            <div className="w-full bg-neutral-200 text-neutral-600 py-3 mt-6 rounded-lg text-center">Not Available</div>
          )}
        </div>
      </motion.div>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Customer Reviews</h2>

        {!showReviewForm && <button onClick={() => setShowReviewForm(true)} className="btn-primary mb-8">{isAuthenticated ? 'Write a review' : 'Login to review'}</button>}

        {showReviewForm && (
          <div className="card p-6 mb-8 border border-neutral-200">
            <div className="space-y-4">
              <select value={reviewData.rating} onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value, 10) })} className="input-field">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
              <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} className="input-field" rows="4" placeholder="Your review..." />
              {reviewError && <p className="text-sm text-red-500">{reviewError}</p>}
              <div className="flex gap-3">
                <button onClick={handleAddReview} className="btn-primary">Submit</button>
                <button onClick={() => setShowReviewForm(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {selectedFood.reviews && selectedFood.reviews.length > 0 ? (
            selectedFood.reviews.map((review, idx) => (
              <article key={`${review.userName}-${review.createdAt}-${idx}`} className="bg-white rounded-2xl border border-neutral-200 p-5">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <div>
                    <p className="font-semibold text-neutral-900">{review.userName}</p>
                    <p className="text-sm text-amber-600">{'★'.repeat(review.rating)}</p>
                  </div>
                  <span className="text-sm text-neutral-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-neutral-700">{review.comment}</p>
              </article>
            ))
          ) : (
            <p className="text-neutral-600">No reviews yet. Be the first to review.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default FoodDetails
