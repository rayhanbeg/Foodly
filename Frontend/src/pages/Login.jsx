import { useCallback, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice'
import GoogleAuthButton from '../components/GoogleAuthButton'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector(state => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const response = await axiosInstance.post('/auth/login', formData)
      dispatch(loginSuccess(response.data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'))
    }
  }

  const handleGoogleSuccess = useCallback(async (credential) => {
    dispatch(loginStart())

    try {
      const response = await axiosInstance.post('/auth/google', { credential })
      dispatch(loginSuccess(response.data))
      navigate('/')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Google login failed'))
    }
  }, [dispatch, navigate])

  const handleGoogleError = useCallback((message) => {
    dispatch(loginFailure(message || 'Google login failed'))
  }, [dispatch])

  return (
    <div className="container-fluid py-16">
      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-neutral-900">Welcome Back</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-sm text-neutral-500">OR</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <GoogleAuthButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} text="signin_with" />

          <p className="text-center text-neutral-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login
