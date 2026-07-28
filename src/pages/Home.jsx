import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Zap, Users, Calendar, Trophy,
  Wifi, Lightbulb, ParkingSquare, ShowerHead, Lock, ShoppingBag, Droplets, ChevronDown
} from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import Button from '../components/ui/Button'
import SectionLabel from '../components/ui/SectionLabel'
import Card from '../components/ui/Card'
import { programs } from '../data/programs'
import { announcements } from '../data/announcements'

// --- Fade-up animation helper ---
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- Animated counter ---
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useRef(() => {
    if (inView) {
      let start = 0
      const step = Math.ceil(to / 40)
      const timer = setInterval(() => {
        start += step
        if (start >= to) { setCount(to); clearInterval(timer) }
        else setCount(start)
      }, 30)
    }
  })
  return <span ref={ref} className="font-mono-nums">{inView ? to : 0}{suffix}</span>
}

const stats = [
  { value: '11', label: 'Pro Courts' },
  { value: '4', label: 'Expert Coaches' },
  { value: '200+', label: 'Active Members' },
  { value: '6 AM', label: 'Daily Start' },
]

const facilities = [
  { icon: Zap, label: 'Indoor Courts' },
  { icon: Lightbulb, label: 'LED Lighting' },
  { icon: Wifi, label: 'Wooden Flooring' },
  { icon: ParkingSquare, label: 'Free Parking' },
  { icon: ShowerHead, label: 'Changing Rooms' },
  { icon: Lock, label: 'Lockers' },
  { icon: ShoppingBag, label: 'Equipment Shop' },
  { icon: Droplets, label: 'Drinking Water' },
]

const programColors = {
  accent: 'border-accent/30 hover:border-accent',
  blue: 'border-blue-500/30 hover:border-blue-400',
  purple: 'border-purple-500/30 hover:border-purple-400',
  orange: 'border-orange-500/30 hover:border-orange-400',
  pink: 'border-pink-500/30 hover:border-pink-400',
}
const programTextColors = {
  accent: 'text-accent',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  pink: 'text-pink-400',
}

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop', alt: 'Court view', tall: true },
  { src: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3b?w=600&auto=format&fit=crop', alt: 'Game action', tall: false },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop', alt: 'Training', tall: false },
  { src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop', alt: 'Arena view', tall: true },
  { src: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&auto=format&fit=crop', alt: 'Smash', tall: false },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop', alt: 'Court close', tall: false },
]

const testimonials = [
  { name: 'Arjun Mehta', role: 'Advanced Batch', text: 'The coaching quality here is unmatched. Coach Rajesh has completely transformed my game in 3 months.' },
  { name: 'Priya Sharma', role: 'Beginners Batch', text: 'Perfect environment for beginners. Professional courts, great coaches, and an amazing atmosphere.' },
  { name: 'Vikram Singh', role: 'Weekend Batch', text: '11 professional courts, impeccable facilities — this is the best badminton academy in the city.' },
  { name: 'Kavya Nair', role: 'Kids Batch Parent', text: 'My daughter loves the Saturday kids sessions. Coach Arun is brilliant with children.' },
]

export default function Home() {
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
            src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1600&auto=format&fit=crop&q=80"
            alt="Badminton court"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/50 to-bg" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Premium Badminton Academy</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-6xl md:text-8xl font-black tracking-tight leading-none"
          >
            Play.<br />
            <span className="text-accent">Train.</span><br />
            Compete.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted text-lg max-w-md mx-auto leading-relaxed"
          >
            11 professional indoor courts. Expert coaching. Premium facilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button variant="primary" size="lg" onClick={() => document.getElementById('courts-section').scrollIntoView({ behavior: 'smooth' })}>
              Book Court <ArrowRight size={16} />
            </Button>
            <Link to="/coaching">
              <Button variant="secondary" size="lg">Join Coaching</Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-2xl mx-auto"
          >
            {stats.map(s => (
              <div key={s.label} className="bg-card/60 backdrop-blur border border-border rounded-2xl p-4 text-center">
                <div className="font-mono-nums text-2xl font-bold text-accent">{s.value}</div>
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

      {/* ── About + Facilities ── */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="space-y-6">
              <SectionLabel>About Us</SectionLabel>
              <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight">
                Where Champions<br />Are Made.
              </h2>
              <p className="text-muted leading-relaxed">
                SmashAcademy is more than a sports facility — it's a community. With 11 state-of-the-art indoor courts,
                professional coaching teams, and a passion for the game, we provide everything you need to grow.
              </p>
              <p className="text-muted text-sm leading-relaxed">
                From first-time beginners to competitive tournament players, our structured programs help every
                athlete reach their potential.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {facilities.map(({ icon: Icon, label }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-accent/30 transition-colors text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <span className="text-xs text-muted">{label}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Coaching Programs ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center space-y-4 mb-16">
          <SectionLabel>Coaching</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl font-black">Coaching Programs</h2>
          <p className="text-muted max-w-md mx-auto">Structured training for every level and age group.</p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {programs.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <div className={`bg-card border rounded-2xl p-5 h-full flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5 ${programColors[p.color]}`}>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${programTextColors[p.color]}`}>{p.name}</span>
                  <h3 className="font-heading text-lg font-bold mt-1">{p.ageGroup}</h3>
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="text-xs text-muted flex items-start gap-1.5">
                    <Calendar size={12} className="mt-0.5 shrink-0" /> {p.timing}
                  </p>
                  <p className="text-xs text-muted flex items-start gap-1.5">
                    <Users size={12} className="mt-0.5 shrink-0" /> {p.coach}
                  </p>
                </div>
                <Link to="/coaching">
                  <Button variant="secondary" size="sm" className="w-full">Join Batch</Button>
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Courts Section ── */}
      <section id="courts-section" className="py-24 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center space-y-4 mb-16">
          <SectionLabel>Courts</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl font-black">Explore Our Courts</h2>
          <p className="text-muted max-w-md mx-auto">11 professional indoor courts with live availability.</p>
        </FadeUp>
        <FadeUp>
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 text-center space-y-6">
            <p className="text-muted">Ready to book a court? Browse all 11 courts with live schedules and instant booking.</p>
            <Link to="/courts">
              <Button variant="primary" size="lg">
                View All Courts <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── Gallery + Reviews ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <FadeUp className="text-center space-y-4 mb-16">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl font-black">Inside the Academy</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.07}>
              <div className="bg-card border border-border rounded-2xl p-5 h-full flex flex-col gap-4">
                <p className="text-sm text-muted leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-accent">{t.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="relative overflow-hidden bg-card border border-border rounded-3xl p-10 md:p-16 text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="font-heading text-4xl md:text-5xl font-black">Ready to Start?</h2>
            <p className="text-muted max-w-md mx-auto">Visit us or get in touch to book a court, join a coaching program, or learn about membership.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/contact">
                <Button variant="primary" size="lg">Contact Us <ArrowRight size={16} /></Button>
              </Link>
              <Link to="/membership">
                <Button variant="secondary" size="lg">View Membership</Button>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </PageLayout>
  )
}
