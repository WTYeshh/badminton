import { Building2, CalendarCheck, Users, Clock, Activity } from 'lucide-react'
import { courts, availableCount } from '../../data/courts'
import { bookings } from '../../data/bookings'
import { members } from '../../data/members'
import Badge from '../../components/ui/Badge'

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

export default function AdminDashboard() {
  const todayBookings = bookings.filter(b => b.date === '2026-07-28')
  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const recentActivity = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Overview of SmashAcademy operations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Building2} label="Total Courts" value={courts.length} />
        <StatCard icon={Building2} label="Available Now" value={availableCount} accent />
        <StatCard icon={CalendarCheck} label="Today's Bookings" value={todayBookings.length} sub="July 28" />
        <StatCard icon={Clock} label="Pending Requests" value={pendingBookings.length} accent={pendingBookings.length > 0} />
        <StatCard icon={Users} label="Active Members" value={members.length} />
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-accent" />
          <h2 className="font-heading font-bold">Recent Activity</h2>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">Booking ID</th>
                <th className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Court</th>
                <th className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((b, i) => (
                <tr key={b.id} className={`border-b border-border last:border-0 hover:bg-surface/60 transition-colors ${i % 2 === 1 ? 'bg-surface/30' : ''}`}>
                  <td className="px-5 py-3.5 font-mono-nums text-xs text-muted">{b.id}</td>
                  <td className="px-5 py-3.5 font-medium">{b.name}</td>
                  <td className="px-5 py-3.5 text-muted hidden md:table-cell">{b.court}</td>
                  <td className="px-5 py-3.5 text-muted hidden lg:table-cell">{b.date} · {b.slot}</td>
                  <td className="px-5 py-3.5"><Badge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Overview grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Court status */}
        <div>
          <h2 className="font-heading font-bold mb-4">Court Status</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {courts.slice(0, 6).map(c => (
                <div key={c.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface/50 transition-colors">
                  <span className="text-sm font-medium">{c.name}</span>
                  <Badge status={c.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending bookings */}
        <div>
          <h2 className="font-heading font-bold mb-4">Pending Approvals</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {pendingBookings.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted text-sm">No pending bookings</div>
            ) : (
              <div className="divide-y divide-border">
                {pendingBookings.map(b => (
                  <div key={b.id} className="px-5 py-3.5 hover:bg-surface/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{b.name}</p>
                        <p className="text-xs text-muted">{b.court} · {b.date} · {b.slot}</p>
                      </div>
                      <Badge status="pending" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
