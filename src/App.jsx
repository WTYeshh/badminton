import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

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
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourts from './pages/admin/AdminCourts'
import AdminBookings from './pages/admin/AdminBookings'
import AdminMembers from './pages/admin/AdminMembers'
import AdminCoaches from './pages/admin/AdminCoaches'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminCalendar from './pages/admin/AdminCalendar'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
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

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="courts" element={<AdminCourts />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="coaches" element={<AdminCoaches />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
