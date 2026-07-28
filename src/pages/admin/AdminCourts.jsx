import { useState } from 'react'
import { Wrench, Edit2, Check, X, ToggleLeft, ToggleRight } from 'lucide-react'
import { courts as initialCourts } from '../../data/courts'
import { useLocalData } from '../../hooks/useLocalData'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

function Switch({ on, onChange, title }) {
  return (
    <button
      onClick={onChange}
      title={title}
      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${on ? 'text-accent' : 'text-muted'}`}
    >
      {on
        ? <ToggleRight size={22} className="text-accent" />
        : <ToggleLeft  size={22} className="text-zinc-500" />
      }
      <span className="w-6">{on ? 'On' : 'Off'}</span>
    </button>
  )
}

export default function AdminCourts() {
  const [courtList, setCourtList] = useLocalData('smash_courts', initialCourts)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})

  const toggleEnabled = (id) => {
    setCourtList(prev => prev.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled, status: !c.enabled ? 'available' : c.status } : c
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
        <p className="text-muted text-sm mt-1">
          Enable/disable courts. <span className="text-accent font-medium">On = visible on booking page.</span> Off = hidden from public.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['Court', 'Booking Visibility', 'Status', 'Floor', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courtList.map((court, i) => (
                <tr key={court.id} className={`border-b border-border last:border-0 hover:bg-surface/50 transition-colors ${i % 2 === 1 ? 'bg-surface/20' : ''}`}>
                  {/* Court name */}
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

                  {/* Visibility toggle */}
                  <td className="px-5 py-4">
                    <Switch
                      on={court.enabled}
                      onChange={() => toggleEnabled(court.id)}
                      title={court.enabled ? 'Click to hide from booking page' : 'Click to show on booking page'}
                    />
                  </td>

                  {/* Status badge */}
                  <td className="px-5 py-4">
                    <Badge
                      status={!court.enabled ? 'maintenance' : court.status}
                      label={!court.enabled ? 'Hidden' : undefined}
                    />
                  </td>

                  {/* Floor */}
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

                  {/* Actions */}
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
                          <Button size="sm" variant="ghost" onClick={() => startEdit(court)} title="Edit court">
                            <Edit2 size={13} />
                          </Button>
                          <Button
                            size="sm"
                            variant={court.status === 'maintenance' ? 'secondary' : 'ghost'}
                            onClick={() => setMaintenance(court.id)}
                            title="Toggle maintenance"
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
