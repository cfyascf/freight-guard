export const Auth = {
  PUBLIC: "public",
  AUTHENTICATED: "authenticated"
}

export function getDefaultRouteForRole(role) {
  if (role === "carrier") {
    return "/carrier-dashboard"
  }

  return "/dashboard"
}

export const AUTH_OPTIONS = [
  { value: Auth.PUBLIC, label: "Público" },
  { value: Auth.AUTHENTICATED, label: "Autenticado" },
]
