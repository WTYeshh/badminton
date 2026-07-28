import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { FadeUp, AnimatedTitle, ScaleIn } from '../components/ui/ScrollReveal'

const plans = [
  {
    name: 'Basic',
    price: '₹1,499',
    period: '/month',
    description: 'Perfect for recreational players.',
    features: ['Court bookings (4/month)', 'Standard time slots', 'Locker access', 'Parking'],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₹2,999',
    period: '/month',
    description: 'For regular players and coaching students.',
    features: ['Unlimited court bookings', 'Priority time slots', 'Locker access', 'Parking', '1 coaching session/month', 'Guest pass (2/month)'],
    highlight: true,
  },
  {
    name: 'Annual',
    price: '₹24,999',
    period: '/year',
    description: 'Best value for committed players.',
    features: ['Everything in Premium', 'Unlimited coaching sessions', 'Tournament entry discounts', 'Guest passes (5/month)', 'Equipment discounts', 'Dedicated locker'],
    highlight: false,
  },
]

export default function Membership() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        <FadeUp className="text-center space-y-4 mb-16 sm:mb-20">
          <SectionLabel>Membership</SectionLabel>
          <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
            Choose Your Plan
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Flexible membership plans for every level of play.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <ScaleIn key={plan.name} delay={i * 0.1}>
              <div className={`relative bg-card rounded-3xl p-7 h-full flex flex-col gap-6 border transition-all duration-200 hover:-translate-y-1 ${
                plan.highlight
                  ? 'border-accent/50 shadow-lg shadow-accent/5'
                  : 'border-border hover:border-accent/30'
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-bg text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div>
                  <h3 className={`font-heading text-lg font-bold ${plan.highlight ? 'text-accent' : ''}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="font-mono-nums text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted text-sm mb-1">{plan.period}</span>
                  </div>
                  <p className="text-muted text-sm mt-1">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? 'primary' : 'secondary'} className="w-full">
                  Get Started <ArrowRight size={14} />
                </Button>
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.2} className="mt-20">
          <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <AnimatedTitle as="h2" className="font-heading text-2xl sm:text-3xl font-black">
              Not sure which plan?
            </AnimatedTitle>
            <p className="text-muted max-w-sm mx-auto text-sm">Talk to us — we'll help you find the right fit for your schedule and goals.</p>
            <Button variant="primary" onClick={() => navigate('/contact')}>
              Contact Us <ArrowRight size={14} />
            </Button>
          </div>
        </FadeUp>
      </div>
    </PageLayout>
  )
}
