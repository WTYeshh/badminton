// Reusable card container

export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-card border border-border rounded-2xl
        ${hover ? 'hover:border-accent/30 hover:-translate-y-0.5 cursor-pointer transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
