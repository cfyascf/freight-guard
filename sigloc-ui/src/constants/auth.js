export const Auth = {
  PUBLIC: "public",
  AUTHENTICATED: "authenticated"
}

export function getDefaultRouteForRole(role) {
  if (role === "carrier") {
    return "/carrier-dashboard"
  }
  if (role === "contractor") {
    return "/contractor-dashboard"
  }
  // Developer ou qualquer outra role vai para contractor dashboard como fallback
  return "/contractor-dashboard"
}

export const AUTH_OPTIONS = [
  { value: Auth.PUBLIC, label: "Público" },
  { value: Auth.AUTHENTICATED, label: "Autenticado" },
]
