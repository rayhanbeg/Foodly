import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  PiShoppingCartSimpleBold,
  PiHouse,
  PiList,
  PiMagnifyingGlass,
  PiShoppingCartSimple,
  PiUser,
  PiSignIn,
  PiUserPlus,
} from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

// ===== desktop link class – active gets a solid background =====
const desktopNavClass = ({ isActive }) =>
  `inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md ${
    isActive
      ? "bg-amber-500 text-white shadow-sm"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
  }`;

// ===== bottom‑nav link class – active gets a subtle background pill =====
const bottomNavItemClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
    isActive
      ? "text-amber-600 bg-amber-50 rounded-full px-2 py-1"
      : "text-neutral-500 hover:text-neutral-700"
  }`;

// ===== search item in bottom nav – same styling plus negative margin =====
const bottomSearchItemClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
    isActive
      ? "text-amber-600 bg-amber-50 rounded-full px-2 py-1"
      : "text-neutral-500 hover:text-neutral-700"
  } relative -mt-4`;

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = searchInput.trim();
    navigate(value ? `/menu?search=${encodeURIComponent(value)}` : "/menu");
  };

  const getBottomNavItems = () => {
    const baseItems = [
      {
        key: "home",
        to: "/",
        label: "Home",
        icon: <PiHouse className="text-lg" />,
        end: true,
      },
      {
        key: "menu",
        to: "/menu",
        label: "Menu",
        icon: <PiList className="text-lg" />,
        end: false,
      },
    ];

    const authItems = isAuthenticated
      ? [
          {
            key: "cart",
            to: "/cart",
            label: "Cart",
            icon: <PiShoppingCartSimple className="text-lg" />,
            badge: totalQuantity > 0 ? totalQuantity : null,
          },
          {
            key: "profile",
            to: "/profile",
            label: "Profile",
            icon: <PiUser className="text-lg" />,
            end: false,
          },
        ]
      : [
          {
            key: "login",
            to: "/login",
            label: "Login",
            icon: <PiSignIn className="text-lg" />,
            end: false,
          },
          {
            key: "register",
            to: "/register",
            label: "Sign Up",
            icon: <PiUserPlus className="text-lg" />,
            end: false,
          },
        ];

    const searchItem = {
      key: "search",
      to: "/menu",
      label: "Search",
      icon: (
        <div className="flex items-center justify-center w-12 h-12 -mt-4 bg-amber-500 rounded-full shadow-lg">
          <PiMagnifyingGlass className="text-xl text-white" />
        </div>
      ),
      isSearch: true,
      end: false,
    };

    return [baseItems[0], baseItems[1], searchItem, ...authItems];
  };

  const bottomItems = getBottomNavItems();

  return (
    <>
      {/* ===== Desktop Navigation ===== */}
      <nav className="sticky top-0 z-40 hidden md:block bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffb400] text-lg font-bold text-[#0f1724]">
                🍽
              </span>
              <span className="hidden lg:block">
                <span className="block text-base font-bold leading-none text-[#0f1724]">
                  FOODLY
                </span>
                <span className="block text-xs text-neutral-400">
                  Fresh meals, delivered fast
                </span>
              </span>
            </Link>

            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" end className={desktopNavClass}>
                Home
              </NavLink>
              <NavLink to="/menu" className={desktopNavClass}>
                Menu
              </NavLink>
              <NavLink to="/about" className={desktopNavClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={desktopNavClass}>
                Contact
              </NavLink>
              <NavLink to="/faq" className={desktopNavClass}>
                FAQ
              </NavLink>
              {isAuthenticated && user?.role === "admin" && (
                <NavLink to="/admin" className={desktopNavClass}>
                  Admin
                </NavLink>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Search bar */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="flex h-9 items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm">
                  <svg
                    className="h-4 w-4 shrink-0 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    id="desktop-search"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search dishes..."
                    className="w-32 lg:w-48 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
              </form>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="relative p-2 text-neutral-700 hover:text-primary"
                  >
                    <PiShoppingCartSimpleBold className="text-xl" />
                    {totalQuantity > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb400] text-[10px] font-bold text-black">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-primary"
                  >
                    <FaUserCircle className="text-lg" />
                    <span className="hidden lg:inline">
                      {user?.name?.split(" ")[0] || "Account"}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-md bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
                  >
                    <IoLogOutOutline className="text-base" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-neutral-700 hover:text-primary hidden lg:inline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-md bg-[#ffb400] px-4 py-2 text-sm font-semibold text-black hover:brightness-95 transition"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Top Navigation (simplified) ===== */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-amber-100 bg-white/90 backdrop-blur-md px-4 h-14 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb400] text-base font-bold text-[#0f1724]">
            🍽
          </span>
          <span className="text-base font-bold text-[#0f1724]">FOODLY</span>
        </Link>
        {isAuthenticated && (
          <Link to="/cart" className="relative p-1.5 text-neutral-700">
            <PiShoppingCartSimpleBold className="text-xl" />
            {totalQuantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb400] text-[10px] font-bold text-black">
                {totalQuantity}
              </span>
            )}
          </Link>
        )}
      </nav>

      {/* ===== Mobile Bottom Navigation (react icons + active background) ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 pb-2 pt-2 shadow-lg backdrop-blur-xl md:hidden">
        <div className="flex items-end justify-around max-w-md mx-auto">
          {bottomItems.map((item) => {
            if (item.isSearch) {
              return (
                <NavLink
                  key={item.key}
                  to={item.to}
                  end={item.end}
                  className={bottomSearchItemClass}
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </NavLink>
              );
            }
            return (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.end}
                className={bottomNavItemClass}
              >
                {item.icon}
                <span className="leading-none">{item.label}</span>
                {item.badge != null && (
                  <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}