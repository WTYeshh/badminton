// Small eyebrow label above section titles

export default function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-widest uppercase">
      {children}
    </span>
  )
}
