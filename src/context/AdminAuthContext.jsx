import { createContext, useContext, useState } from 'react'

// Admin auth context — uses sessionStorage so auth clears on browser close
const AdminAuthContext = createContext(null)

const ADMIN_AUTH_KEY = '__smash_adm_auth__'
const ADMIN_PASSWORD = '1234'

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true'
    } catch {
      return false
    }
  })

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true')
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid password. Access denied.' }
  }

  const logout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return ctx
}
