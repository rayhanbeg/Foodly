import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-fluid py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-display text-2xl font-bold text-primary">
            FOODLY
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-neutral-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/menu" className="text-neutral-700 hover:text-primary transition-colors">
              Menu
            </Link>

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-neutral-700 hover:text-primary transition-colors">
                Admin
              </Link>
            )}

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative">
                    <span className="text-2xl">🛒</span>
                    {totalQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>
                  <div className="relative group">
                    <button className="text-neutral-700 hover:text-primary transition-colors">
                      {user?.name || 'Account'}
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-t-lg"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-b-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-neutral-700 hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-neutral-200 pt-4 space-y-3">
            <Link to="/" className="block text-neutral-700 hover:text-primary">
              Home
            </Link>
            <Link to="/menu" className="block text-neutral-700 hover:text-primary">
              Menu
            </Link>

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="block text-neutral-700 hover:text-primary">
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="block text-neutral-700 hover:text-primary">
                  Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>
                <Link to="/profile" className="block text-neutral-700 hover:text-primary">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-neutral-700 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-neutral-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary block text-center text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
