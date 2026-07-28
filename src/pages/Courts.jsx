import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SectionLabel from '../components/ui/SectionLabel'
import BookingDrawer from '../components/sections/BookingDrawer'
import { FadeUp, AnimatedTitle } from '../components/ui/ScrollReveal'
import { courts, availableCount } from '../data/courts'
import { VOL_1, VOL_2, VOL_3, VOL_4, VOL_5 } from '../assets/images'

const courtImages = [VOL_1, VOL_2, VOL_3, VOL_4, VOL_5]

export default function Courts() {
  const [selected, setSelected]   = useState(courts[0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [imgIndex, setImgIndex]   = useState(0)

  const handleSelect = (court) => {
    setSelected(court)
    setImgIndex(court.id % courtImages.length)
  }

  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <FadeUp className="text-center space-y-4 mb-14 sm:mb-16">
          <SectionLabel>11 Indoor Courts</SectionLabel>
          <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
            Explore Our Courts
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto">
            Professional indoor courts with LED lighting and wooden flooring.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium">{availableCount} courts available now</span>
          </div>
        </FadeUp>

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
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-accent/50 appearance-none cursor-pointer"
                >
                  {courts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} — {c.status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Court details */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading text-xl font-bold">{selected.name}</h2>
                  <p className="text-sm text-muted mt-0.5">{selected.floor} floor · {selected.lighting} lighting</p>
                </div>
                <Badge status={selected.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Lighting', value: selected.lighting },
                  { label: 'Floor',    value: selected.floor },
                  { label: 'Next Slot', value: selected.nextSlot || '—' },
                  { label: 'Status',   value: selected.status },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface rounded-xl p-3">
                    <p className="text-xs text-muted mb-0.5">{label}</p>
                    <p className="text-sm font-medium capitalize">{value}</p>
                  </div>
                ))}
              </div>

              {selected.schedule && selected.schedule.length > 0 && (
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-medium flex items-center gap-1.5 mb-3">
                    <Clock size={11} /> Today's Schedule
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.schedule.map((slot, idx) => {
                      const isAvailable = slot.toLowerCase().includes('available')
                      return (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1.5 rounded-xl border font-medium ${
                            isAvailable
                              ? 'bg-accent/10 border-accent/30 text-accent'
                              : 'bg-surface border-border text-muted line-through'
                          }`}
                        >
                          {slot}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

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
        <FadeUp className="mt-20">
          <AnimatedTitle as="h2" className="font-heading text-2xl font-bold mb-6">
            All Courts
          </AnimatedTitle>
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
        </FadeUp>
      </div>

      <BookingDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        courtName={selected.name}
      />
    </PageLayout>
  )
}
