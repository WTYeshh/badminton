import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { bookings } from '../../data/bookings'
import Badge from '../../components/ui/Badge'

const courtColors = {
  'Court 1': 'bg-blue-500/20 text-blue-300',
  'Court 2': 'bg-purple-500/20 text-purple-300',
  'Court 3': 'bg-accent/20 text-accent',
  'Court 4': 'bg-red-500/20 text-red-300',
  'Court 5': 'bg-orange-500/20 text-orange-300',
  'Court 6': 'bg-pink-500/20 text-pink-300',
  'Court 7': 'bg-cyan-500/20 text-cyan-300',
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function AdminCalendar() {
  const [view, setView] = useState('week')
  const [courtFilter, setCourtFilter] = useState('all')
  const today = new Date('2026-07-28')
  const [currentDate, setCurrentDate] = useState(today)

  // Get week dates
  const getWeekDates = (date) => {
    const day = date.getDay()
    const start = new Date(date)
    start.setDate(date.getDate() - day)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }

  const weekDates = getWeekDates(currentDate)
  const dayStr = (d) => d.toISOString().split('T')[0]

  const filteredBookings = bookings.filter(b =>
    courtFilter === 'all' || b.court === courtFilter
  )

  const navigate = (dir) => {
    const d = new Date(currentDate)
    if (view === 'week') d.setDate(d.getDate() + (dir * 7))
    else d.setDate(d.getDate() + dir)
    setCurrentDate(d)
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Calendar</h1>
        <p className="text-muted text-sm mt-1">Daily and weekly booking calendar.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1">
          <button onClick={() => setView('day')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'day' ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}>Day</button>
          <button onClick={() => setView('week')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'week' ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}>Week</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-card border border-border transition-colors"><ChevronLeft size={16} /></button>
          <span className="text-sm font-medium min-w-[140px] text-center">
            {view === 'week'
              ? `${weekDates[0].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – ${weekDates[6].toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : currentDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })
            }
          </span>
          <button onClick={() => navigate(1)} className="p-2 rounded-xl hover:bg-card border border-border transition-colors"><ChevronRight size={16} /></button>
        </div>
        <select
          value={courtFilter}
          onChange={e => setCourtFilter(e.target.value)}
          className="bg-card border border-border rounded-xl px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/50"
        >
          <option value="all">All Courts</option>
          {Array.from({ length: 11 }, (_, i) => <option key={i + 1} value={`Court ${i + 1}`}>Court {i + 1}</option>)}
        </select>
      </div>

      {/* Week view */}
      {view === 'week' ? (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {weekDates.map((d, i) => (
              <div key={i} className={`text-center py-3 text-xs font-medium border-r border-border last:border-0 ${dayStr(d) === dayStr(today) ? 'text-accent' : 'text-muted'}`}>
                <div>{daysOfWeek[i]}</div>
                <div className={`text-lg font-mono-nums font-bold mt-0.5 ${dayStr(d) === dayStr(today) ? 'text-accent' : 'text-text'}`}>{d.getDate()}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-h-[280px]">
            {weekDates.map((d, i) => {
              const dayBookings = filteredBookings.filter(b => b.date === dayStr(d))
              return (
                <div key={i} className={`border-r border-border last:border-0 p-2 space-y-1.5 ${dayStr(d) === dayStr(today) ? 'bg-accent/5' : ''}`}>
                  {dayBookings.map(b => (
                    <div key={b.id} className={`rounded-lg px-2 py-1.5 text-xs ${courtColors[b.court] || 'bg-zinc-500/20 text-zinc-300'}`}>
                      <p className="font-medium truncate">{b.name}</p>
                      <p className="opacity-70 truncate">{b.slot}</p>
                      <Badge status={b.status} className="mt-1 scale-90 origin-left" />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        // Day view
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-heading font-bold mb-4">
            {currentDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          {(() => {
            const dayBookings = filteredBookings.filter(b => b.date === dayStr(currentDate))
            return dayBookings.length === 0 ? (
              <p className="text-muted text-sm py-8 text-center">No bookings for this day.</p>
            ) : (
              <div className="space-y-3">
                {dayBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between bg-surface border border-border rounded-xl px-5 py-3.5">
                    <div>
                      <p className="font-medium text-sm">{b.name}</p>
                      <p className="text-xs text-muted">{b.court} · {b.slot} · {b.players} players</p>
                    </div>
                    <Badge status={b.status} />
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
