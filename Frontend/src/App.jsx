import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import FoodDetails from './pages/FoodDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const userRole = useSelector(state => state.auth.user?.role)

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="flex-1 ">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders/:id"
            element={isAuthenticated ? <OrderTracking /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
