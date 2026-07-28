import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShieldCheck } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Coaching', to: '/coaching' },
  { label: 'Courts', to: '/courts' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminHover, setAdminHover] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size={34} />
          <span className="font-heading font-bold text-base tracking-tight">
            Smash<span className="text-accent">Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-text bg-surface' : 'text-muted hover:text-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: CTA + Admin icon */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => navigate('/courts')}>
            Book Court
          </Button>

          {/* Admin access icon — top-right, subtle */}
          <div className="relative">
            <button
              onClick={() => navigate('/admin/login')}
              onMouseEnter={() => setAdminHover(true)}
              onMouseLeave={() => setAdminHover(false)}
              aria-label="Admin Panel"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all duration-200"
            >
              <ShieldCheck size={16} />
            </button>
            <AnimatePresence>
              {adminHover && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl px-3 py-2 text-xs text-muted whitespace-nowrap shadow-lg shadow-black/40 pointer-events-none"
                >
                  Admin Dashboard
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-muted hover:text-text hover:bg-surface transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'text-text bg-surface' : 'text-muted hover:text-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 pt-3 border-t border-border flex flex-col gap-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => { setMenuOpen(false); navigate('/courts') }}
                >
                  Book Court
                </Button>
                <button
                  onClick={() => { setMenuOpen(false); navigate('/admin/login') }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-muted hover:text-accent hover:bg-accent/5 border border-border transition-all"
                >
                  <ShieldCheck size={15} />
                  Admin Panel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
