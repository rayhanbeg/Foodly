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
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-md">
      <div className="container-fluid py-4">
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            FOODLY
          </Link>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-full hover:bg-white transition-colors">
              Home
            </Link>
            <Link to="/menu" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-full hover:bg-white transition-colors">
              Menu
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary rounded-full hover:bg-white transition-colors">
                Admin
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative rounded-full p-2 hover:bg-neutral-100 transition-colors" aria-label="Cart">
                  <span className="text-2xl">🛒</span>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>

                <div className="relative group">
                  <button className="px-4 py-2 rounded-full border border-neutral-200 hover:border-orange-200 text-neutral-700 hover:text-primary transition-colors">
                    Hi, {user?.name?.split(' ')[0] || 'Account'}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 hidden group-hover:block overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-neutral-700 hover:bg-neutral-50"
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
                <Link to="/register" className="btn-primary rounded-full px-5">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-700 rounded-lg p-2 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 rounded-xl border border-neutral-200 bg-white p-4 space-y-3 shadow-sm">
            <Link to="/" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/menu" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Menu
            </Link>

            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>
                <Link to="/profile" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
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
                <Link to="/login" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary block text-center text-sm rounded-full" onClick={() => setIsMenuOpen(false)}>
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
