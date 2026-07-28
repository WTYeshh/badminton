import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Users, Star } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { programs } from '../data/programs'
import { coaches } from '../data/coaches'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const colorMap = {
  accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20 hover:border-accent/60' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20 hover:border-blue-400/60' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20 hover:border-purple-400/60' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20 hover:border-orange-400/60' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20 hover:border-pink-400/60' },
}

export default function Coaching() {
  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeUp className="text-center space-y-4 mb-20">
          <SectionLabel>Coaching Programs</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Train with the Best.</h1>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Structured programs for all ages and skill levels, led by expert coaches.
          </p>
        </FadeUp>

        {/* Programs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-28">
          {programs.map((p, i) => {
            const c = colorMap[p.color]
            return (
              <FadeUp key={p.id} delay={i * 0.07}>
                <div className={`bg-card border rounded-2xl p-6 h-full flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 ${c.border}`}>
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                    <Star size={18} className={c.text} />
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
                  <Button variant="secondary" size="sm" className="w-full">Join Batch</Button>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* Coaches */}
        <FadeUp className="text-center space-y-4 mb-12">
          <SectionLabel>Our Coaches</SectionLabel>
          <h2 className="font-heading text-4xl font-black">Meet the Team</h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coaches.map((coach, i) => (
            <FadeUp key={coach.id} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col gap-4 hover:border-accent/30 transition-all duration-200">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-accent text-lg">
                    {coach.name.split(' ').slice(-1)[0][0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold">{coach.name}</h3>
                  <p className="text-xs text-accent mt-0.5">{coach.specialization}</p>
                  <p className="text-xs text-muted mt-1">{coach.experience} experience</p>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-muted font-medium uppercase tracking-wider">Batches</p>
                  {coach.batches.map(b => (
                    <p key={b} className="text-xs text-text">{b}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Schedule</p>
                  {coach.schedule.map(s => (
                    <p key={s} className="text-xs text-muted">{s}</p>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
