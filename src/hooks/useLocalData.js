/**
 * useLocalData — generic hook that reads from localStorage (JSON),
 * falls back to `initialData`, and persists every update back.
 *
 * Usage:
 *   const [coaches, setCoaches] = useLocalData('smash_coaches', initialCoaches)
 */
import { useState, useEffect } from 'react'

export function useLocalData(key, initialData) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialData
    } catch {
      return initialData
    }
  })

  // Sync to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {
      // localStorage full / unavailable — silently ignore
    }
  }, [key, data])

  return [data, setData]
}
