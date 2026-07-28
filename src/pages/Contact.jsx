import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2 } from 'lucide-react'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="font-heading text-5xl md:text-6xl font-black">Get In Touch.</h1>
          <p className="text-muted max-w-md mx-auto">Visit us, call us, or drop a message.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — info */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden border border-border h-60 bg-card relative">
              <iframe
                title="Academy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0000000000005!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full grayscale"
                style={{ filter: 'invert(90%) grayscale(1) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Contact details */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Address', value: '123 Sports Complex, MG Road, Bengaluru — 560001' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: Mail, label: 'Email', value: 'info@smashacademy.in', href: 'mailto:info@smashacademy.in' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-accent" />
                    <span className="text-xs text-muted font-medium uppercase tracking-wider">{label}</span>
                  </div>
                  {href ? (
                    <a href={href} className="text-sm hover:text-accent transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm">{value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-accent" />
                <span className="text-xs text-muted font-medium uppercase tracking-wider">Working Hours</span>
              </div>
              <div className="space-y-2">
                {[
                  { day: 'Monday – Friday', hours: '6:00 AM – 10:00 PM' },
                  { day: 'Saturday', hours: '6:00 AM – 8:00 PM' },
                  { day: 'Sunday', hours: '7:00 AM – 6:00 PM' },
                ].map(r => (
                  <div key={r.day} className="flex justify-between text-sm">
                    <span className="text-muted">{r.day}</span>
                    <span className="font-medium">{r.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-card border border-border rounded-3xl p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-6 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="text-accent" size={32} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted">We'll get back to you within 24 hours.</p>
                </div>
                <Button variant="secondary" onClick={() => setSent(false)}>Send Another</Button>
              </motion.div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                    { name: 'email', label: 'Email', placeholder: 'you@email.com', type: 'email' },
                    { name: 'phone', label: 'Phone (optional)', placeholder: '+91 99999 99999', type: 'tel' },
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
        </div>
      </div>
    </PageLayout>
  )
}
