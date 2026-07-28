import { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Badge from '../components/ui/Badge'
import { courts as initialCourts } from '../data/courts'
import { useLocalData } from '../hooks/useLocalData'
import { toDisplay, todayISO } from '../utils/date'

const slots = ['6–7 AM', '7–8 AM', '8–9 AM', '9–10 AM', '10–11 AM', '11 AM–12', '12–1 PM',
  '1–2 PM', '2–3 PM', '3–4 PM', '4–5 PM', '5–6 PM', '6–7 PM', '7–8 PM', '8–9 PM', '9–10 PM']

function getCellStatus(courtId, slotIndex) {
  const seed = (courtId * 7 + slotIndex * 3) % 5
  if (seed === 0) return 'maintenance'
  if (seed === 1 || seed === 2) return 'booked'
  return 'available'
}

export default function CourtAvailability() {
  const [courts] = useLocalData('smash_courts', initialCourts)
  const [selectedDate, setSelectedDate] = useState(todayISO())

  // Only show courts that are enabled (visible) by admin
  const visibleCourts = courts.filter(c => c.enabled)

  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <SectionLabel>Availability</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Court Availability</h1>
          <p className="text-muted max-w-md mx-auto">
            Real-time availability grid for {visibleCourts.length} active court{visibleCourts.length !== 1 ? 's' : ''}.
          </p>
        </div>

        {/* Date picker — shows DD-MM-YYYY label */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <label className="text-sm text-muted">Date</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              min={todayISO()}
              className="bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <span className="text-sm font-mono text-accent">{toDisplay(selectedDate)}</span>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {[
            { status: 'available',   label: 'Available'    },
            { status: 'booked',      label: 'Booked'       },
            { status: 'maintenance', label: 'Maintenance'  },
          ].map(l => <Badge key={l.status} status={l.status} label={l.label} />)}
        </div>

        {visibleCourts.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <p className="text-lg font-medium">No courts available</p>
            <p className="text-sm mt-1">All courts are currently offline. Please check back later.</p>
          </div>
        ) : (
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
                {visibleCourts.map((court, ci) => (
                  <tr key={court.id} className={ci % 2 === 0 ? 'bg-card' : 'bg-surface'}>
                    <td className="px-4 py-2.5 font-medium whitespace-nowrap">{court.name}</td>
                    {slots.map((_, si) => {
                      const status = court.status === 'maintenance' ? 'maintenance' : getCellStatus(court.id, si)
                      return (
                        <td key={si} className="px-1.5 py-2 text-center">
                          <div className={`w-full h-6 rounded-md mx-auto ${
                            status === 'available'   ? 'bg-accent/20 border border-accent/30' :
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
        )}
      </div>
    </PageLayout>
  )
}
