import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Pedro Netto",
    role: "contractor", // 'contractor' (contratante) ou 'carrier' (transportador)
  })

  const toggleRole = () => {
    setUser((prev) => ({
      ...prev,
      role: prev.role === "contractor" ? "carrier" : "contractor",
    }))
  }

  return (
    <AuthContext.Provider value={{ user, toggleRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
