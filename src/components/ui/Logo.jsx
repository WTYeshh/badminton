// Unique badminton racket logo — replace with your own SVG/image as needed

export default function Logo({ size = 32, className = '' }) {
  const id = `clip-${size}` // unique per size to avoid SVG ID conflicts
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="64" height="64" rx="14" fill="#111111" />

      {/* ── Racket Head (oval frame) ── */}
      <ellipse cx="32" cy="21" rx="13.5" ry="16" stroke="#72F27C" strokeWidth="2.5" />

      {/* ── String grid clipped to racket head ── */}
      <defs>
        <clipPath id={id}>
          <ellipse cx="32" cy="21" rx="12.5" ry="15" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`} stroke="#72F27C" strokeWidth="0.75" opacity="0.55">
        {/* Vertical strings */}
        <line x1="24" y1="5" x2="24" y2="37" />
        <line x1="27.5" y1="5" x2="27.5" y2="37" />
        <line x1="31" y1="5" x2="31" y2="37" />
        <line x1="34.5" y1="5" x2="34.5" y2="37" />
        <line x1="38" y1="5" x2="38" y2="37" />
        <line x1="41" y1="5" x2="41" y2="37" />
        {/* Horizontal strings */}
        <line x1="18" y1="12" x2="46" y2="12" />
        <line x1="18" y1="16" x2="46" y2="16" />
        <line x1="18" y1="20" x2="46" y2="20" />
        <line x1="18" y1="24" x2="46" y2="24" />
        <line x1="18" y1="28" x2="46" y2="28" />
        <line x1="18" y1="32" x2="46" y2="32" />
      </g>

      {/* ── Throat (tapers from head to shaft) ── */}
      <path
        d="M22 36 Q24 40 29.5 42 L29.5 45 M42 36 Q40 40 34.5 42 L34.5 45"
        stroke="#72F27C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Shaft ── */}
      <rect x="29" y="42" width="6" height="9" rx="1" fill="#72F27C" opacity="0.15" />
      <line x1="29.5" y1="42" x2="29.5" y2="51" stroke="#72F27C" strokeWidth="1.8" />
      <line x1="34.5" y1="42" x2="34.5" y2="51" stroke="#72F27C" strokeWidth="1.8" />

      {/* ── Handle / grip ── */}
      <rect x="27.5" y="51" width="9" height="8" rx="4" stroke="#72F27C" strokeWidth="2" fill="none" />
      {/* grip wrap lines */}
      <line x1="27.5" y1="53.5" x2="36.5" y2="53.5" stroke="#72F27C" strokeWidth="0.7" opacity="0.5" />
      <line x1="27.5" y1="56.5" x2="36.5" y2="56.5" stroke="#72F27C" strokeWidth="0.7" opacity="0.5" />
    </svg>
  )
}
