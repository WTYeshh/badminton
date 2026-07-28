import { Calendar, MapPin, Users, Trophy } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { FadeUp, AnimatedTitle, ScaleIn } from '../components/ui/ScrollReveal'
const tournamentData = [
  {
    id: 'T001',
    name: 'SmashAcademy Summer Open 2026',
    status: 'upcoming',
    date: 'August 15–17, 2026',
    venue: 'SmashAcademy — All 11 Courts',
    categories: ['Men\'s Singles', 'Women\'s Singles', 'Men\'s Doubles', 'Mixed Doubles'],
    prize: '₹50,000',
    fee: '₹500/player',
    registrationDeadline: 'August 5, 2026',
  },
  {
    id: 'T002',
    name: 'Junior Championship 2026',
    status: 'upcoming',
    date: 'September 20–21, 2026',
    venue: 'SmashAcademy — Courts 1–6',
    categories: ['U14 Singles', 'U17 Singles', 'U14 Doubles'],
    prize: '₹20,000',
    fee: '₹300/player',
    registrationDeadline: 'September 10, 2026',
  },
  {
    id: 'T003',
    name: 'City League Q1 2026',
    status: 'completed',
    date: 'March 10–12, 2026',
    venue: 'SmashAcademy — Main Hall',
    categories: ['Men\'s Singles', 'Women\'s Singles', 'Doubles'],
    prize: '₹30,000',
    fee: '₹400/player',
    registrationDeadline: 'February 28, 2026',
  },
]

export default function Tournament() {
  const data = tournamentData

  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        <FadeUp className="text-center space-y-4 mb-14 sm:mb-16">
          <SectionLabel>Tournaments</SectionLabel>
          <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
            Compete and Win
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            From juniors to open-level — tournaments designed to challenge and inspire.
          </p>
        </FadeUp>

        <div className="space-y-5">
          {data.map((t, i) => (
            <ScaleIn key={t.id} delay={i * 0.07}>
              <div className={`bg-card border rounded-3xl p-6 sm:p-8 ${
                t.status === 'upcoming' ? 'border-accent/20 hover:border-accent/40' : 'border-border'
              } transition-all duration-200`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Trophy size={18} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold">{t.name}</h3>
                        <Badge
                          status={t.status === 'upcoming' ? 'available' : 'booked'}
                          label={t.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { icon: Calendar, label: 'Date',       value: t.date },
                        { icon: MapPin,   label: 'Venue',      value: t.venue },
                        { icon: Users,    label: 'Categories', value: t.categories.join(', ') },
                        { icon: Trophy,   label: 'Prize Pool', value: t.prize },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label}>
                          <p className="text-xs text-muted flex items-center gap-1.5 mb-1">
                            <Icon size={11} /> {label}
                          </p>
                          <p className="text-sm">{value}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-muted">
                      Entry fee: {t.fee} · Registration deadline: {t.registrationDeadline}
                    </p>
                  </div>

                  {t.status === 'upcoming' && (
                    <div className="shrink-0">
                      <Button variant="primary">Register Now</Button>
                    </div>
                  )}
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
