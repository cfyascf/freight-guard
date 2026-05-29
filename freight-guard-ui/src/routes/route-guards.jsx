/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"

// NOVA FUNÇÃO: Centraliza a rota principal (Home) de cada perfil
export function getDefaultRouteForRole(role) {
  switch (role) {
    case ROLES.CARRIER:
      return "/carrier-dashboard" // Dashboard do Transportador
    case ROLES.CONTRACTOR:
      return "/contractor-dashboard" // Dashboard do Contratante (Ajuste se o seu for apenas "/dashboard")
    case ROLES.DEVELOPER:
      return "/contractor-dashboard" // Dev tem acesso a tudo, cai na tela principal
    default:
      return "/"
  }
}

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Guarda a localização que ele tentou acessar para mandar de volta após o login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export function PublicOnly() {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated) {
    // CORREÇÃO: Em vez de mandar todos pro "/dashboard", manda pro lugar certo
    return <Navigate to={getDefaultRouteForRole(user?.role)} replace />
  }

  return <Outlet />
}

export function RequireRole({ allowedRoles }) {
  const { user } = useAuth()

  const hasRoleAccess =
    user.role === ROLES.DEVELOPER || allowedRoles.includes(user.role)

  if (!hasRoleAccess) {
    // CORREÇÃO: Se ele tentar acessar uma URL proibida, é devolvido pro seu próprio painel
    return <Navigate to={getDefaultRouteForRole(user?.role)} replace />
  }

  return <Outlet />
}
