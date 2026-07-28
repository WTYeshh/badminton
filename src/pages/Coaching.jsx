import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar, Users, Phone, Edit2, Trash2, Plus, X, Check, AlertTriangle } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { FadeUp, AnimatedTitle, ScaleIn } from '../components/ui/ScrollReveal'
import { programs as initialPrograms } from '../data/programs'
import { coaches as initialCoaches } from '../data/coaches'
import { useLocalData } from '../hooks/useLocalData'
import { useAdminAuth } from '../context/AdminAuthContext'

const colorMap = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20 hover:border-accent/60', editBorder: 'border-accent/40' },
  blue:   { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20 hover:border-blue-400/60', editBorder: 'border-blue-400/40' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20 hover:border-purple-400/60', editBorder: 'border-purple-400/40' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20 hover:border-orange-400/60', editBorder: 'border-orange-400/40' },
  pink:   { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20 hover:border-pink-400/60', editBorder: 'border-pink-400/40' },
}

const COLOR_OPTIONS = [
  { value: 'accent', label: 'Green', cls: 'bg-accent' },
  { value: 'blue',   label: 'Blue',   cls: 'bg-blue-400' },
  { value: 'purple', label: 'Purple', cls: 'bg-purple-400' },
  { value: 'orange', label: 'Orange', cls: 'bg-orange-400' },
  { value: 'pink',   label: 'Pink',   cls: 'bg-pink-400' },
]

const coachColors = ['text-accent', 'text-blue-400', 'text-purple-400', 'text-orange-400']

const emptyProgram = { name: '', ageGroup: '', timing: '', coach: '', description: '', color: 'accent' }
const emptyCoach   = { name: '', specialization: '', experience: '', phone: '', batches: '', schedule: '' }

/* ─── Inline Program Edit Form ─── */
function ProgramEditForm({ initial = emptyProgram, onSave, onCancel }) {
  const [form, setForm] = useState(initial)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const valid = form.name.trim() && form.ageGroup.trim()

  return (
    <div className="space-y-3 p-1">
      <div className="grid grid-cols-1 gap-2">
        {[
          { key: 'name', label: 'Batch Name *', ph: 'e.g. Kids' },
          { key: 'ageGroup', label: 'Age Group *', ph: 'e.g. 6–12 years' },
          { key: 'timing', label: 'Timing', ph: 'e.g. Sat & Sun: 8:00–10:00 AM' },
          { key: 'coach', label: 'Coach', ph: 'e.g. Coach Arun Thomas' },
        ].map(({ key, label, ph }) => (
          <div key={key} className="space-y-0.5">
            <label className="text-xs text-muted uppercase tracking-wider">{label}</label>
            <input
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              placeholder={ph}
              className="w-full bg-surface border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-accent/60"
            />
          </div>
        ))}
        <div className="space-y-0.5">
          <label className="text-xs text-muted uppercase tracking-wider">Description</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={2}
            placeholder="Short description…"
            className="w-full bg-surface border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-accent/60 resize-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted uppercase tracking-wider">Accent Colour</label>
          <div className="flex gap-2">
            {COLOR_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => set('color', opt.value)}
                className={`w-6 h-6 rounded-full ${opt.cls} ring-offset-2 ring-offset-card transition-all ${
                  form.color === opt.value ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                }`}
                title={opt.label}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => valid && onSave(form)}
          disabled={!valid}
          className="flex items-center gap-1 text-xs bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
        >
          <Check size={11} /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-xs text-muted hover:text-text px-2 py-1.5 rounded-lg transition-colors"
        >
          <X size={11} /> Cancel
        </button>
      </div>
    </div>
  )
}

