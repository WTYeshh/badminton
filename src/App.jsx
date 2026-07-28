import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

// Auth
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'

// Public pages
import Home from './pages/Home'
import Coaching from './pages/Coaching'
import Courts from './pages/Courts'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Membership from './pages/Membership'
import Tournament from './pages/Tournament'
import CourtAvailability from './pages/CourtAvailability'

// Admin pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourts from './pages/admin/AdminCourts'
import AdminBookings from './pages/admin/AdminBookings'
import AdminMembers from './pages/admin/AdminMembers'
import AdminCoaches from './pages/admin/AdminCoaches'
import AdminPrograms from './pages/admin/AdminPrograms'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminCalendar from './pages/admin/AdminCalendar'
import AdminSettings from './pages/admin/AdminSettings'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

// Guard: redirects to login if not authenticated
function RequireAdminAuth({ children }) {
  const { isAuthenticated } = useAdminAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return children
}

export default function App() {
  return (
    <AdminAuthProvider>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/availability" element={<CourtAvailability />} />

          {/* Admin login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin routes — protected */}
          <Route
            path="/admin"
            element={
              <RequireAdminAuth>
                <AdminLayout />
              </RequireAdminAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="courts" element={<AdminCourts />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="coaches" element={<AdminCoaches />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="calendar" element={<AdminCalendar />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AdminAuthProvider>
  )
}
