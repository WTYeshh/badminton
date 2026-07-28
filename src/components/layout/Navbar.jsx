import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeLink, setActive]   = useState('/')
  const navigate                   = useNavigate()

  // ── Double-click logo → admin ────────────────────────────────────────────
  const clickCountRef = useRef(0)
  const clickTimerRef = useRef(null)

  const handleLogoClick = useCallback((e) => {
    e.preventDefault()
    clickCountRef.current++

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)

    if (clickCountRef.current >= 2) {
      clickCountRef.current = 0
      navigate('/admin/login')
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0
        navigate('/')
      }, 320)
    }
  }, [navigate])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep active link in sync with current path
  useEffect(() => {
    setActive(window.location.pathname)
  }, [])

  const handleNavClick = (to) => {
    setActive(to)
    setMenuOpen(false)
    navigate(to)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ── Logo — double-click to reach admin ── */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group select-none"
          aria-label="SmashAcademy home"
        >
          <Logo size={34} />
          <span className="font-heading font-bold text-base tracking-tight">
            Smash<span className="text-accent">Academy</span>
          </span>
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 ${
                activeLink === link.to
                  ? 'text-text bg-surface'
                  : 'text-muted hover:text-text'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* ── CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => navigate('/courts')}>
            Book Court
          </Button>
        </div>

        {/* ── Mobile menu toggle ── */}
        <button
          className="md:hidden p-2 rounded-xl text-muted hover:text-text hover:bg-surface transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
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
                <button
                  key={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors ${
                    activeLink === link.to
                      ? 'text-text bg-surface'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 pt-3 border-t border-border">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => { setMenuOpen(false); navigate('/courts') }}
                >
                  Book Court
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