/* ─── Inline Coach Edit Form ─── */
function CoachEditForm({ initial = emptyCoach, onSave, onCancel }) {
  const initForm = initial
    ? { ...initial, batches: Array.isArray(initial.batches) ? initial.batches.join(', ') : (initial.batches || ''), schedule: Array.isArray(initial.schedule) ? initial.schedule.join(', ') : (initial.schedule || '') }
    : emptyCoach

  const [form, setForm] = useState(initForm)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const valid = form.name.trim() && form.specialization.trim()

  const handleSave = () => {
    if (!valid) return
    onSave({
      ...form,
      batches:  form.batches.split(',').map(s => s.trim()).filter(Boolean),
      schedule: form.schedule.split(',').map(s => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-3 p-1">
      {[
        { key: 'name', label: 'Full Name *', ph: 'e.g. Coach Rajesh Kumar' },
        { key: 'specialization', label: 'Specialization *', ph: 'e.g. Advanced & Competitive' },
        { key: 'experience', label: 'Experience', ph: 'e.g. 8 years' },
        { key: 'phone', label: 'Phone (10 digits)', ph: '9876543001' },
      ].map(({ key, label, ph }) => (
        <div key={key} className="space-y-0.5">
          <label className="text-xs text-muted uppercase tracking-wider">{label}</label>
          <input
            value={form[key]}
            onChange={e => {
              const val = key === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
              set(key, val)
            }}
            placeholder={ph}
            className="w-full bg-surface border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-accent/60"
          />
        </div>
      ))}
      <div className="space-y-0.5">
        <label className="text-xs text-muted uppercase tracking-wider">Batches <span className="normal-case">(comma-separated)</span></label>
        <input
          value={form.batches}
          onChange={e => set('batches', e.target.value)}
          placeholder="e.g. Advanced Morning, Advanced Evening"
          className="w-full bg-surface border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-accent/60"
        />
      </div>
      <div className="space-y-0.5">
        <label className="text-xs text-muted uppercase tracking-wider">Schedule <span className="normal-case">(comma-separated)</span></label>
        <input
          value={form.schedule}
          onChange={e => set('schedule', e.target.value)}
          placeholder="e.g. Mon–Fri: 6:00–8:00 AM, Mon–Fri: 6:00–8:00 PM"
          className="w-full bg-surface border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-accent/60"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSave}
          disabled={!valid}
          className="flex items-center gap-1 text-xs bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
        >
          <Check size={11} /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-xs text-muted hover:text-text px-2 py-1.5 rounded-lg transition-colors"
        >
          <X size={11} /> Cancel
        </button>
      </div>
    </div>
  )
}

/* ─── Main Coaching Page ─── */
export default function Coaching() {
  const location   = useLocation()
  const teamRef    = useRef(null)
  const { isAuthenticated } = useAdminAuth()

  const [programs, setPrograms] = useLocalData('smash_programs', initialPrograms)
  const [coaches,  setCoaches]  = useLocalData('smash_coaches',  initialCoaches)

  // Program edit state
  const [editingProgram, setEditingProgram] = useState(null)   // program id
  const [deletingProgram, setDeletingProgram] = useState(null) // program id
  const [addingProgram, setAddingProgram] = useState(false)

  // Coach edit state
  const [editingCoach, setEditingCoach] = useState(null)   // coach id
  const [deletingCoach, setDeletingCoach] = useState(null) // coach id
  const [addingCoach, setAddingCoach] = useState(false)

  useEffect(() => {
    if (location.hash === '#meet-the-team' && teamRef.current) {
      setTimeout(() => {
        teamRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [location.hash])

  const scrollToTeam = () => teamRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  // Program handlers
  const handleAddProgram = (form) => {
    setPrograms(prev => [...prev, { ...form, id: 'P' + Date.now() }])
    setAddingProgram(false)
  }
  const handleEditProgram = (form) => {
    setPrograms(prev => prev.map(p => p.id === editingProgram ? { ...p, ...form } : p))
    setEditingProgram(null)
  }
  const handleDeleteProgram = (id) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
    setDeletingProgram(null)
  }

  // Coach handlers
  const handleAddCoach = (form) => {
    setCoaches(prev => [...prev, { ...form, id: 'C' + Date.now() }])
    setAddingCoach(false)
  }
  const handleEditCoach = (form) => {
    setCoaches(prev => prev.map(c => c.id === editingCoach ? { ...c, ...form } : c))
    setEditingCoach(null)
  }
  const handleDeleteCoach = (id) => {
    setCoaches(prev => prev.filter(c => c.id !== id))
    setDeletingCoach(null)
  }

  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <FadeUp className="text-center space-y-4 mb-16 sm:mb-20">
          <SectionLabel>Coaching Programs</SectionLabel>
          <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
            Train with the Best
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Structured programs for all ages and skill levels, led by expert coaches.
          </p>
        </FadeUp>

        {/* ── Programs ── */}
        <div className="mb-24 sm:mb-28">
          {/* Admin: header row with Add button */}
          {isAuthenticated && (
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs text-accent font-semibold uppercase tracking-widest">Admin — Batch Cards</span>
              {!addingProgram && (
                <button
                  onClick={() => { setAddingProgram(true); setEditingProgram(null) }}
                  className="flex items-center gap-1.5 text-xs bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus size={12} /> Add Batch
                </button>
              )}
            </div>
          )}

          {/* Add Program Form */}
          {isAuthenticated && addingProgram && (
            <div className="bg-card border border-accent/30 rounded-2xl p-5 mb-5">
              <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">New Batch</p>
              <ProgramEditForm
                onSave={handleAddProgram}
                onCancel={() => setAddingProgram(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {programs.map((p, i) => {
              const c = colorMap[p.color] ?? colorMap.accent
              return (
                <ScaleIn key={p.id} delay={i * 0.07}>
                  <div className={`bg-card border rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-200 ${isAuthenticated ? c.editBorder : c.border.split(' ')[0]} ${!isAuthenticated ? 'hover:-translate-y-1' : ''}`}>
                    {isAuthenticated && (
                      <div className={`${c.bg} px-4 py-2 flex items-center justify-between`}>
                        <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{p.name}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setEditingProgram(p.id); setAddingProgram(false); setDeletingProgram(null) }}
                            className="p-1 rounded-lg hover:bg-white/10 text-muted hover:text-text transition-colors"
                            title="Edit batch"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => setDeletingProgram(p.id)}
                            className="p-1 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-colors"
                            title="Delete batch"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    )}

                    {editingProgram === p.id ? (
                      <div className="p-4 flex-1">
                        <ProgramEditForm
                          initial={p}
                          onSave={handleEditProgram}
                          onCancel={() => setEditingProgram(null)}
                        />
                      </div>
                    ) : (
                      <div className="p-6 h-full flex flex-col gap-5 flex-1">
                        {!isAuthenticated && (
                          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                            <span className={`text-lg font-black ${c.text}`}>{p.name[0]}</span>
                          </div>
                        )}
                        <div>
                          {!isAuthenticated && (
                            <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{p.name}</span>
                          )}
                          <h3 className="font-heading text-xl font-bold mt-1">{p.ageGroup}</h3>
                          <p className="text-sm text-muted mt-2 leading-relaxed">{p.description}</p>
                        </div>
                        <div className="space-y-2 flex-1">
                          {p.timing && (
                            <div className="flex items-start gap-2 text-xs text-muted">
                              <Calendar size={12} className="mt-0.5 shrink-0" />
                              <span>{p.timing}</span>
                            </div>
                          )}
                          {p.coach && (
                            <div className="flex items-start gap-2 text-xs text-muted">
                              <Users size={12} className="mt-0.5 shrink-0" />
                              <span>{p.coach}</span>
                            </div>
                          )}
                        </div>
                        {!isAuthenticated && (
                          <Button variant="secondary" size="sm" className="w-full" onClick={scrollToTeam}>
                            Join Batch
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Delete confirm */}
                    {deletingProgram === p.id && (
                      <div className="px-4 pb-4">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                          <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-red-300 font-medium">Delete "{p.name}" batch?</p>
                            <p className="text-xs text-muted mt-0.5">Removes it from the public page.</p>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleDeleteProgram(p.id)}
                                className="text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg transition-colors"
                              >
                                Yes, delete
                              </button>
                              <button
                                onClick={() => setDeletingProgram(null)}
                                className="text-xs text-muted hover:text-text px-2 py-1 rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScaleIn>
              )
            })}
          </div>
        </div>

        {/* ── Meet the Team ── */}
        <div ref={teamRef} id="meet-the-team" className="scroll-mt-24">
          <FadeUp className="text-center space-y-4 mb-10 sm:mb-12">
            <SectionLabel>Our Coaches</SectionLabel>
            <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl font-black">
              Meet the Team
            </AnimatedTitle>
            <p className="text-muted max-w-sm mx-auto text-sm">
              Get in touch directly with any coach to enquire about joining a batch.
            </p>
          </FadeUp>

          {/* Admin: Add Coach button */}
          {isAuthenticated && (
            <div className="flex items-center justify-between mb-5 px-1">
              <span className="text-xs text-accent font-semibold uppercase tracking-widest">Admin — Coaches</span>
              {!addingCoach && (
                <button
                  onClick={() => { setAddingCoach(true); setEditingCoach(null) }}
                  className="flex items-center gap-1.5 text-xs bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus size={12} /> Add Coach
                </button>
              )}
            </div>
          )}

          {/* Add Coach Form */}
          {isAuthenticated && addingCoach && (
            <div className="bg-card border border-accent/30 rounded-2xl p-5 mb-5">
              <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">New Coach</p>
              <CoachEditForm
                onSave={handleAddCoach}
                onCancel={() => setAddingCoach(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coaches.map((coach, i) => (
              <ScaleIn key={coach.id} delay={i * 0.08}>
                <div className={`bg-card border rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 ${isAuthenticated ? 'border-border/60' : 'border-border hover:border-accent/30 hover:-translate-y-1'}`}>

                  {/* Admin action bar */}
                  {isAuthenticated && (
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-black bg-accent/10 ${coachColors[i % coachColors.length]}`}>
                        {coach.name.split(' ').slice(-1)[0][0]}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => { setEditingCoach(coach.id); setAddingCoach(false); setDeletingCoach(null) }}
                          className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors"
                          title="Edit coach"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeletingCoach(coach.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-colors"
                          title="Delete coach"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {editingCoach === coach.id ? (
                    <div className="p-4 flex-1">
                      <CoachEditForm
                        initial={coach}
                        onSave={handleEditCoach}
                        onCancel={() => setEditingCoach(null)}
                      />
                    </div>
                  ) : (
                    <div className="p-6 flex flex-col gap-5 flex-1">
                      {!isAuthenticated && (
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black bg-accent/10 ${coachColors[i % coachColors.length]}`}>
                          {coach.name.split(' ').slice(-1)[0][0]}
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="font-heading text-base font-bold leading-tight">{coach.name}</h3>
                        <p className={`text-xs font-medium mt-1 ${coachColors[i % coachColors.length]}`}>{coach.specialization}</p>
                        {coach.experience && <p className="text-xs text-muted mt-1">{coach.experience} experience</p>}
                      </div>

                      {coach.batches?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider font-medium mb-2">Batches</p>
                          <div className="flex flex-wrap gap-1.5">
                            {coach.batches.map(b => (
                              <span key={b} className="text-xs bg-surface border border-border rounded-lg px-2 py-0.5">{b}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {coach.schedule?.length > 0 && (
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider font-medium mb-2">Schedule</p>
                          <div className="space-y-1">
                            {coach.schedule.map(s => (
                              <p key={s} className="text-xs text-muted">{s}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {coach.phone && (
                        <a href={`tel:${coach.phone}`} className="flex items-center gap-2 text-sm text-accent hover:underline">
                          <Phone size={14} />
                          +91 {coach.phone}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Delete confirm */}
                  {deletingCoach === coach.id && (
                    <div className="px-4 pb-4">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                        <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-red-300 font-medium">Delete "{coach.name}"?</p>
                          <p className="text-xs text-muted mt-0.5">Removes them from this page.</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleDeleteCoach(coach.id)}
                              className="text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 px-3 py-1 rounded-lg transition-colors"
                            >
                              Yes, delete
                            </button>
                            <button
                              onClick={() => setDeletingCoach(null)}
                              className="text-xs text-muted hover:text-text px-2 py-1 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScaleIn>
            ))}
          </div>

          {coaches.length === 0 && !addingCoach && isAuthenticated && (
            <div className="text-center py-12 text-muted">
              <p className="text-sm">No coaches yet.</p>
              <button onClick={() => setAddingCoach(true)} className="mt-3 text-accent text-sm hover:underline">
                Add your first coach →
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
