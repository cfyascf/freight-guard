import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Shield, Lock, User as UserIcon, AlertCircle } from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = (e) => {
    e.preventDefault()

    if (usuario === "teste" && senha === "1111") {
      setErro(false)
      login({ name: "Pedro Netto", role: ROLES.DEVELOPER })

      const nextPath = location.state?.from?.pathname || "/dashboard"
      navigate(nextPath, { replace: true })
    } else {
      setErro(true)
    }
  }

  return (
    // Como NÃO tem o <AppShell>, esta div toma conta da tela toda sem Menu Lateral
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Shield size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">FreightGuard</CardTitle>
          <CardDescription>
            O sistema de gestão de entregas mais utilizado no Brasil.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            
            {/* Mensagem de Erro Condicional */}
            {erro && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                <AlertCircle size={16} />
                <span>Usuário ou senha incorretos.</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="user">Usuário</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="user" 
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Digite 'teste' para logar" 
                  className="pl-9" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id="password" 
                  type="password" 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite '1111' para logar" 
                  className="pl-9" 
                  required 
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-1">
              {/* Botão apenas visual por enquanto, com type="button" para não submeter o formulário */}
              <Button 
                variant="link" 
                type="button"
                className="px-0 text-xs text-blue-600 hover:text-blue-700 h-auto"
              >
                Esqueceu sua senha?
              </Button>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}