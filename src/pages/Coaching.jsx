import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar, Users, Phone } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { FadeUp, AnimatedTitle, ScaleIn } from '../components/ui/ScrollReveal'
import { programs as initialPrograms } from '../data/programs'
import { coaches as initialCoaches } from '../data/coaches'
import { useLocalData } from '../hooks/useLocalData'

const colorMap = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20 hover:border-accent/60' },
  blue:   { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20 hover:border-blue-400/60' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20 hover:border-purple-400/60' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20 hover:border-orange-400/60' },
  pink:   { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20 hover:border-pink-400/60' },
}

const coachColors = ['text-accent', 'text-blue-400', 'text-purple-400', 'text-orange-400']

export default function Coaching() {
  const location = useLocation()
  const teamRef  = useRef(null)

  // Read live data from localStorage (admin changes reflect here immediately)
  const [programs] = useLocalData('smash_programs', initialPrograms)
  const [coaches]  = useLocalData('smash_coaches',  initialCoaches)

  // If navigated with #meet-the-team hash, scroll down to coaches section
  useEffect(() => {
    if (location.hash === '#meet-the-team' && teamRef.current) {
      setTimeout(() => {
        teamRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [location.hash])

  const scrollToTeam = () => {
    teamRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-24 sm:mb-28">
          {programs.map((p, i) => {
            const c = colorMap[p.color] ?? colorMap.accent
            return (
              <ScaleIn key={p.id} delay={i * 0.07}>
                <div className={`bg-card border rounded-2xl p-6 h-full flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 ${c.border}`}>
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                    <span className={`text-lg font-black ${c.text}`}>{p.name[0]}</span>
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{p.name}</span>
                    <h3 className="font-heading text-xl font-bold mt-1">{p.ageGroup}</h3>
                    <p className="text-sm text-muted mt-2 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start gap-2 text-xs text-muted">
                      <Calendar size={12} className="mt-0.5 shrink-0" />
                      <span>{p.timing}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted">
                      <Users size={12} className="mt-0.5 shrink-0" />
                      <span>{p.coach}</span>
                    </div>
                  </div>
                  {/* Join Batch → scroll to Meet the Team */}
                  <Button variant="secondary" size="sm" className="w-full" onClick={scrollToTeam}>
                    Join Batch
                  </Button>
                </div>
              </ScaleIn>
            )
          })}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coaches.map((coach, i) => (
              <ScaleIn key={coach.id} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 h-full hover:border-accent/30 transition-all duration-200 hover:-translate-y-1">
                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black bg-accent/10 ${coachColors[i % coachColors.length]}`}>
                    {coach.name.split(' ').slice(-1)[0][0]}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading text-base font-bold leading-tight">{coach.name}</h3>
                    <p className={`text-xs font-medium mt-1 ${coachColors[i % coachColors.length]}`}>{coach.specialization}</p>
                    <p className="text-xs text-muted mt-1">{coach.experience} experience</p>
                  </div>

                  {/* Batches */}
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

                  {/* Schedule */}
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

                  {/* Contact */}
                  {coach.phone && (
                    <a
                      href={`tel:${coach.phone}`}
                      className="flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      <Phone size={14} />
                      +91 {coach.phone}
                    </a>
                  )}
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
