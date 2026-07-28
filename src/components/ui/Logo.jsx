// Geometric shuttlecock logo — works as both nav logo and favicon SVG

export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#111111" />
      <circle cx="32" cy="40" r="9" fill="none" stroke="#72F27C" strokeWidth="2.5" />
      <line x1="32" y1="31" x2="32" y2="14" stroke="#72F27C" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="13" rx="6" ry="3.5" fill="none" stroke="#72F27C" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="26.5" y1="16" x2="32" y2="31" stroke="#72F27C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="37.5" y1="16" x2="32" y2="31" stroke="#72F27C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
