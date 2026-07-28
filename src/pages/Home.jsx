import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Zap, Users, Calendar, Trophy,
  Wifi, Lightbulb, ParkingSquare, ShowerHead, Lock, ShoppingBag, Droplets, ChevronDown
} from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import SectionLabel from '../components/ui/SectionLabel'
import { FadeUp, AnimatedTitle, ScaleIn, SlideIn } from '../components/ui/ScrollReveal'
import { programs } from '../data/programs'
import { announcements } from '../data/announcements'
import {
  VOL_1, VOL_2, VOL_3, VOL_4, VOL_5, VOL_6,
  VOL_10, VOL_11, VOL_12, VOL_13, VOL_14, VOL_15
} from '../assets/images'

const stats = [
  { value: '11', label: 'Pro Courts' },
  { value: '4', label: 'Expert Coaches' },
  { value: '200+', label: 'Active Members' },
  { value: '6 AM', label: 'Daily Start' },
]

const facilities = [
  { icon: Zap,           label: 'Indoor Courts' },
  { icon: Lightbulb,     label: 'LED Lighting' },
  { icon: Wifi,          label: 'Wooden Flooring' },
  { icon: ParkingSquare, label: 'Free Parking' },
  { icon: ShowerHead,    label: 'Changing Rooms' },
  { icon: Lock,          label: 'Lockers' },
  { icon: ShoppingBag,   label: 'Equipment Shop' },
  { icon: Droplets,      label: 'Drinking Water' },
]

const programColors = {
  accent:  'border-accent/30 hover:border-accent',
  blue:    'border-blue-500/30 hover:border-blue-400',
  purple:  'border-purple-500/30 hover:border-purple-400',
  orange:  'border-orange-500/30 hover:border-orange-400',
  pink:    'border-pink-500/30 hover:border-pink-400',
}
const programTextColors = {
  accent:  'text-accent',
  blue:    'text-blue-400',
  purple:  'text-purple-400',
  orange:  'text-orange-400',
  pink:    'text-pink-400',
}

const galleryImages = [
  { src: VOL_10, alt: 'Court view',  tall: true  },
  { src: VOL_11, alt: 'Game action', tall: false },
  { src: VOL_12, alt: 'Training',    tall: false },
  { src: VOL_13, alt: 'Arena view',  tall: true  },
  { src: VOL_14, alt: 'Smash',       tall: false },
  { src: VOL_15, alt: 'Court close', tall: false },
]

const testimonials = [
  { name: 'Arjun Mehta',   role: 'Advanced Batch',   text: 'The coaching quality here is unmatched. Coach Rajesh has completely transformed my game in 3 months.' },
  { name: 'Priya Sharma',  role: 'Beginners Batch',  text: 'Perfect environment for beginners. Professional courts, great coaches, and an amazing atmosphere.' },
  { name: 'Kiran Reddy',   role: 'Weekend Warriors', text: 'Best facility in the city. Weekend sessions are incredibly well-organised and the courts are flawless.' },
  { name: 'Snehal Joshi',  role: 'Kids Batch',       text: 'My daughter loves it here. Coach Arun is amazing with kids and the safety standards are excellent.' },
]

