import { useState } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, CalendarCheck, Users, UserRound,
  Megaphone, Calendar, Settings, Menu, X, ChevronRight, LogOut, ShieldOff
} from 'lucide-react'
import Logo from '../../components/ui/Logo'
import { useAdminAuth } from '../../context/AdminAuthContext'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Courts', to: '/admin/courts', icon: Building2 },
  { label: 'Bookings', to: '/admin/bookings', icon: CalendarCheck },
  { label: 'Members', to: '/admin/members', icon: Users },
  { label: 'Coaches', to: '/admin/coaches', icon: UserRound },
  { label: 'Announcements', to: '/admin/announcements', icon: Megaphone },
  { label: 'Calendar', to: '/admin/calendar', icon: Calendar },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg text-text flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-border flex flex-col z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border shrink-0">
          <Link to="/admin" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-heading font-bold text-sm">
              Smash<span className="text-accent">Admin</span>
            </span>
          </Link>
          <button className="lg:hidden p-1 text-muted hover:text-text" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-0.5">
            {navItems.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-text hover:bg-card'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} className={isActive ? 'text-accent' : 'text-muted group-hover:text-text'} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={14} className="text-accent/60" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer — logout */}
        <div className="p-4 border-t border-border shrink-0 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-text hover:bg-card transition-all"
          >
            <LogOut size={16} />
            Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <ShieldOff size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-surface border-b border-border flex items-center px-6 gap-4 shrink-0 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-xl text-muted hover:text-text hover:bg-card transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3 text-sm text-muted">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs">
              A
            </div>
            <span>Admin</span>
            <button
              onClick={handleLogout}
              className="ml-1 text-muted hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <ShieldOff size={15} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
