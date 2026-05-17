/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Send the user to login page but store the location they tried to access,
    // so they can be redirected to it after they login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Outlet renders the matched child route
  return <Outlet />
}

export function PublicOnly() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Outlet renders the matched child route
  return <Outlet />
}

export function RequireRole({ allowedRoles }) {
  const { user } = useAuth()

  const hasRoleAccess =
    user.role === ROLES.DEVELOPER || allowedRoles.includes(user.role)

  if (!hasRoleAccess) {
    return <Navigate to="/dashboard" replace />
  }

  // Outlet renders the matched child route
  return <Outlet />
}
