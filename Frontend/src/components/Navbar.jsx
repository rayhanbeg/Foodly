import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const desktopNavClass = ({ isActive }) => `inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
  isActive ? 'bg-[#fff7ea] text-[#0f1724]' : 'text-[#9ca3af] hover:bg-white/70 hover:text-[#0f1724]'
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)

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
      { key: 'menu', to: '/menu', label: 'Menu', icon: 'M4 6h16M4 12h16M4 18h16', end: false },
    ]

    const authItems = isAuthenticated
      ? [
          { key: 'cart', to: '/cart', label: 'Cart', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', badge: totalQuantity > 0 ? totalQuantity : null },
          {
            key: user?.role === 'admin' ? 'admin' : 'profile',
            to: user?.role === 'admin' ? '/admin' : '/profile',
            label: user?.role === 'admin' ? 'Admin' : 'Profile',
            icon: user?.role === 'admin' ? 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' : 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
            end: false,
          },
        ]
      : [
          { key: 'login', to: '/login', label: 'Login', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1', end: false },
          { key: 'register', to: '/register', label: 'Sign Up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', end: false },
        ]

    const searchItem = {
      key: 'search',
      to: '/menu',
      label: 'Search',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      isSearch: true,
      end: false,
    }

    return [baseItems[0], baseItems[1], searchItem, ...authItems]
  }

  const bottomItems = getBottomNavItems()

  return (
    <>
      <nav className="sticky top-0 z-40 hidden w-full bg-[#fef9f2] px-4 pb-0 pt-5 md:block lg:px-8">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-5 rounded-full border border-black/10 bg-white/80 px-[18px] py-[14px] backdrop-blur-md">
          <Link to="/" className="flex min-w-0 items-center gap-3 whitespace-nowrap">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffb400] text-lg font-bold text-[#0f1724]">🍽</span>
            <span className="min-w-0">
              <span className="block text-base font-bold leading-none tracking-[-0.02em] text-[#0f1724]">FOODLY</span>
              <span className="block pt-0.5 text-xs font-medium leading-none text-[#9ca3af]">Fresh meals, delivered fast</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <NavLink to="/" end className={desktopNavClass}>Home</NavLink>
            <NavLink to="/menu" className={desktopNavClass}>Menu</NavLink>
            <NavLink to="/about" className={desktopNavClass}>About</NavLink>
            <NavLink to="/contact" className={desktopNavClass}>Contact</NavLink>
            <NavLink to="/faq" className={desktopNavClass}>FAQ</NavLink>
            {isAuthenticated && user?.role === 'admin' && <NavLink to="/admin" className={desktopNavClass}>Admin</NavLink>}
          </div>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <form onSubmit={handleSearch} className="hidden items-center md:flex">
              <label htmlFor="desktop-search" className="sr-only">Search dishes and cuisines</label>
              <div className="flex h-11 min-w-[220px] items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-[#9ca3af]">
                <svg className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="desktop-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search dishes, cuisines..."
                  className="w-full bg-transparent text-sm text-[#0f1724] placeholder:text-[#9ca3af] focus:outline-none"
                />
              </div>
            </form>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative inline-flex rounded-full p-2 text-[#0f1724] hover:bg-white/70" aria-label="Cart">
                  <span className="text-xl">🛒</span>
                  {totalQuantity > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffb400] px-1 text-xs font-bold text-[#0f1724]">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
                <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-[#0f1724] hover:text-black">
                  {user?.name?.split(' ')[0] || 'Account'}
                </Link>
                <button onClick={handleLogout} className="inline-flex h-11 items-center rounded-full bg-[#0f1724] px-5 text-sm font-medium text-[#fef9f2] transition hover:opacity-90">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-[#0f1724] hover:text-black">Login</Link>
                <Link to="/register" className="inline-flex h-11 items-center rounded-full bg-[#0f1724] px-5 text-sm font-medium text-[#fef9f2] transition hover:opacity-90">Create Account</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <nav className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur-md md:hidden">
        <div className="container-fluid flex items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary">
            <span className="text-2xl">🍽️</span>
            FOODLY
          </Link>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <label htmlFor="mobile-search" className="sr-only">Search foods</label>
            <input
              id="mobile-search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
              className="w-28 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs focus:outline-none"
            />
          </form>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 pb-2 pt-2 shadow-lg backdrop-blur-xl">
        <div className="mx-auto max-w-md px-2">
          <div className="flex items-center justify-around">
            {bottomItems.map((item) => {
              const Icon = () => (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              )

              const isSearch = item.label === 'Search'
              const linkClass = isSearch ? bottomSearchItemClass : bottomNavItemClass

              return (
                <NavLink key={item.key} to={item.to} className={linkClass} end={item.end}>
                  <div className="relative">
                    {isSearch ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E17100] text-white shadow-md">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                    ) : (
                      <Icon />
                    )}
                    {item.badge && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white">
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
