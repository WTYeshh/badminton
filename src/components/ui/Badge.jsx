// Status badge component

const config = {
  available: { label: 'Available', class: 'bg-accent/10 text-accent border-accent/20' },
  booked: { label: 'Booked', class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
  maintenance: { label: 'Maintenance', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
  pending: { label: 'Pending', class: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  approved: { label: 'Approved', class: 'bg-accent/10 text-accent border-accent/20' },
  rejected: { label: 'Rejected', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
  cancelled: { label: 'Cancelled', class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
  pinned: { label: 'Pinned', class: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
}

export default function Badge({ status, label, className = '' }) {
  const cfg = config[status] || { label: label || status, class: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.class} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label || cfg.label}
    </span>
  )
}
