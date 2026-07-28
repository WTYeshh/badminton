import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Info, ChevronDown } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionLabel from '../components/ui/SectionLabel'
import BookingDrawer from '../components/sections/BookingDrawer'
import { courts, availableCount } from '../data/courts'

const courtImages = [
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3b?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=900&auto=format&fit=crop&q=80',
]

export default function Courts() {
  const [selected, setSelected] = useState(courts[0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  const handleSelect = (court) => {
    setSelected(court)
    setImgIndex(court.id % courtImages.length)
  }

  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <SectionLabel>11 Indoor Courts</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Explore Our Courts</h1>
          <p className="text-muted max-w-md mx-auto">
            Professional indoor courts with LED lighting and wooden flooring.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium">{availableCount} courts available now</span>
          </div>
        </div>

        {/* Split-screen layout */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left — Court image */}
          <div className="sticky top-24 rounded-3xl overflow-hidden aspect-[4/3] bg-card border border-border">
            <AnimatePresence mode="wait">
              <motion.img
                key={selected.id}
                src={courtImages[imgIndex]}
                alt={selected.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="bg-bg/80 backdrop-blur-xl rounded-2xl px-4 py-2 border border-border">
                <p className="font-heading text-lg font-bold">{selected.name}</p>
                <p className="text-xs text-muted">{selected.floor} floor · {selected.lighting} lighting</p>
              </div>
              <Badge status={selected.status} />
            </div>
          </div>

          {/* Right — Court selector + details */}
          <div className="space-y-4">
            {/* Dropdown selector */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <label className="text-xs text-muted font-medium uppercase tracking-wider block mb-2">Select Court</label>
              <div className="relative">
                <select
                  value={selected.id}
                  onChange={e => handleSelect(courts.find(c => c.id === Number(e.target.value)))}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text appearance-none focus:outline-none focus:border-accent/50 transition-colors pr-10"
                >
                  {courts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
            </div>

            {/* Quick status cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted mb-1">Status</p>
                <Badge status={selected.status} />
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted mb-1">Next Slot</p>
                <p className="text-sm font-semibold font-mono-nums">{selected.nextSlot}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted mb-1">Floor</p>
                <p className="text-sm font-semibold">{selected.floor}</p>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-accent" />
                <h3 className="font-semibold text-sm">Today's Schedule</h3>
              </div>
              {selected.schedule.length === 0 ? (
                <div className="flex items-center gap-2 py-3 text-muted text-sm">
                  <Info size={14} />
                  Court is under maintenance. No slots available today.
                </div>
              ) : (
                <div className="space-y-2">
                  {selected.schedule.map((slot, i) => {
                    const isBooked = slot.includes('Booked')
                    return (
                      <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${
                        isBooked ? 'bg-zinc-500/5 border border-zinc-500/10' : 'bg-accent/5 border border-accent/10'
                      }`}>
                        <span className={isBooked ? 'text-muted' : 'text-text'}>{slot.split(' (')[0]}</span>
                        <Badge status={isBooked ? 'booked' : 'available'} />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Book button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={selected.status === 'maintenance'}
              onClick={() => setDrawerOpen(true)}
            >
              {selected.status === 'maintenance' ? 'Court Under Maintenance' : `Book ${selected.name}`}
            </Button>
            {selected.status !== 'maintenance' && (
              <p className="text-xs text-muted text-center">Admin approval required. No online payment.</p>
            )}
          </div>
        </div>

        {/* All courts grid */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold mb-6">All Courts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {courts.map(c => (
              <button
                key={c.id}
                onClick={() => handleSelect(c)}
                className={`bg-card border rounded-2xl p-4 text-left transition-all duration-150 hover:-translate-y-0.5 ${
                  selected.id === c.id ? 'border-accent/50 bg-accent/5' : 'border-border hover:border-accent/30'
                }`}
              >
                <p className="font-semibold text-sm mb-2">{c.name}</p>
                <Badge status={c.status} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <BookingDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        courtName={selected.name}
      />
    </PageLayout>
  )
}
