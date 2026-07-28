import { useState } from 'react'
import { Building2, CalendarCheck, Users, Clock, Activity, Check, X, ToggleLeft, ToggleRight } from 'lucide-react'
import { courts as initialCourts } from '../../data/courts'
import { bookings as initialBookings } from '../../data/bookings'
import { members } from '../../data/members'
import { useLocalData } from '../../hooks/useLocalData'
import Badge from '../../components/ui/Badge'
import { toDisplay } from '../../utils/date'

function StatCard({ icon: Icon, label, value, sub, accent = false }) {
  return (
    <div className={`bg-card border rounded-2xl p-5 flex flex-col gap-3 hover:border-accent/30 transition-all ${accent ? 'border-accent/30' : 'border-border'}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted uppercase tracking-wider font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent ? 'bg-accent/15' : 'bg-surface'}`}>
          <Icon size={15} className={accent ? 'text-accent' : 'text-muted'} />
        </div>
      </div>
      <div>
        <span className="font-mono-nums text-3xl font-bold">{value}</span>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

/** On/Off toggle switch */
function Switch({ on, onChange, label }) {
  return (
    <button
      onClick={onChange}
      title={on ? 'Visible on booking page — click to hide' : 'Hidden from booking page — click to show'}
      className={`flex items-center gap-2 text-xs font-medium transition-colors ${on ? 'text-accent' : 'text-muted'}`}
    >
      {on
        ? <ToggleRight size={24} className="text-accent" />
        : <ToggleLeft  size={24} className="text-muted"  />
      }
      {label && <span className="hidden sm:inline">{on ? 'On' : 'Off'}</span>}
    </button>
  )
}

export default function AdminDashboard() {
  const [bookingList, setBookingList] = useLocalData('smash_bookings', initialBookings)
  const [courtList,   setCourtList]   = useLocalData('smash_courts',   initialCourts)

  const pendingBookings = bookingList.filter(b => b.status === 'pending')
  const recentActivity  = [...bookingList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)

  const todayISO = new Date().toISOString().split('T')[0]
  const todayBookings = bookingList.filter(b => b.date === todayISO)

  const enabledCourts = courtList.filter(c => c.enabled).length

  const updateBooking = (id, status) =>
    setBookingList(prev => prev.map(b => b.id === id ? { ...b, status } : b))

  const toggleCourt = (id) =>
    setCourtList(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Overview of SmashAcademy operations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Building2}    label="Total Courts"      value={courtList.length} />
        <StatCard icon={Building2}    label="Visible (On)"      value={enabledCourts} accent />
        <StatCard icon={CalendarCheck} label="Today's Bookings" value={todayBookings.length} sub={new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short' })} />
        <StatCard icon={Clock}        label="Pending Requests"  value={pendingBookings.length} accent={pendingBookings.length > 0} />
        <StatCard icon={Users}        label="Active Members"    value={members.length} />
      </div>

      {/* Pending Approvals — with Accept / Decline inline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-yellow-400" />
          <h2 className="font-heading font-bold">Pending Appointments</h2>
          {pendingBookings.length > 0 && (
            <span className="text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-full font-medium">
              {pendingBookings.length} waiting
            </span>
          )}
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {pendingBookings.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-muted text-sm">No pending appointments.</p>
              <p className="text-muted/60 text-xs mt-1">All bookings have been reviewed.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {pendingBookings.map(b => (
                <div key={b.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-surface/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{b.name}</p>
                      <span className="text-xs text-muted font-mono shrink-0">{b.id}</span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      {b.court} · {toDisplay(b.date)} · {b.slot} · {b.players} player{b.players > 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-muted/60 mt-0.5">📞 {b.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateBooking(b.id, 'approved')}
                      title="Accept booking"
                      className="flex items-center gap-1 text-xs bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      <Check size={12} /> Accept
                    </button>
                    <button
                      onClick={() => updateBooking(b.id, 'rejected')}
                      title="Decline booking"
                      className="flex items-center gap-1 text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      <X size={12} /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom grid: Court Status switches + Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Court Status — on/off switches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-heading font-bold">Court Status</h2>
            <span className="text-xs text-muted">Switch controls booking-page visibility</span>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {courtList.map(c => (
                <div key={c.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Switch on={c.enabled} onChange={() => toggleCourt(c.id)} />
                    <div>
                      <span className="text-sm font-medium">{c.name}</span>
                      {!c.enabled && (
                        <span className="ml-2 text-xs text-muted/50">(hidden from booking)</span>
                      )}
                    </div>
                  </div>
                  <Badge status={c.enabled ? c.status : 'maintenance'} label={c.enabled ? undefined : 'Hidden'} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity — last 10 booked members */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-accent" />
            <h2 className="font-heading font-bold">Recent Activity</h2>
            <span className="text-xs text-muted">last 10</span>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {recentActivity.length === 0 ? (
                <div className="px-5 py-8 text-center text-muted text-sm">No activity yet</div>
              ) : recentActivity.map((b) => (
                <div key={b.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{b.name}</p>
                    <p className="text-xs text-muted">{b.court} · {toDisplay(b.date)} · {b.slot}</p>
                  </div>
                  <Badge status={b.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
