import { useState } from 'react'
import { Pin, Edit2, Trash2, Plus, Check, X } from 'lucide-react'
import { announcements as initial } from '../../data/announcements'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

let nextId = 'A005'

export default function AdminAnnouncements() {
  const [list, setList] = useState(initial)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', content: '' })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const save = () => {
    if (!form.title.trim()) return
    if (editing) {
      setList(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a))
      setEditing(null)
    } else {
      setList(prev => [{
        id: nextId++,
        ...form,
        pinned: false,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      }, ...prev])
      setCreating(false)
    }
    setForm({ title: '', content: '' })
  }

  const startEdit = (a) => {
    setEditing(a.id)
    setForm({ title: a.title, content: a.content })
    setCreating(false)
  }

  const togglePin = (id) => setList(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a))
  const del = (id) => setList(prev => prev.filter(a => a.id !== id))

  const sorted = [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Announcements</h1>
          <p className="text-muted text-sm mt-1">Pinned announcements appear on the homepage.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => { setCreating(true); setEditing(null); setForm({ title: '', content: '' }) }}>
          <Plus size={14} /> New
        </Button>
      </div>

      {/* Create / Edit form */}
      {(creating || editing) && (
        <div className="bg-card border border-accent/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-sm">{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Announcement content..."
            rows={3}
            className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={save}><Check size={13} /> Save</Button>
            <Button size="sm" variant="ghost" onClick={() => { setCreating(false); setEditing(null) }}><X size={13} /> Cancel</Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {sorted.map(a => (
          <div key={a.id} className={`bg-card border rounded-2xl p-5 transition-all ${a.pinned ? 'border-accent/30' : 'border-border'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-heading font-bold text-sm">{a.title}</h3>
                  {a.pinned && <Badge status="pinned" />}
                </div>
                <p className="text-sm text-muted leading-relaxed">{a.content}</p>
                <p className="text-xs text-muted/60 mt-2">{a.date}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePin(a.id)}
                  className={`p-1.5 rounded-lg transition-colors ${a.pinned ? 'text-accent hover:bg-accent/10' : 'text-muted hover:text-text hover:bg-surface'}`}
                  title={a.pinned ? 'Unpin' : 'Pin'}
                >
                  <Pin size={14} />
                </button>
                <button
                  onClick={() => startEdit(a)}
                  className="p-1.5 rounded-lg text-muted hover:text-text hover:bg-surface transition-colors"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => del(a.id)}
                  className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
