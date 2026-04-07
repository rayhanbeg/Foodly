import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const navItemClass = ({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
  isActive ? 'bg-white text-primary shadow-sm' : 'text-neutral-700 hover:text-primary hover:bg-white'
}`

const bottomNavItemClass = ({ isActive }) => `flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
  isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-700'
}`

const bottomSearchItemClass = ({ isActive }) => `flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
  isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-700'
} relative -mt-4`

function Navbar() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const value = searchInput.trim()
    navigate(value ? `/menu?search=${encodeURIComponent(value)}` : '/menu')
  }

  const getBottomNavItems = () => {
    const baseItems = [
      { key: 'home', to: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', end: true },
      { key: 'menu', to: '/menu', label: 'Menu', icon: 'M4 6h16M4 12h16M4 18h16', end: false }
    ]

    const authItems = isAuthenticated
      ? [
          { key: 'cart', to: '/cart', label: 'Cart', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', badge: totalQuantity > 0 ? totalQuantity : null },
          {
            key: user?.role === 'admin' ? 'admin' : 'profile',
            to: user?.role === 'admin' ? '/admin' : '/profile',
            label: user?.role === 'admin' ? 'Admin' : 'Profile',
            icon: user?.role === 'admin' ? 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' : 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            end: false
          }
        ]
      : [
          { key: 'login', to: '/login', label: 'Login', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1', end: false },
          { key: 'register', to: '/register', label: 'Sign Up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', end: false }
        ]

    const searchItem = {
      key: 'search',
      to: '/menu',
      label: 'Search',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      isSearch: true,
      end: false
    }

    return [baseItems[0], baseItems[1], searchItem, ...authItems]
  }

  const bottomItems = getBottomNavItems()
  const userFirstName = user?.name?.split(' ')[0] || ''

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur-md">
        <div className="container-fluid mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg md:text-xl text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
            <span className="text-lg md:text-xl lg:text-2xl">🍽️</span>
            FOODLY
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 p-1">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/menu" className={navItemClass}>Menu</NavLink>
            <NavLink to="/about" className={navItemClass}>About</NavLink>
            <NavLink to="/contact" className={navItemClass}>Contact</NavLink>
            <NavLink to="/faq" className={navItemClass}>FAQ</NavLink>
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
                <Link to="/profile" className="px-4 py-2 rounded-full border border-neutral-200 hover:border-amber-200 text-neutral-700 hover:text-primary transition-colors">
                  {userFirstName || 'Account'}
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

          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{userFirstName || 'Profile'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden border-t border-neutral-200/80">
          <div className="container-fluid py-2 flex items-center gap-2 overflow-x-auto">
            <NavLink to="/about" className="px-3 py-1.5 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-100 whitespace-nowrap">About</NavLink>
            <NavLink to="/contact" className="px-3 py-1.5 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-100 whitespace-nowrap">Contact</NavLink>
            <NavLink to="/faq" className="px-3 py-1.5 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-100 whitespace-nowrap">FAQ</NavLink>
            {isAuthenticated ? (
              <NavLink
                to={user?.role === 'admin' ? '/admin' : '/profile'}
                className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white font-semibold whitespace-nowrap"
              >
                {user?.role === 'admin' ? 'Admin' : (userFirstName || 'My Account')}
              </NavLink>
            ) : (
              <NavLink to="/login" className="px-3 py-1.5 text-xs rounded-full bg-neutral-900 text-white font-semibold whitespace-nowrap">Account</NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-2 pt-2 bg-white/95 backdrop-blur-xl border-t border-neutral-200 shadow-lg">
        <div className="max-w-md mx-auto px-2">
          <div className="flex items-center justify-around">
            {bottomItems.map((item) => {
              const Icon = () => (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              )

              const isSearch = item.label === 'Search'
              const linkClass = isSearch ? bottomSearchItemClass : bottomNavItemClass

              return (
                <NavLink key={item.key} to={item.to} className={linkClass} end={item.end}>
                  <div className="relative">
                    {isSearch ? (
                      <div className="w-12 h-12 rounded-full bg-[#E17100] shadow-md flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                    ) : (
                      <Icon />
                    )}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={isSearch ? 'mt-1 text-xs' : ''}>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
