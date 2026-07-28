import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'

const timeSlots = [
  '6:00–7:00 AM', '7:00–8:00 AM', '8:00–9:00 AM', '9:00–10:00 AM',
  '10:00–11:00 AM', '11:00–12:00 PM', '12:00–1:00 PM', '1:00–2:00 PM',
  '2:00–3:00 PM', '3:00–4:00 PM', '4:00–5:00 PM', '5:00–6:00 PM',
  '6:00–7:00 PM', '7:00–8:00 PM', '8:00–9:00 PM', '9:00–10:00 PM',
]

export default function BookingDrawer({ isOpen, onClose, courtName }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', date: '', slot: '', players: '2', notes: '',
  })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm({ name: '', phone: '', date: '', slot: '', players: '2', notes: '' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-accent font-medium tracking-widest uppercase mb-1">Book Court</p>
                  <h2 className="font-heading text-xl font-bold">{courtName}</h2>
                </div>
                <button onClick={handleClose} className="p-2 rounded-xl text-muted hover:text-text hover:bg-card transition-colors">
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="text-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Booking Request Received.</h3>
                    <p className="text-muted leading-relaxed">
                      Please pay at the reception before your game.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Phone Number *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 99999 99999"
                      type="tel"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Date *</label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>

                  {/* Time slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Time Slot *</label>
                    <select
                      name="slot"
                      value={form.slot}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
                    >
                      <option value="">Select a slot</option>
                      {timeSlots.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Players */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Number of Players *</label>
                    <select
                      name="players"
                      value={form.players}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
                    >
                      <option value="1">1 Player</option>
                      <option value="2">2 Players</option>
                      <option value="3">3 Players</option>
                      <option value="4">4 Players (Max)</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted uppercase tracking-wider">Notes (optional)</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special requests..."
                      rows={3}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="mt-auto pt-4">
                    <Button type="submit" variant="primary" className="w-full" size="lg">
                      Submit Booking Request
                    </Button>
                    <p className="text-xs text-muted text-center mt-3">
                      Admin approval required. No online payment.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
