import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import FoodDetails from './pages/FoodDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import UserProfile from './pages/UserProfile'
import AdminDashboard, { AdminFoodForm, AdminFoods, AdminOrders, AdminUsers } from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AdminRoute({ isAuthenticated, userRole, children }) {
  return isAuthenticated && userRole === 'admin' ? children : <Navigate to="/" replace />
}

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const userRole = useSelector(state => state.auth.user?.role)

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />

        <Route
          path="/cart"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><Cart /></ProtectedRoute>}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><Checkout /></ProtectedRoute>}
        />
        <Route
          path="/orders/:id"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><OrderTracking /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserProfile /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><AdminDashboard /></AdminRoute>}
        >
          <Route index element={<AdminOrders />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="foods" element={<AdminFoods />} />
          <Route path="foods/new" element={<AdminFoodForm />} />
          <Route path="foods/:foodId/edit" element={<AdminFoodForm />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App