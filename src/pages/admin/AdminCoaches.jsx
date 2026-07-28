import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Check, AlertTriangle, Phone } from 'lucide-react'
import { coaches as initialCoaches } from '../../data/coaches'
import { useLocalData } from '../../hooks/useLocalData'
import Button from '../../components/ui/Button'
import SchedulePicker from '../../components/ui/SchedulePicker'

const coachColors = ['text-accent', 'text-blue-400', 'text-purple-400', 'text-orange-400']

const emptyForm = {
  name: '', specialization: '', experience: '', phone: '',
  batches: '', schedule: [],
}

function CoachForm({ initial, onSave, onCancel }) {
  const initForm = initial
    ? {
        ...initial,
        batches:  Array.isArray(initial.batches)  ? initial.batches.join(', ')  : (initial.batches  || ''),
        schedule: Array.isArray(initial.schedule) ? initial.schedule : [],
      }
    : emptyForm

  const [form, setForm] = useState(initForm)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const valid = form.name.trim() && form.specialization.trim()

  const handleSave = () => {
    if (!valid) return
    onSave({
      ...form,
      batches: form.batches.split(',').map(s => s.trim()).filter(Boolean),
      // schedule is already an array via SchedulePicker
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Full Name *</label>
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Coach Rajesh Kumar"
            className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Specialization *</label>
          <input
            value={form.specialization}
            onChange={e => set('specialization', e.target.value)}
            placeholder="e.g. Advanced & Competitive"
            className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Experience</label>
          <input
            value={form.experience}
            onChange={e => set('experience', e.target.value)}
            placeholder="e.g. 8 years"
            className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Phone (10 digits)</label>
          <input
            value={form.phone}
            onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="e.g. 9876543001"
            className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60 font-mono"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted uppercase tracking-wider">
          Batches <span className="normal-case">(comma-separated)</span>
        </label>
        <input
          value={form.batches}
          onChange={e => set('batches', e.target.value)}
          placeholder="e.g. Advanced Morning, Advanced Evening"
          className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
        />
      </div>

      {/* Schedule — visual picker */}
      <div>
        <SchedulePicker
          label="Schedule"
          value={form.schedule}
          onChange={v => set('schedule', v)}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <Button size="sm" variant="primary" onClick={handleSave} disabled={!valid}>
          <Check size={13} /> Save
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          <X size={13} /> Cancel
        </Button>
      </div>
    </div>
  )
}

export default function AdminCoaches() {
  const [coaches, setCoaches] = useLocalData('smash_coaches', initialCoaches)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleAdd = (form) => {
    setCoaches(prev => [...prev, { ...form, id: 'C' + Date.now() }])
    setAdding(false)
  }

  const handleEdit = (form) => {
    setCoaches(prev => prev.map(c => c.id === editing ? { ...c, ...form } : c))
    setEditing(null)
  }

  const handleDelete = (id) => {
    setCoaches(prev => prev.filter(c => c.id !== id))
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Coaches</h1>
          <p className="text-muted text-sm mt-1">Manage coaching staff and batch assignments.</p>
        </div>
        {!adding && (
          <Button variant="primary" size="sm" onClick={() => { setAdding(true); setEditing(null) }}>
            <Plus size={14} /> Add Coach
          </Button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <p className="text-sm font-semibold mb-4">New Coach</p>
          <CoachForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        </div>
      )}

      {/* Coach cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {coaches.map((coach, i) => (
          <div key={coach.id} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all">
            {editing === coach.id ? (
              <>
                <p className="text-sm font-semibold mb-4">Edit Coach</p>
                <CoachForm
                  initial={coach}
                  onSave={handleEdit}
                  onCancel={() => setEditing(null)}
                />
              </>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-accent/10 ${coachColors[i % coachColors.length]}`}>
                      <span className="font-heading font-bold text-lg">
                        {coach.name.split(' ').slice(-1)[0][0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-heading font-bold leading-tight">{coach.name}</p>
                      <p className={`text-xs font-medium mt-0.5 ${coachColors[i % coachColors.length]}`}>
                        {coach.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => { setEditing(coach.id); setAdding(false) }}
                      className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors"
                      title="Edit coach"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(coach.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-colors"
                      title="Delete coach"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {coach.batches?.length > 0 && (
                    <div>
                      <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1.5">Batches</p>
                      <div className="flex flex-wrap gap-1.5">
                        {coach.batches.map(b => (
                          <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-muted">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {coach.schedule?.length > 0 && (
                    <div>
                      <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Schedule</p>
                      {coach.schedule.map(s => (
                        <p key={s} className="text-xs text-muted">{s}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs border-t border-border pt-3">
                    <span className="text-muted">Experience</span>
                    <span className="font-medium">{coach.experience || '—'}</span>
                  </div>

                  {coach.phone && (
                    <a
                      href={`tel:${coach.phone}`}
                      className="flex items-center gap-2 text-xs text-accent hover:underline"
                    >
                      <Phone size={12} />
                      +91 {coach.phone}
                    </a>
                  )}
                </div>

                {deleteConfirm === coach.id && (
                  <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-red-300 font-medium">Delete "{coach.name}"?</p>
                      <p className="text-xs text-muted mt-0.5">This removes them from the public Coaching page too.</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleDelete(coach.id)}
                          className="text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg transition-colors"
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-muted hover:text-text px-2 py-1 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {coaches.length === 0 && !adding && (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">No coaches yet.</p>
          <button onClick={() => setAdding(true)} className="mt-3 text-accent text-sm hover:underline">
            Add your first coach →
          </button>
        </div>
      )}
    </div>
  )
}
