// Reusable button component

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-accent text-bg hover:bg-[#5de065] active:scale-95',
    secondary: 'bg-card border border-border text-text hover:border-accent/50 hover:bg-surface active:scale-95',
    ghost: 'text-muted hover:text-text hover:bg-surface active:scale-95',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
