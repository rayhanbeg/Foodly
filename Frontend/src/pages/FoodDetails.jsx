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
  const [imageErrors, setImageErrors] = useState({})
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
        setImageErrors({})
      } catch (error) {
        console.error('Failed to fetch food:', error)
        navigate('/menu')
      } finally {
        setIsLoading(false)
      }
    }
    fetchFood()
  }, [id, dispatch, navigate])

  useEffect(() => {
    if (typeof window === 'undefined' || window.customElements?.get('swiper-container')) return

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="animate-pulse">
            <div className="h-5 w-28 bg-neutral-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              <div className="bg-neutral-200 rounded-2xl aspect-[4/3] w-full"></div>
              <div className="space-y-4">
                <div className="h-6 w-2/3 bg-neutral-200 rounded"></div>
                <div className="h-20 w-full bg-neutral-200 rounded"></div>
                <div className="h-14 w-full bg-neutral-200 rounded"></div>
                <div className="h-11 w-full bg-neutral-200 rounded"></div>
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
          <AlertCircle className="w-14 h-14 text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600 text-sm">Food item not found</p>
          <button onClick={() => navigate('/menu')} className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-5 rounded-lg mt-5 transition-colors text-sm">
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
  const imageGallery = Array.isArray(selectedFood.images) && selectedFood.images.length > 0
    ? selectedFood.images
    : [selectedFood.image].filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/menu')}
          className="group inline-flex items-center gap-1.5 text-neutral-600 hover:text-amber-600 font-medium mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Menu
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Image Section */}
          <div className="flex justify-center items-start">
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                <swiper-container
                  slides-per-view="1"
                  space-between="12"
                  navigation="true"
                  pagination="true"
                  loop={imageGallery.length > 1}
                  className="block w-full"
                >
                  {imageGallery.map((image, idx) => (
                    <swiper-slide key={`${image}-${idx}`}>
                      <img
                        src={imageErrors[idx] ? '/placeholder-food.jpg' : image}
                        alt={`${selectedFood.name} - image ${idx + 1}`}
                        className="w-full aspect-[4/3] object-cover"
                        onError={() => setImageErrors((prev) => ({ ...prev, [idx]: true }))}
                      />
                    </swiper-slide>
                  ))}
                </swiper-container>
                {/* Availability Badge */}
                {selectedFood.available ? (
                  <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Available
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Unavailable
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 md:p-6 shadow-sm">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                {selectedFood.category}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">
                  ({selectedFood.reviews?.length || 0})
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-lg md:text-xl font-semibold text-neutral-900 leading-snug">
              {selectedFood.name}
            </h1>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              {selectedFood.description}
            </p>

            {/* Price & Prep Time */}
            <div className="mt-5 flex items-center justify-between border-y border-neutral-100 py-4">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Price</p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
                  {formatBDT(selectedFood.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 mb-1">Prep Time</p>
                <div className="flex items-center gap-1 text-neutral-700 font-medium text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedFood.prepTimeMinutes || 25} mins</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5">
              <p className="text-xs font-medium text-neutral-700 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:border-amber-200 transition-colors text-sm"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-base font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:border-amber-200 transition-colors text-sm"
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
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl mt-5 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart • {formatBDT(selectedFood.price * quantity)}
              </button>
            ) : (
              <div className="w-full bg-neutral-100 text-neutral-500 font-medium py-3 rounded-xl mt-5 text-center flex items-center justify-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                Currently Unavailable
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-14 border-t border-neutral-200 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-base md:text-lg font-semibold text-neutral-900">
              Customer Reviews
            </h2>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                {isAuthenticated ? 'Write a Review' : 'Login to Review'}
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">Share your experience</h3>
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">Rating</label>
                    <div className="flex items-center gap-1">
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
                            className={`w-6 h-6 ${
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
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">Your Review</label>
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      className="w-full border border-neutral-300 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      rows="4"
                      placeholder="What did you think about this dish? Share your experience..."
                    />
                  </div>

                  {reviewError && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {reviewError}
                    </p>
                  )}

                  <div className="flex gap-2.5">
                    <button
                      onClick={handleAddReview}
                      disabled={isSubmittingReview}
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="px-5 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-lg font-medium text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {selectedFood.reviews && selectedFood.reviews.length > 0 ? (
              selectedFood.reviews.map((review, idx) => (
                <article
                  key={`${review.userName}-${review.createdAt}-${idx}`}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{review.userName}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
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
                  <p className="text-sm text-neutral-700 leading-relaxed">{review.comment}</p>
                </article>
              ))
            ) : (
              <div className="text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-200">
                <Star className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                <p className="text-sm text-neutral-600">No reviews yet. Be the first to review this dish!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FoodDetails