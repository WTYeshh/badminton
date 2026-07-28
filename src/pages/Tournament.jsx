import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Calendar, Users, MapPin } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

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

const tournaments = [
  {
    id: 1,
    name: 'Inter-Academy Championship',
    date: 'August 20, 2026',
    registrationDeadline: 'August 10, 2026',
    categories: ['Men\'s Singles', 'Women\'s Singles', 'Men\'s Doubles', 'Mixed Doubles'],
    venue: 'SmashAcademy — All 11 Courts',
    status: 'upcoming',
    fee: '₹500 per event',
    prize: '₹50,000 total prize pool',
  },
  {
    id: 2,
    name: 'Juniors Open 2026',
    date: 'September 14–15, 2026',
    registrationDeadline: 'September 5, 2026',
    categories: ['U-14 Singles', 'U-17 Singles', 'U-14 Doubles'],
    venue: 'SmashAcademy — Courts 1–6',
    status: 'upcoming',
    fee: '₹300 per event',
    prize: '₹20,000 total prize pool',
  },
  {
    id: 3,
    name: 'Summer Smash 2026',
    date: 'June 8–9, 2026',
    registrationDeadline: 'Closed',
    categories: ['Open Singles', 'Open Doubles'],
    venue: 'SmashAcademy',
    status: 'completed',
    fee: '₹400 per event',
    prize: '₹30,000 total prize pool',
  },
]

export default function Tournament() {
  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center space-y-4 mb-20">
          <SectionLabel>Tournaments</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Compete. Win. Repeat.</h1>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Regular tournaments for all levels — from juniors to open categories.
          </p>
        </FadeUp>

        <div className="space-y-5">
          {tournaments.map((t, i) => (
            <FadeUp key={t.id} delay={i * 0.07}>
              <div className={`bg-card border rounded-3xl p-7 md:p-8 ${
                t.status === 'upcoming' ? 'border-accent/20 hover:border-accent/40' : 'border-border'
              } transition-all duration-200`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Trophy size={18} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{t.name}</h3>
                        <Badge status={t.status === 'upcoming' ? 'available' : 'booked'} label={t.status === 'upcoming' ? 'Upcoming' : 'Completed'} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { icon: Calendar, label: 'Date', value: t.date },
                        { icon: MapPin, label: 'Venue', value: t.venue },
                        { icon: Users, label: 'Categories', value: t.categories.join(', ') },
                        { icon: Trophy, label: 'Prize Pool', value: t.prize },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label}>
                          <p className="text-xs text-muted flex items-center gap-1.5 mb-1">
                            <Icon size={11} /> {label}
                          </p>
                          <p className="text-sm">{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted">Entry fee: {t.fee} · Registration deadline: {t.registrationDeadline}</p>
                  </div>
                  {t.status === 'upcoming' && (
                    <div className="shrink-0">
                      <Button variant="primary">Register Now</Button>
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
