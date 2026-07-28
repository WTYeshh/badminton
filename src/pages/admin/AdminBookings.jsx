import { useState } from 'react'
import { Search, Check, X, Ban, CalendarRange } from 'lucide-react'
import { bookings as initialBookings } from '../../data/bookings'
import { useLocalData } from '../../hooks/useLocalData'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { toDisplay } from '../../utils/date'

export default function AdminBookings() {
  const [bookingList, setBookingList] = useLocalData('smash_bookings', initialBookings)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const updateStatus = (id, status) => {
    setBookingList(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const filtered = bookingList.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.court.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || b.status === filter
    return matchSearch && matchFilter
  })

  const tabs = ['all', 'pending', 'approved', 'rejected', 'cancelled']

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Booking Management</h1>
        <p className="text-muted text-sm mt-1">Review, approve, and manage court bookings.</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === t ? 'bg-accent text-bg' : 'text-muted hover:text-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['ID', 'Name', 'Court', 'Date & Slot', 'Players', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-muted">No bookings found.</td></tr>
              ) : filtered.map((b, i) => (
                <tr key={b.id} className={`border-b border-border last:border-0 hover:bg-surface/50 transition-colors ${i % 2 === 1 ? 'bg-surface/20' : ''}`}>
                  <td className="px-5 py-3.5 font-mono-nums text-xs text-muted">{b.id}</td>
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-muted">{b.phone}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{b.court}</td>
                  <td className="px-5 py-3.5 text-muted">
                    <div>
                      <p className="font-mono-nums">{toDisplay(b.date)}</p>
                      <p className="text-xs">{b.slot}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted font-mono-nums">{b.players}</td>
                  <td className="px-5 py-3.5"><Badge status={b.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {b.status === 'pending' && (
                        <>
                          <button title="Approve" onClick={() => updateStatus(b.id, 'approved')}
                            className="p-1.5 rounded-lg text-accent hover:bg-accent/10 transition-colors">
                            <Check size={14} />
                          </button>
                          <button title="Reject" onClick={() => updateStatus(b.id, 'rejected')}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {b.status === 'approved' && (
                        <button title="Cancel" onClick={() => updateStatus(b.id, 'cancelled')}
                          className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Ban size={14} />
                        </button>
                      )}
                      <button title="Reschedule" className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-surface transition-colors">
                        <CalendarRange size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
