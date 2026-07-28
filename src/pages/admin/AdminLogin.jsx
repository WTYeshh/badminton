import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import Logo from '../../components/ui/Logo'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const { login, isAuthenticated } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Lockout countdown
  useEffect(() => {
    if (!locked) return
    const interval = setInterval(() => {
      setLockTimer(t => {
        if (t <= 1) {
          setLocked(false)
          setAttempts(0)
          clearInterval(interval)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [locked])

  useEffect(() => {
    if (inputRef.current && !locked) inputRef.current.focus()
  }, [locked])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (locked || loading) return

    setLoading(true)
    setError('')

    // Slight delay to prevent brute-force timing attacks
    await new Promise(r => setTimeout(r, 500))

    const result = login(password)
    setLoading(false)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setPassword('')

      if (newAttempts >= 5) {
        setLocked(true)
        setLockTimer(30)
        setError('Too many failed attempts. Locked for 30 seconds.')
      } else {
        setError(`${result.error} ${5 - newAttempts} attempt(s) remaining.`)
      }
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-black/60">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <Logo size={52} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <Lock size={10} className="text-black font-bold" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-heading text-xl font-bold">
                Smash<span className="text-accent">Admin</span>
              </h1>
              <p className="text-muted text-sm mt-1">Secure admin access only</p>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-xl px-3 py-2.5 mb-6">
            <ShieldCheck size={14} className="text-accent shrink-0" />
            <span className="text-xs text-accent/80">
              This area is restricted. Unauthorized access is prohibited.
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={locked || loading}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 pr-11 text-sm text-text placeholder-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  disabled={locked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors disabled:opacity-30"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5"
              >
                <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                <span className="text-xs text-red-400">{error}</span>
              </motion.div>
            )}

            {/* Lockout timer */}
            {locked && (
              <div className="text-center">
                <span className="text-xs text-muted">
                  Retry in{' '}
                  <span className="text-accent font-mono font-bold">{lockTimer}s</span>
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={locked || loading || !password}
              className="w-full bg-accent text-black font-semibold text-sm py-3 rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying…
                </>
              ) : locked ? (
                <>
                  <Lock size={14} />
                  Locked
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Attempts indicator */}
          {attempts > 0 && !locked && (
            <div className="mt-4 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < attempts ? 'bg-red-500' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Back link */}
        <p className="text-center mt-5 text-xs text-muted">
          <a href="/" className="hover:text-accent transition-colors">
            ← Return to SmashAcademy website
          </a>
        </p>
      </motion.div>
    </div>
  )
}