export default function Home() {
  const navigate = useNavigate()
  const pinnedAnnouncements = announcements.filter(a => a.pinned)

  return (
    <PageLayout>
      {/* ── Pinned Announcements Banner ── */}
      {pinnedAnnouncements.length > 0 && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-accent/10 border-b border-accent/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-3 overflow-hidden">
            <span className="shrink-0 text-xs font-bold text-accent uppercase tracking-widest">Notice</span>
            <span className="text-xs text-text truncate">{pinnedAnnouncements[0].title}</span>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={VOL_1}
            alt="Badminton court"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/50 to-bg" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Premium Badminton Academy</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none"
          >
            Play.<br />
            <span className="text-accent">Train.</span><br />
            Compete.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed"
          >
            11 professional indoor courts. Expert coaching. Premium facilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('courts-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Court <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/coaching')}>
              Join Coaching
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-2xl mx-auto"
          >
            {stats.map(s => (
              <div key={s.label} className="bg-card/60 backdrop-blur border border-border rounded-2xl p-3 sm:p-4 text-center">
                <div className="font-mono-nums text-xl sm:text-2xl font-bold text-accent">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-muted"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ── About / Why Us ── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <SlideIn direction="left">
            <SectionLabel>Why SmashAcademy</SectionLabel>
            <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
              Where Champions Train
            </AnimatedTitle>
            <p className="text-muted leading-relaxed mb-6">
              SmashAcademy is Bengaluru's premier badminton facility — 11 professional indoor courts, expert coaches, and a community built around excellence.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {facilities.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-muted">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-accent" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[VOL_2, VOL_3, VOL_4, VOL_5].map((src, i) => (
                <ScaleIn key={i} delay={i * 0.08}>
                  <div className={`overflow-hidden rounded-2xl bg-card border border-border ${i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                    <img src={src} alt={`Academy ${i+1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </ScaleIn>
              ))}
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center space-y-4 mb-14">
          <SectionLabel>Coaching Programs</SectionLabel>
          <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl font-black">
            Pick Your Path
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto">From kids to competitive players — a structured program for every level.</p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programs.map((p, i) => (
            <ScaleIn key={p.id} delay={i * 0.07}>
              <div className={`bg-card border rounded-2xl p-5 h-full flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 ${programColors[p.color]}`}>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${programTextColors[p.color]}`}>{p.name}</span>
                  <h3 className="font-heading text-lg font-bold mt-1">{p.ageGroup}</h3>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{p.description}</p>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-start gap-2 text-xs text-muted">
                    <Calendar size={11} className="mt-0.5 shrink-0" />
                    <span>{p.timing}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted">
                    <Users size={11} className="mt-0.5 shrink-0" />
                    <span>{p.coach}</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/coaching#meet-the-team')}
                >
                  Join Batch
                </Button>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* ── Courts Section ── */}
      <section id="courts-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center space-y-4 mb-14">
          <SectionLabel>Courts</SectionLabel>
          <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl font-black">
            Explore Our Courts
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto">11 professional indoor courts with live availability.</p>
        </FadeUp>
        <FadeUp>
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 text-center space-y-6">
            <p className="text-muted">Ready to book a court? Browse all 11 courts with live schedules and instant booking.</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/courts')}>
              View All Courts <ArrowRight size={16} />
            </Button>
          </div>
        </FadeUp>
      </section>

      {/* ── Gallery + Testimonials ── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center space-y-4 mb-14">
          <SectionLabel>Gallery</SectionLabel>
          <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl font-black">
            Inside the Academy
          </AnimatedTitle>
        </FadeUp>

        {/* Masonry gallery */}
        <FadeUp>
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {galleryImages.map((img, i) => (
              <div key={i} className={`break-inside-avoid overflow-hidden rounded-2xl ${img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {testimonials.map((t, i) => (
            <ScaleIn key={t.name} delay={i * 0.07}>
              <div className="bg-card border border-border rounded-2xl p-5 h-full flex flex-col gap-4">
                <p className="text-sm text-muted leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-accent">{t.role}</p>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="relative overflow-hidden bg-card border border-border rounded-3xl p-8 sm:p-16 text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
            <SectionLabel>Get in Touch</SectionLabel>
            <AnimatedTitle as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl font-black">
              Ready to Start?
            </AnimatedTitle>
            <p className="text-muted max-w-md mx-auto">Visit us or get in touch to book a court, join a coaching program, or learn about membership.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                Contact Us <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/membership')}>
                View Membership
              </Button>
            </div>
          </div>
        </FadeUp>
      </section>
    </PageLayout>
  )
}
