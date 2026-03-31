import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { fetchFoodsStart, fetchFoodsSuccess, fetchFoodsFailure } from '../redux/slices/foodSlice'
import HeroSection from '../components/home/HeroSection'
import WhyFoodlySection from '../components/home/WhyFoodlySection'
import FeaturedFoodsSection from '../components/home/FeaturedFoodsSection'
import CtaSection from '../components/home/CtaSection'

function Home() {
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
      <HeroSection />
      <WhyFoodlySection />
      <FeaturedFoodsSection foods={foods} isLoading={isLoading} />
      <CtaSection />
    </div>
  )
}
export default Home