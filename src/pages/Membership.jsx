import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'

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
  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center space-y-4 mb-20">
          <SectionLabel>Membership</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Choose Your Plan.</h1>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Flexible membership plans for every level of play.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.08}>
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
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-16 text-center">
          <p className="text-muted text-sm">All plans include access to the academy's full facilities. Visit the reception to sign up.</p>
        </FadeUp>
      </div>
    </PageLayout>
  )
}
