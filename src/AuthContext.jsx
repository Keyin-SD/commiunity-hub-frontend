import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function getStoredUser() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  function logIn(userData) {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  function logOut() {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
