import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const desktopNavClass = ({ isActive }) => `inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
  isActive ? 'bg-[#fff7ea] text-[#0f1724]' : 'text-[#9ca3af] hover:bg-white/70 hover:text-[#0f1724]'
}`

const bottomNavItemClass = ({ isActive }) =>
  `flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
    isActive ? 'text-[#E5A100]' : 'text-[#8b95a5]'
  }`


const HomeIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 11.5 12 4l9 7.5M5.5 10.5V20h5v-5h3v5h5V10.5" />
  </svg>
)

const MenuIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

const SearchIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
  </svg>
)

const UserIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 20a8 8 0 0 1 16 0" />
  </svg>
)

const CartIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5h2l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.7L20 8H7" />
    <circle cx="10" cy="19" r="1.2" fill="currentColor" />
    <circle cx="17" cy="19" r="1.2" fill="currentColor" />
  </svg>
)


const LoginIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 16l4-4-4-4M19 12H9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
  </svg>
)

const LogoutIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 16l4-4-4-4M19 12H9M12 19v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
  </svg>
)

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
      { key: 'home', to: '/', label: 'Home', end: true, icon: HomeIcon },
      { key: 'menu', to: '/menu', label: 'Menu', end: false, icon: MenuIcon },
      { key: 'search', to: '/menu', label: 'Search', end: false, icon: SearchIcon, isSearch: true },
    ]

    if (isAuthenticated) {
      return [
        ...baseItems,
        { key: 'cart', to: '/cart', label: 'Cart', end: false, icon: CartIcon, badge: totalQuantity > 0 ? totalQuantity : null },
        {
          key: user?.role === 'admin' ? 'admin' : 'profile',
          to: user?.role === 'admin' ? '/admin' : '/profile',
          label: user?.role === 'admin' ? 'Admin' : 'Profile',
          end: false,
          icon: UserIcon,
        },
      ]
    }

    return [...baseItems, { key: 'login', to: '/login', label: 'Login', end: false, icon: LoginIcon }, { key: 'register', to: '/register', label: 'Sign Up', end: false, icon: UserIcon }]
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
                <SearchIcon className="h-[18px] w-[18px] shrink-0" />
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
                  <CartIcon className="text-xl" />
                  {totalQuantity > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffb400] px-1 text-xs font-bold text-[#0f1724]">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
                <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[#0f1724] hover:text-black">
                  <UserIcon className="text-base" />
                  {user?.name?.split(' ')[0] || 'Account'}
                </Link>
                <button onClick={handleLogout} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0f1724] px-5 text-sm font-medium text-[#fef9f2] transition hover:opacity-90">
                  Logout
                  <LogoutIcon className="text-lg" />
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

      <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md md:hidden">
        <div className="container-fluid flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-[#0f1724]">
            <span className="text-xl">🍽️</span>
            FOODLY
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/profile'}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-[#0f1724]"
                >
                  <UserIcon className="text-sm" />
                  {user?.name?.split(' ')[0] || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0f1724] px-3 py-1.5 text-xs font-semibold text-[#fef9f2]"
                >
                  Logout
                  <LogoutIcon className="text-sm" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="inline-flex rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-[#0f1724]">Login</Link>
                <Link to="/register" className="inline-flex rounded-full bg-[#0f1724] px-3 py-1.5 text-xs font-semibold text-[#fef9f2]">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#d7dbe2] bg-[#f3f4f6] pb-2 pt-1.5 shadow-[0_-3px_14px_rgba(15,23,36,0.06)] md:hidden">
        <div className="mx-auto grid max-w-[360px] grid-cols-5 items-end px-2">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isSearch = item.isSearch

            return (
              <NavLink key={item.key} to={item.to} className={bottomNavItemClass} end={item.end}>
                {({ isActive }) => (
                  <>
                    <div className="relative flex items-center justify-center">
                      {isSearch ? (
                        <span className="-mt-5 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#f3b000] text-[#111827] shadow-[0_5px_10px_rgba(0,0,0,0.22)] ring-4 ring-[#f3f4f6]">
                          <Icon className="text-[22px]" />
                        </span>
                      ) : (
                        <>
                          <Icon className={`text-[22px] ${isActive ? 'text-[#E5A100]' : 'text-[#8b95a5]'}`} />
                          {item.badge && (
                            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f3b000] px-1 text-[10px] font-bold text-[#111827]">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <span className={`mt-0.5 ${isActive ? 'text-[#E5A100]' : 'text-[#8b95a5]'}`}>{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Navbar
