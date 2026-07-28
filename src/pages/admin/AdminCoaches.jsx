import { useState } from 'react'
import { Edit2, Plus, X, Check } from 'lucide-react'
import { coaches as initialCoaches } from '../../data/coaches'
import Button from '../../components/ui/Button'

export default function AdminCoaches() {
  const [coachList, setCoachList] = useState(initialCoaches)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})

  const startEdit = (coach) => {
    setEditing(coach.id)
    setEditForm({ ...coach })
  }

  const saveEdit = () => {
    setCoachList(prev => prev.map(c => c.id === editing ? { ...c, ...editForm } : c))
    setEditing(null)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Coaches</h1>
          <p className="text-muted text-sm mt-1">Manage coaching staff and batch assignments.</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={14} /> Add Coach
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {coachList.map(coach => (
          <div key={coach.id} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all">
            {editing === coach.id ? (
              <div className="space-y-3">
                <input
                  value={editForm.name}
                  onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/50"
                  placeholder="Name"
                />
                <input
                  value={editForm.specialization}
                  onChange={e => setEditForm(p => ({ ...p, specialization: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/50"
                  placeholder="Specialization"
                />
                <input
                  value={editForm.phone}
                  onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/50"
                  placeholder="Phone"
                />
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="primary" onClick={saveEdit}><Check size={13} /> Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X size={13} /> Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <span className="font-heading font-bold text-accent">
                        {coach.name.split(' ').slice(-1)[0][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-heading font-bold">{coach.name}</p>
                      <p className="text-xs text-accent">{coach.specialization}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => startEdit(coach)}>
                    <Edit2 size={13} />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1.5">Batches</p>
                    <div className="flex flex-wrap gap-1.5">
                      {coach.batches.map(b => (
                        <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-muted">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Schedule</p>
                    {coach.schedule.map(s => (
                      <p key={s} className="text-xs text-muted">{s}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Experience</span>
                    <span className="font-medium">{coach.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Phone</span>
                    <span className="font-mono-nums">{coach.phone}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
