import { useState } from 'react'
import { Plus, Edit2, Trash2, X, Check, AlertTriangle } from 'lucide-react'
import { programs as initialPrograms } from '../../data/programs'
import { useLocalData } from '../../hooks/useLocalData'
import Button from '../../components/ui/Button'

const COLOR_OPTIONS = [
  { value: 'accent',  label: 'Green',  class: 'bg-accent' },
  { value: 'blue',    label: 'Blue',   class: 'bg-blue-400' },
  { value: 'purple',  label: 'Purple', class: 'bg-purple-400' },
  { value: 'orange',  label: 'Orange', class: 'bg-orange-400' },
  { value: 'pink',    label: 'Pink',   class: 'bg-pink-400' },
]

const colorMap = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/40' },
  blue:   { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/40' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-400/40' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-400/40' },
  pink:   { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-400/40' },
}

const emptyForm = {
  name: '', ageGroup: '', timing: '', coach: '', description: '', color: 'accent',
}

function ProgramForm({ initial = emptyForm, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const valid = form.name.trim() && form.ageGroup.trim()

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Batch Name *</label>
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Kids"
            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Age Group *</label>
          <input
            value={form.ageGroup}
            onChange={e => set('ageGroup', e.target.value)}
            placeholder="e.g. 6–12 years"
            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Timing</label>
          <input
            value={form.timing}
            onChange={e => set('timing', e.target.value)}
            placeholder="e.g. Mon–Fri: 7:00–8:30 AM"
            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Coach</label>
          <input
            value={form.coach}
            onChange={e => set('coach', e.target.value)}
            placeholder="e.g. Coach Arun Thomas"
            className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted uppercase tracking-wider">Description</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={2}
          placeholder="Short description of this batch…"
          className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent/60 resize-none"
        />
      </div>

      {/* Color picker */}
      <div className="space-y-2">
        <label className="text-xs text-muted uppercase tracking-wider">Card Accent Colour</label>
        <div className="flex gap-3">
          {COLOR_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => set('color', opt.value)}
              className={`w-8 h-8 rounded-full ${opt.class} ring-offset-2 ring-offset-surface transition-all ${
                form.color === opt.value ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title={opt.label}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button size="sm" variant="primary" onClick={() => valid && onSave(form)} disabled={!valid}>
          <Check size={13} /> Save
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          <X size={13} /> Cancel
        </Button>
      </div>
    </div>
  )
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useLocalData('smash_programs', initialPrograms)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null) // program id
  const [deleteConfirm, setDeleteConfirm] = useState(null) // program id

  const handleAdd = (form) => {
    const newProgram = {
      ...form,
      id: 'P' + Date.now(),
    }
    setPrograms(prev => [...prev, newProgram])
    setAdding(false)
  }

  const handleEdit = (form) => {
    setPrograms(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p))
    setEditing(null)
  }

  const handleDelete = (id) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
    setDeleteConfirm(null)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Batch Programs</h1>
          <p className="text-muted text-sm mt-1">Manage the coaching batch cards shown on the public Coaching page.</p>
        </div>
        {!adding && (
          <Button variant="primary" size="sm" onClick={() => { setAdding(true); setEditing(null) }}>
            <Plus size={14} /> Add Batch
          </Button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <ProgramForm
          onSave={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      {/* Program cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map(p => {
          const c = colorMap[p.color] ?? colorMap.accent
          return (
            <div key={p.id} className={`bg-card border rounded-2xl overflow-hidden transition-all ${c.border}`}>
              {editing === p.id ? (
                <div className="p-5">
                  <ProgramForm
                    initial={p}
                    onSave={handleEdit}
                    onCancel={() => setEditing(null)}
                  />
                </div>
              ) : (
                <>
                  {/* Card top */}
                  <div className={`${c.bg} px-5 py-3 flex items-center justify-between`}>
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{p.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditing(p.id); setAdding(false) }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-muted hover:text-text transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="font-heading text-lg font-bold">{p.ageGroup}</p>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{p.description}</p>
                    </div>
                    <div className="text-xs text-muted space-y-1 pt-1">
                      {p.timing && <p>🕐 {p.timing}</p>}
                      {p.coach  && <p>👤 {p.coach}</p>}
                    </div>
                  </div>

                  {/* Delete confirm */}
                  {deleteConfirm === p.id && (
                    <div className="px-5 pb-5">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                        <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-red-300 font-medium">Delete "{p.name}" batch?</p>
                          <p className="text-xs text-muted mt-0.5">This removes it from the public Coaching page.</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleDelete(p.id)}
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
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {programs.length === 0 && !adding && (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">No batch programs yet.</p>
          <button onClick={() => setAdding(true)} className="mt-3 text-accent text-sm hover:underline">
            Add your first batch →
          </button>
        </div>
      )}
    </div>
  )
}
