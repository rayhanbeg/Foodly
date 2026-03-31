import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const navItemClass = ({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
  isActive ? 'bg-white text-primary shadow-sm' : 'text-neutral-700 hover:text-primary hover:bg-white'
}`

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
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

  const handleSearch = (e) => {
    e.preventDefault()
    const value = searchInput.trim()
    navigate(value ? `/menu?search=${encodeURIComponent(value)}` : '/menu')
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-md">
        <div className="container-fluid py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              FOODLY
            </Link>

            <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1">
              <NavLink to="/" className={navItemClass}>Home</NavLink>
              <NavLink to="/menu" className={navItemClass}>Menu</NavLink>
              {isAuthenticated && user?.role === 'admin' && <NavLink to="/admin" className={navItemClass}>Admin</NavLink>}
            </div>

            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 w-full max-w-sm">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search foods..."
                className="input-field !py-2"
              />
              <button type="submit" className="btn-primary !py-2">Search</button>
            </form>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative rounded-full p-2 hover:bg-neutral-100 transition-colors" aria-label="Cart">
                    <span className="text-2xl">🛒</span>
                    {totalQuantity > 0 && <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">{totalQuantity}</span>}
                  </Link>
                  <Link to="/profile" className="px-4 py-2 rounded-full border border-neutral-200 hover:border-orange-200 text-neutral-700 hover:text-primary transition-colors">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </Link>
                  <button onClick={handleLogout} className="btn-outline !py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-neutral-700 hover:text-primary transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary rounded-full px-5">Sign Up</Link>
                </>
              )}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-neutral-700 rounded-lg p-2 hover:bg-neutral-100" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 rounded-xl border border-neutral-200 bg-white p-4 space-y-3 shadow-sm">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search foods" className="input-field !py-2" />
                <button type="submit" className="btn-primary !py-2">Go</button>
              </form>
              <Link to="/profile" className="block text-neutral-700 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              {isAuthenticated && <button onClick={handleLogout} className="w-full text-left text-neutral-700 hover:text-primary">Logout</button>}
            </div>
          )}
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-lg rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-xl shadow-lg">
        <div className="grid grid-cols-3 items-center px-3 py-2 gap-2">
          <div className="flex items-center justify-start gap-3">
            <NavLink to="/" className="text-xs font-semibold text-neutral-700 hover:text-primary">Home</NavLink>
            <NavLink to="/menu" className="text-xs font-semibold text-neutral-700 hover:text-primary">Menu</NavLink>
          </div>
          <button onClick={() => navigate('/menu')} className="mx-auto rounded-full bg-primary text-white h-11 w-11 text-lg shadow-md" aria-label="Search menu">⌕</button>
          <div className="flex items-center justify-end gap-3">
            {isAuthenticated && user?.role === 'admin' && <NavLink to="/admin" className="text-xs font-semibold text-neutral-700 hover:text-primary">Admin</NavLink>}
            <NavLink to={isAuthenticated ? '/cart' : '/login'} className="text-xs font-semibold text-neutral-700 hover:text-primary relative">
              {isAuthenticated ? 'Cart' : 'Login'}
              {isAuthenticated && totalQuantity > 0 && <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] rounded-full min-w-4 h-4 px-1">{totalQuantity}</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
