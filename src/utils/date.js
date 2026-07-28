/**
 * Date utilities — enforce DD-MM-YYYY display across the whole app.
 */

/** ISO (YYYY-MM-DD) → display (DD-MM-YYYY) */
export const toDisplay = (iso) => {
  if (!iso) return '—'
  const parts = iso.split('-')
  if (parts.length !== 3) return iso
  const [y, m, d] = parts
  return `${d}-${m}-${y}`
}

/** display (DD-MM-YYYY) → ISO (YYYY-MM-DD) */
export const toISO = (display) => {
  if (!display) return ''
  const parts = display.split('-')
  if (parts.length !== 3) return display
  const [d, m, y] = parts
  return `${y}-${m}-${d}`
}

/** Today's date as ISO string */
export const todayISO = () => new Date().toISOString().split('T')[0]

/** Today's date as DD-MM-YYYY */
export const todayDisplay = () => toDisplay(todayISO())
