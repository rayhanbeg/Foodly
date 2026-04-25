import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const desktopNavClass = ({ isActive }) =>
  `inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md ${
    isActive
      ? "bg-amber-50 text-amber-900"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
  }`;

const bottomNavItemClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-all ${
    isActive
      ? "text-amber-600 bg-amber-50 rounded-full"
      : "text-neutral-500 hover:text-neutral-700"
  }`;

const bottomSearchItemClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
    isActive ? "text-primary" : "text-neutral-500 hover:text-neutral-700"
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
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        end: true,
      },
      {
        key: "menu",
        to: "/menu",
        label: "Menu",
        icon: "M4 6h16M4 12h16M4 18h16",
        end: false,
      },
    ];

    const authItems = isAuthenticated
      ? [
          {
            key: "cart",
            to: "/cart",
            label: "Cart",
            icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
            badge: totalQuantity > 0 ? totalQuantity : null,
          },
          {
            key: "profile",
            to: "/profile",
            label: "Profile",
            icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
            end: false,
          },
        ]
      : [
          {
            key: "login",
            to: "/login",
            label: "Login",
            icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
            end: false,
          },
          {
            key: "register",
            to: "/register",
            label: "Sign Up",
            icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
            end: false,
          },
        ];

    const searchItem = {
      key: "search",
      to: "/menu",
      label: "Search",
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      isSearch: true,
      end: false,
    };

    return [baseItems[0], baseItems[1], searchItem, ...authItems];
  };

  const bottomItems = getBottomNavItems();

  return (
    <>
      {/* ===== Desktop Navigation (solid, rectangular) ===== */}
      <nav className="sticky top-0 z-40 hidden md:block bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffb400] text-lg font-bold text-[#0f1724]">
                🍽
              </span>
              <span className="hidden xl:block">
                <span className="block text-base font-bold leading-none text-[#0f1724]">
                  FOODLY
                </span>
                <span className="block text-xs text-neutral-400">
                  Fresh meals, delivered fast
                </span>
              </span>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-1">
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
              <NavLink
                to="/faq"
                className="hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              >
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
              <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center"
              >
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
                    className="w-24 lg:w-40 xl:w-48 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
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
                    <span className="hidden xl:inline">
                      {user?.name?.split(" ")[0] || "Account"}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-md bg-neutral-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
                  >
                    <IoLogOutOutline className="text-base" />
                    <span className="hidden xl:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-neutral-700 hover:text-primary hidden xl:inline"
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

      {/* ===== Mobile Top Navigation (unchanged) ===== */}
      <nav className="sticky top-0 z-40 border-b border-amber-100 bg-white/90 backdrop-blur-md md:hidden">
        <div className="container-fluid flex flex-col gap-2 px-4 py-2.5">
          {/* Top Row */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffb400] text-lg font-bold text-[#0f1724]">
                🍽
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold leading-none tracking-[-0.02em] text-[#0f1724]">
                  FOODLY
                </span>
                <span className="block pt-0.5 text-xs font-medium leading-none text-[#9ca3af]">
                  Fresh meals, delivered fast
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-1 text-sm font-medium text-neutral-700"
                  >
                    <FaUserCircle className="text-xl" />
                    <span className="max-w-[80px] truncate">
                      {user?.name?.split(" ")[0] || "Account"}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1.5 text-xs font-medium text-neutral-700"
                  >
                    <IoLogOutOutline className="text-base" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Bottom Navigation (unchanged) ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 pb-2 pt-2 shadow-lg backdrop-blur-xl md:hidden">
        <div className="mx-auto max-w-md px-2">
          <div className="flex items-center justify-around">
            {bottomItems.map((item) => {
              const Icon = () => (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={item.icon}
                  />
                </svg>
              );

              const isSearch = item.label === "Search";
              const linkClass = isSearch
                ? bottomSearchItemClass
                : bottomNavItemClass;

              return (
                <NavLink
                  key={item.key}
                  to={item.to}
                  className={linkClass}
                  end={item.end}
                >
                  <div className="relative">
                    {isSearch ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E17100] text-white shadow-md">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
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
                  <span className={isSearch ? "mt-1 text-xs" : ""}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
