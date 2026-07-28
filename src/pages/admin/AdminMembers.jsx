import { useState } from 'react'
import { Search } from 'lucide-react'
import { members } from '../../data/members'
import Badge from '../../components/ui/Badge'

export default function AdminMembers() {
  const [search, setSearch] = useState('')

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.phone.includes(search) ||
    m.plan.toLowerCase().includes(search.toLowerCase())
  )

  // Check if expiry is within 30 days
  const isExpiringSoon = (dateStr) => {
    const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 30
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Members</h1>
        <p className="text-muted text-sm mt-1">{members.length} active members.</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search members..."
          className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['ID', 'Name', 'Phone', 'Plan', 'Expiry', 'Batch'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted">No members found.</td></tr>
              ) : filtered.map((m, i) => (
                <tr key={m.id} className={`border-b border-border last:border-0 hover:bg-surface/50 transition-colors ${i % 2 === 1 ? 'bg-surface/20' : ''}`}>
                  <td className="px-5 py-3.5 font-mono-nums text-xs text-muted">{m.id}</td>
                  <td className="px-5 py-3.5 font-medium">{m.name}</td>
                  <td className="px-5 py-3.5 text-muted font-mono-nums text-xs">{m.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      m.plan === 'Annual' ? 'bg-accent/10 text-accent border-accent/20' :
                      m.plan === 'Premium' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>{m.plan}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono-nums text-sm">
                    <span className={isExpiringSoon(m.expiry) ? 'text-yellow-400' : 'text-text'}>{m.expiry}</span>
                    {isExpiringSoon(m.expiry) && <span className="ml-2 text-xs text-yellow-400">⚠ Expiring soon</span>}
                  </td>
                  <td className="px-5 py-3.5 text-muted text-xs">{m.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
