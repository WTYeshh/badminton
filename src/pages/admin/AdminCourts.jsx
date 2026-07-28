import { useState } from 'react'
import { Wrench, Eye, EyeOff, Edit2, Check, X } from 'lucide-react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

export default function AdminCourts() {
  const [courtList, setCourtList] = useState(() =>
    Array.from({ length: 11 }, (_, i) => ({
      id: i + 1,
      name: `Court ${i + 1}`,
      status: i === 3 ? 'maintenance' : i % 3 === 1 ? 'booked' : 'available',
      floor: i % 2 === 0 ? 'Wooden' : 'Synthetic',
      lighting: 'LED',
      enabled: i !== 3,
    }))
  )
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})

  const toggle = (id) => {
    setCourtList(prev => prev.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled, status: c.enabled ? 'maintenance' : 'available' } : c
    ))
  }

  const setMaintenance = (id) => {
    setCourtList(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'maintenance' ? 'available' : 'maintenance' } : c
    ))
  }

  const startEdit = (court) => {
    setEditing(court.id)
    setEditForm({ name: court.name, floor: court.floor, lighting: court.lighting })
  }

  const saveEdit = (id) => {
    setCourtList(prev => prev.map(c => c.id === id ? { ...c, ...editForm } : c))
    setEditing(null)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Court Management</h1>
        <p className="text-muted text-sm mt-1">Enable, disable, and manage all 11 courts.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['Court', 'Status', 'Floor', 'Lighting', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courtList.map((court, i) => (
                <tr key={court.id} className={`border-b border-border last:border-0 hover:bg-surface/50 transition-colors ${i % 2 === 1 ? 'bg-surface/20' : ''}`}>
                  <td className="px-5 py-4">
                    {editing === court.id ? (
                      <input
                        value={editForm.name}
                        onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                        className="bg-surface border border-border rounded-lg px-2 py-1 text-sm w-28 focus:outline-none focus:border-accent/50"
                      />
                    ) : (
                      <span className="font-medium">{court.name}</span>
                    )}
                  </td>
                  <td className="px-5 py-4"><Badge status={court.enabled ? court.status : 'booked'} label={court.enabled ? undefined : 'Disabled'} /></td>
                  <td className="px-5 py-4 text-muted">
                    {editing === court.id ? (
                      <select
                        value={editForm.floor}
                        onChange={e => setEditForm(p => ({ ...p, floor: e.target.value }))}
                        className="bg-surface border border-border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-accent/50"
                      >
                        <option>Wooden</option>
                        <option>Synthetic</option>
                      </select>
                    ) : court.floor}
                  </td>
                  <td className="px-5 py-4 text-muted">{court.lighting}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {editing === court.id ? (
                        <>
                          <Button size="sm" variant="primary" onClick={() => saveEdit(court.id)}>
                            <Check size={13} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                            <X size={13} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => startEdit(court)}>
                            <Edit2 size={13} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => toggle(court.id)}>
                            {court.enabled ? <EyeOff size={13} /> : <Eye size={13} />}
                          </Button>
                          <Button
                            size="sm"
                            variant={court.status === 'maintenance' ? 'secondary' : 'ghost'}
                            onClick={() => setMaintenance(court.id)}
                          >
                            <Wrench size={13} />
                          </Button>
                        </>
                      )}
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
