import { useState } from 'react'
import { Check } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    academyName: 'SmashAcademy',
    phone: '+91 98765 43210',
    email: 'info@smashacademy.in',
    address: '123 Sports Complex, MG Road, Bengaluru — 560001',
    openingTime: '06:00',
    closingTime: '22:00',
    slotDuration: '60',
    bookingCutoff: '30',
    maxPlayers: '4',
    weekdayClose: '22:00',
    saturdayClose: '20:00',
    sundayClose: '18:00',
  })

  const handleChange = e => {
    setSettings(p => ({ ...p, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  const handleSave = e => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Field = ({ label, name, type = 'text', children }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted uppercase tracking-wider">{label}</label>
      {children || (
        <input
          name={name}
          value={settings[name]}
          onChange={handleChange}
          type={type}
          className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors"
        />
      )}
    </div>
  )

  const Section = ({ title, children }) => (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <h3 className="font-heading font-bold border-b border-border pb-3">{title}</h3>
      {children}
    </div>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
        <p className="text-muted text-sm mt-1">Configure academy operations and contact information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <Section title="Academy Contact">
          <Field label="Academy Name" name="academyName" />
          <Field label="Phone" name="phone" />
          <Field label="Email" name="email" type="email" />
          <Field label="Address" name="address">
            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows={2}
              className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
          </Field>
        </Section>

        <Section title="Working Hours">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Opening Time" name="openingTime" type="time" />
            <Field label="Closing Time (Weekday)" name="weekdayClose" type="time" />
            <Field label="Saturday Close" name="saturdayClose" type="time" />
            <Field label="Sunday Close" name="sundayClose" type="time" />
          </div>
        </Section>

        <Section title="Booking Rules">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slot Duration (minutes)" name="slotDuration">
              <select name="slotDuration" value={settings.slotDuration} onChange={handleChange}
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent/50 transition-colors">
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </Field>
            <Field label="Booking Cutoff (minutes before slot)" name="bookingCutoff" type="number" />
            <Field label="Max Players per Booking" name="maxPlayers" type="number" />
          </div>
        </Section>

        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size="md">
            {saved ? <><Check size={14} /> Saved</> : 'Save Settings'}
          </Button>
          {saved && <span className="text-accent text-sm">Changes saved successfully.</span>}
        </div>
      </form>
    </div>
  )
}
