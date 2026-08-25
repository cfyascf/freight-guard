/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ROLES } from "@/constants/roles"

const AuthContext = createContext()
const AUTH_STORAGE_KEY = "sigloc_auth"
const USER_STORAGE_KEY = "sigloc_user"

const defaultUser = {
  name: "Pedro Netto",
  role: ROLES.DEVELOPER,
}

const VALID_ROLES = new Set([ROLES.CONTRACTOR, ROLES.CARRIER, ROLES.DEVELOPER])
const ROLE_CYCLE = [ROLES.CONTRACTOR, ROLES.CARRIER, ROLES.DEVELOPER]

function getStoredAuthFlag() {
  if (globalThis.window === undefined) {
    return false
  }

  // Getting the flag from local storage 
  // so the session survives page refreshes
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true"
}

function getStoredUser() {
  if (globalThis.window === undefined) {
    return defaultUser
  }

  // Getting the user variable from local storage 
  // so the session survives page refreshes
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) {
    return defaultUser
  }

  try {
    const parsed = JSON.parse(raw)
    if (VALID_ROLES.has(parsed?.role)) {
      return {
        name: parsed.name || defaultUser.name,
        role: parsed.role,
      }
    }
  } catch {
    return defaultUser
  }

  return defaultUser
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuthFlag)
  const [user, setUser] = useState(getStoredUser)

  // Whenever isAuthenticated changes, update the local storage with new value
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated))
  }, [isAuthenticated])

  // Whenever user changes, update the local storage with new value
  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  }, [user])

  // Declaring methods as useCallback to avoid unnecessary re-renders 
  // when AuthProvider reloads. Without it, the useMemo method would 
  // create a new object on every render, causing all components that 
  // consume the context to re-render as well.
  const login = useCallback(({ name, role } = {}) => {
    setUser((prev) => ({
      name: name || prev.name || defaultUser.name,
      role: VALID_ROLES.has(role) ? role : ROLES.CONTRACTOR,
    }))
    setIsAuthenticated(true)
  }, [])

  const register = useCallback(
    ({ name, role } = {}) => {
      login({ name, role })
    },
    [login]
  )

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const setRole = useCallback((role) => {
    if (!VALID_ROLES.has(role)) {
      return
    }

    setUser((prev) => ({
      ...prev,
      role,
    }))
  }, [])

  const toggleRole = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      role: ROLE_CYCLE[(ROLE_CYCLE.indexOf(prev.role) + 1) % ROLE_CYCLE.length],
    }))
  }, [])

  // useMemo to avoid unnecessary re-renders of consuming components when 
  // AuthProvider reloads but does not change the context values
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      register,
      logout,
      setRole,
      toggleRole,
    }),
    [user, isAuthenticated, login, register, logout, setRole, toggleRole]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
