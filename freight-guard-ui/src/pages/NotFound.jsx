import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { getDefaultRouteForRole } from "@/constants/auth"

export function NotFound() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-center text-sm leading-loose">
        <div>
          <h1 className="font-medium">Pagina nao encontrada</h1>
          <p>Esta rota nao existe ou nao tens permissao para aceder.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild>
              <Link to={getDefaultRouteForRole(user?.role)}>Voltar ao Inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
