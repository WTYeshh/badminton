import { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Badge from '../components/ui/Badge'
import { courts } from '../data/courts'

const slots = ['6–7 AM', '7–8 AM', '8–9 AM', '9–10 AM', '10–11 AM', '11 AM–12', '12–1 PM',
  '1–2 PM', '2–3 PM', '3–4 PM', '4–5 PM', '5–6 PM', '6–7 PM', '7–8 PM', '8–9 PM', '9–10 PM']

// Mock availability grid — random for demo
function getCellStatus(courtId, slotIndex) {
  const seed = (courtId * 7 + slotIndex * 3) % 5
  if (seed === 0) return 'maintenance'
  if (seed === 1 || seed === 2) return 'booked'
  return 'available'
}

export default function CourtAvailability() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <SectionLabel>Availability</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Court Availability</h1>
          <p className="text-muted max-w-md mx-auto">Real-time availability grid for all 11 courts.</p>
        </div>

        {/* Date picker */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <label className="text-sm text-muted">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {[
            { status: 'available', label: 'Available' },
            { status: 'booked', label: 'Booked' },
            { status: 'maintenance', label: 'Maintenance' },
          ].map(l => <Badge key={l.status} status={l.status} label={l.label} />)}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-xs min-w-[900px]">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-4 py-3 text-muted font-medium w-24">Court</th>
                {slots.map(s => (
                  <th key={s} className="text-center px-2 py-3 text-muted font-medium whitespace-nowrap">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courts.map((court, ci) => (
                <tr key={court.id} className={ci % 2 === 0 ? 'bg-card' : 'bg-surface'}>
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">{court.name}</td>
                  {slots.map((_, si) => {
                    const status = court.status === 'maintenance' ? 'maintenance' : getCellStatus(court.id, si)
                    return (
                      <td key={si} className="px-1.5 py-2 text-center">
                        <div className={`w-full h-6 rounded-md mx-auto ${
                          status === 'available' ? 'bg-accent/20 border border-accent/30' :
                          status === 'maintenance' ? 'bg-red-500/20 border border-red-500/20' :
                          'bg-zinc-700/30 border border-zinc-700/20'
                        }`} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  )
}
