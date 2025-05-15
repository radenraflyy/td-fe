import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext({
  isAuthenticated: false,
  setLogin: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsAuthenticated(loggedIn)
  }, [])

  const setLogin = () => {
    localStorage.setItem("isLoggedIn", "true")
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthCtx = () => useContext(AuthContext)
