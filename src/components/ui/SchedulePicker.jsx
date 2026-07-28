/**
 * SchedulePicker — visual popup for selecting day(s) + time range.
 *
 * Props:
 *   value    : string[]   — list of schedule strings e.g. ["Mon–Fri: 6:00–8:00 AM"]
 *   onChange : (string[]) => void
 *   label    : string     — optional field label
 *   single   : bool       — if true, only one slot allowed (replaces instead of appending)
 */
import { useState, useRef, useEffect } from 'react'
import { Plus, X, Clock, ChevronDown } from 'lucide-react'

const DAYS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = ['5','6','7','8','9','10','11','12','1','2','3','4','5','6','7','8','9','10']
const MINS  = ['00', '15', '30', '45']

function buildPeriods(h12) {
  // Returns sensible default period for a 12-based hour
  const n = parseInt(h12, 10)
  return n >= 5 && n <= 11 ? 'AM' : 'PM'
}

function formatDays(sel) {
  if (!sel || !sel.length) return ''
  const indices = sel.map(d => DAYS.indexOf(d)).sort((a, b) => a - b)
  if (indices.length === 7) return 'Mon–Sun'
  if (indices.length === 1) return DAYS[indices[0]]
  const consecutive = indices.every((v, i) => i === 0 || v === indices[i - 1] + 1)
  if (consecutive) return `${DAYS[indices[0]]}–${DAYS[indices[indices.length - 1]]}`
  if (indices.length === 2 && sel.includes('Sat') && sel.includes('Sun')) return 'Sat & Sun'
  return sel.join(', ')
}

function buildSlotStr({ days, sH, sM, sP, eH, eM, eP }) {
  const dayStr = formatDays(days)
  if (!dayStr) return ''
  const startStr = `${sH}:${sM}`
  const endStr   = `${eH}:${eM}`
  if (sP === eP) return `${dayStr}: ${startStr}–${endStr} ${sP}`
  return `${dayStr}: ${startStr} ${sP}–${endStr} ${eP}`
}

const SEL_CLS = 'bg-surface border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-accent/50 appearance-none pr-5'

function TimeSelect({ h, m, p, onH, onM, onP }) {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <select value={h} onChange={e => onH(e.target.value)} className={SEL_CLS + ' w-12'}>
          {HOURS.map(v => <option key={v}>{v}</option>)}
        </select>
        <ChevronDown size={9} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      <span className="text-xs text-muted">:</span>
      <div className="relative">
        <select value={m} onChange={e => onM(e.target.value)} className={SEL_CLS + ' w-14'}>
          {MINS.map(v => <option key={v}>{v}</option>)}
        </select>
        <ChevronDown size={9} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      <div className="relative">
        <select value={p} onChange={e => onP(e.target.value)} className={SEL_CLS + ' w-14'}>
          <option>AM</option>
          <option>PM</option>
        </select>
        <ChevronDown size={9} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  )
}

export default function SchedulePicker({ value = [], onChange, label, single = false }) {
  const [open, setOpen] = useState(false)
  const [days, setDays] = useState([])
  const [sH, setSH]   = useState('6')
  const [sM, setSM]   = useState('00')
  const [sP, setSP]   = useState('AM')
  const [eH, setEH]   = useState('8')
  const [eM, setEM]   = useState('00')
  const [eP, setEP]   = useState('AM')

  const ref = useRef()
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleDay = (d) => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  const preview = buildSlotStr({ days, sH, sM, sP, eH, eM, eP })

  const addSlot = () => {
    if (!preview) return
    onChange(single ? [preview] : [...value, preview])
    setDays([])
    setOpen(false)
  }

  const removeSlot = (i) => onChange(value.filter((_, idx) => idx !== i))

  // Day-range shortcuts
  const shortcuts = [
    { label: 'Mon–Fri', days: ['Mon','Tue','Wed','Thu','Fri'] },
    { label: 'Sat & Sun', days: ['Sat','Sun'] },
    { label: 'Mon–Sat', days: ['Mon','Tue','Wed','Thu','Fri','Sat'] },
    { label: 'All', days: DAYS },
  ]

  return (
    <div className="relative" ref={ref}>
      {label && <p className="text-xs text-muted uppercase tracking-wider mb-2">{label}</p>}

      {/* Current slots as removable tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {value.map((slot, i) => (
            <span key={i} className="flex items-center gap-1 text-xs bg-accent/5 border border-accent/20 text-accent rounded-lg px-2.5 py-1">
              <Clock size={10} />
              <span>{slot}</span>
              <button type="button" onClick={() => removeSlot(i)} className="ml-0.5 text-accent/60 hover:text-red-400 transition-colors">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs bg-surface border border-border hover:border-accent/40 rounded-xl px-3 py-2 text-muted hover:text-text transition-colors"
      >
        <Plus size={11} />
        {single && value.length > 0 ? 'Change Slot' : 'Add Schedule Slot'}
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute left-0 mt-2 z-50 bg-card border border-border rounded-2xl p-4 shadow-2xl w-80 space-y-3">
          {/* Shortcuts */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Quick select days</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {shortcuts.map(s => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setDays(s.days)}
                  className={`text-xs px-2 py-1 rounded-lg border transition-colors ${
                    JSON.stringify([...days].sort()) === JSON.stringify([...s.days].sort())
                      ? 'bg-accent/20 border-accent/40 text-accent'
                      : 'bg-surface border-border text-muted hover:border-accent/30'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Individual day toggles */}
            <div className="flex gap-1">
              {DAYS.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`flex-1 text-xs py-1 rounded-lg border transition-colors ${
                    days.includes(d)
                      ? 'bg-accent/20 border-accent/40 text-accent font-medium'
                      : 'bg-surface border-border text-muted hover:text-text'
                  }`}
                >
                  {d[0]}
                </button>
              ))}
            </div>
            {days.length > 0 && (
              <p className="text-xs text-accent mt-1.5">{formatDays(days)}</p>
            )}
          </div>

          {/* Time from / to */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted uppercase tracking-wider w-8">From</p>
              <TimeSelect h={sH} m={sM} p={sP} onH={setSH} onM={setSM} onP={setSP} />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted uppercase tracking-wider w-8">To</p>
              <TimeSelect h={eH} m={eM} p={eP} onH={setEH} onM={setEM} onP={setEP} />
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="text-xs text-accent font-mono bg-accent/5 border border-accent/20 rounded-xl px-3 py-2">
              {preview}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={addSlot}
              disabled={!preview}
              className="flex-1 text-xs bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent px-3 py-2 rounded-xl transition-colors disabled:opacity-40 font-medium"
            >
              + Add Slot
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-muted hover:text-text px-3 py-2 rounded-xl border border-border transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
