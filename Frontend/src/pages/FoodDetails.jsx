import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { setSelectedFood } from '../redux/slices/foodSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { formatBDT } from '../utils/currency'
import { Star, ShoppingCart, ChevronLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react'

function FoodDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const selectedFood = useSelector(state => state.food.selectedFood)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get(`/foods/${id}`)
        dispatch(setSelectedFood(response.data))
        setImageError(false)
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

    if (!reviewData.comment.trim()) {
      setReviewError('Please write a review comment')
      return
    }

    try {
      setIsSubmittingReview(true)
      setReviewError('')
      await axiosInstance.post(`/foods/${id}/reviews`, { 
        rating: reviewData.rating, 
        comment: reviewData.comment.trim() 
      })
      setReviewData({ rating: 5, comment: '' })
      setShowReviewForm(false)
      setHoverRating(0)
      const response = await axiosInstance.get(`/foods/${id}`)
      dispatch(setSelectedFood(response.data))
    } catch (error) {
      console.error('Failed to add review:', error)
      setReviewError(error.response?.data?.message || 'Review submission failed')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-neutral-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-neutral-200 rounded-2xl aspect-[4/3] w-full"></div>
              <div className="space-y-6">
                <div className="h-8 w-3/4 bg-neutral-200 rounded-lg"></div>
                <div className="h-24 w-full bg-neutral-200 rounded-lg"></div>
                <div className="h-16 w-full bg-neutral-200 rounded-lg"></div>
                <div className="h-12 w-full bg-neutral-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedFood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg">Food item not found</p>
          <button onClick={() => navigate('/menu')} className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 px-6 rounded-xl mt-6 transition-colors">
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  const averageRating = selectedFood.rating || 
    (selectedFood.reviews?.length > 0 
      ? selectedFood.reviews.reduce((sum, r) => sum + r.rating, 0) / selectedFood.reviews.length 
      : 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/menu')}
          className="group inline-flex items-center gap-2 text-neutral-600 hover:text-amber-600 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Menu
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Responsive Image Section */}
          <div className="flex justify-center items-start">
            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
              <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={imageError ? '/placeholder-food.jpg' : selectedFood.image}
                  alt={selectedFood.name}
                  className="w-full aspect-[4/3] object-cover"
                  onError={() => setImageError(true)}
                />
                {/* Availability Badge */}
                {selectedFood.available ? (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Available
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Unavailable
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-3xl border border-neutral-100 p-6 md:p-8">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                {selectedFood.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  ({selectedFood.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
              {selectedFood.name}
            </h1>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              {selectedFood.description}
            </p>

            {/* Price & Prep Time */}
            <div className="mt-6 flex items-center justify-between border-y border-neutral-100 py-5">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Price</p>
                <p className="text-4xl font-bold text-neutral-900 tracking-tight">
                  {formatBDT(selectedFood.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500 mb-1">Prep Time</p>
                <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{selectedFood.prepTimeMinutes || 25} mins</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-700 mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:border-amber-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:border-amber-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            {selectedFood.available ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3.5 rounded-xl mt-6 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart • {formatBDT(selectedFood.price * quantity)}
              </button>
            ) : (
              <div className="w-full bg-neutral-100 text-neutral-500 font-medium py-3.5 rounded-xl mt-6 text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Currently Unavailable
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 border-t border-neutral-200 pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Customer Reviews
            </h2>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors"
              >
                {isAuthenticated ? 'Write a Review' : 'Login to Review'}
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="overflow-hidden mb-8">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Share your experience</h3>
                <div className="space-y-5">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewData({ ...reviewData, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || reviewData.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Your Review</label>
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      className="w-full border border-neutral-300 rounded-xl p-3 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      rows="4"
                      placeholder="What did you think about this dish? Share your experience..."
                    />
                  </div>

                  {reviewError && (
                    <p className="text-sm text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {reviewError}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddReview}
                      disabled={isSubmittingReview}
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      onClick={() => {
                        setShowReviewForm(false)
                        setReviewError('')
                        setReviewData({ rating: 5, comment: '' })
                        setHoverRating(0)
                      }}
                      className="px-6 py-2.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-5">
            {selectedFood.reviews && selectedFood.reviews.length > 0 ? (
              selectedFood.reviews.map((review, idx) => (
                <article
                  key={`${review.userName}-${review.createdAt}-${idx}`}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-neutral-900">{review.userName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                </article>
              ))
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-200">
                <Star className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-neutral-600">No reviews yet. Be the first to review this dish!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FoodDetails