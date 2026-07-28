import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { FadeUp, AnimatedTitle, SlideIn } from '../components/ui/ScrollReveal'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Sports Complex, MG Road, Bengaluru — 560001',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@smashacademy.in',
    href: 'mailto:info@smashacademy.in',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Fri 6 AM–10 PM · Sat 6 AM–8 PM · Sun 7 AM–6 PM',
    href: null,
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <FadeUp className="text-center space-y-4 mb-16 sm:mb-20">
          <SectionLabel>Contact</SectionLabel>
          <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
            Get In Touch
          </AnimatedTitle>
          <p className="text-muted max-w-md mx-auto leading-relaxed">
            Questions, bookings, or just want to visit? We're here.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left — contact info ── */}
          <SlideIn direction="left">
            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider font-medium mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-text hover:text-accent transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-text">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map embed placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border aspect-[16/9] bg-card flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin size={28} className="text-accent mx-auto" />
                  <p className="text-sm text-muted">123 Sports Complex, MG Road</p>
                  <a
                    href="https://maps.google.com/?q=MG+Road+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* ── Right — form ── */}
          <SlideIn direction="right" delay={0.1}>
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-4"
                >
                  <CheckCircle2 size={44} className="text-accent mx-auto" />
                  <h2 className="font-heading text-2xl font-bold">Message Sent!</h2>
                  <p className="text-muted">We'll get back to you within 24 hours.</p>
                  <Button variant="secondary" onClick={() => setSent(false)}>Send Another</Button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: 'name',  label: 'Full Name',         placeholder: 'Your name',         type: 'text'  },
                      { name: 'email', label: 'Email',             placeholder: 'you@email.com',     type: 'email' },
                      { name: 'phone', label: 'Phone (optional)',  placeholder: '+91 99999 99999',   type: 'tel'   },
                    ].map(f => (
                      <div key={f.name} className="space-y-1.5">
                        <label className="text-xs font-medium text-muted uppercase tracking-wider">{f.label}</label>
                        <input
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          required={f.name !== 'phone'}
                          type={f.type}
                          placeholder={f.placeholder}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                        />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted uppercase tracking-wider">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="How can we help?"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </SlideIn>
        </div>
      </div>
    </PageLayout>
  )
}
