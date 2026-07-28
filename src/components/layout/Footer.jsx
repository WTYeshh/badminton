import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Youtube, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../ui/Logo'

// Designer credit star icon
function DesignerStar() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      <a
        href="https://www.itsyesh.in/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Designed and managed by itsyesh"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-muted/40 hover:text-accent transition-colors duration-200"
      >
        {/* 6-pointed sparkle star */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="transition-transform duration-200"
          style={{ transform: hovered ? 'rotate(30deg) scale(1.2)' : 'rotate(0deg) scale(1)' }}
        >
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm0 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
        </svg>
      </a>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card border border-border rounded-xl px-3 py-1.5 text-xs text-text whitespace-nowrap shadow-lg shadow-black/40 pointer-events-none z-50"
          style={{ animation: 'fadeInUp 0.15s ease' }}
        >
          Designed &amp; managed by{' '}
          <span className="text-accent font-medium">itsyesh</span>
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-heading font-bold">Smash<span className="text-accent">Academy</span></span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Premium badminton coaching academy with 11 professional indoor courts in the heart of the city.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a href="#" aria-label="Instagram" className="p-2 rounded-xl bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="p-2 rounded-xl bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all">
              <Youtube size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-xl bg-card border border-border text-muted hover:text-accent hover:border-accent/30 transition-all">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-muted">Navigation</h4>
          <ul className="space-y-2.5">
            {[
              { label: 'Coaching Programs', to: '/coaching' },
              { label: 'Our Courts', to: '/courts' },
              { label: 'Gallery', to: '/gallery' },
              { label: 'Membership', to: '/membership' },
              { label: 'Tournament', to: '/tournament' },
              { label: 'Contact', to: '/contact' },
            ].map(item => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-muted hover:text-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Contact */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-muted">Quick Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-muted">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              123 Sports Complex, MG Road, Bengaluru — 560001
            </li>
            <li>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors">
                <Phone size={15} className="shrink-0 text-accent" />
                +91 98765 43210
              </a>
            </li>
            <li>
              <a href="mailto:info@smashacademy.in" className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors">
                <Mail size={15} className="shrink-0 text-accent" />
                info@smashacademy.in
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-muted">Working Hours</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex justify-between">
              <span>Monday – Friday</span>
              <span className="text-text">6 AM – 10 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-text">6 AM – 8 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-text">7 AM – 6 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted">© {year} SmashAcademy. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted">Built for champions.</p>
          <DesignerStar />
        </div>
      </div>
    </footer>
  )
}
