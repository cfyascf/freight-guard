import { useState } from "react"
import { Building2, Shield, Truck, Package } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Função de redirecionamento dinâmico que criamos
import { getDefaultRouteForRole } from "@/routes/route-guards"

export default function Auth() {
  const [accountType, setAccountType] = useState(ROLES.CONTRACTOR)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()

  // Mantém na aba certa dependendo de qual URL o usuário acessou (/login ou /register)
  const activeTab = location.pathname === "/register" ? "register" : "login"

  // CORREÇÃO: Redirecionamento inteligente de Login
  const handleLogin = (e) => {
    e.preventDefault()

    // Simula o login passando o role selecionado
    login({ role: accountType })

    // Descobre para onde o usuário deve ir
    const defaultRoute = getDefaultRouteForRole(accountType)

    // Se ele tentou acessar um link privado antes de logar, manda pra lá. Se não, manda pra Home dele.
    const nextPath = location.state?.from?.pathname || defaultRoute

    navigate(nextPath, { replace: true })
  }

  // CORREÇÃO: Redirecionamento inteligente ao Criar Conta
  const handleRegister = (e) => {
    e.preventDefault()

    register({ role: accountType })

    // Manda direto para o dashboard correto
    navigate(getDefaultRouteForRole(accountType), { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Banner Esquerdo - Branding (Oculto no Mobile) */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div>
          <div className="flex items-center gap-2 text-3xl font-bold">
            <Package className="h-10 w-10 text-blue-500" />
            SIGLOC
          </div>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Sistema Inteligente de Gestão Logística de Cargas. Otimize sua
            frota, evite overbooking e potencialize a rentabilidade das suas
            operações.
          </p>
        </div>
        <div className="text-sm font-medium text-slate-500">
          © 2026 SIGLOC. Todos os direitos reservados.
        </div>
      </div>

      {/* Painel Direito - Formulários */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-32">
        <div className="mx-auto w-full max-w-md">
          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 bg-slate-200/50 p-1">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Criar Conta
              </TabsTrigger>
            </TabsList>

            {/* Seleção de Perfil (Aparece em ambas as abas) */}
            <div className="mb-8">
              <p className="mb-4 text-center text-xs font-bold tracking-wider text-slate-500 uppercase">
                Selecione seu perfil de acesso
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                    accountType === ROLES.CONTRACTOR
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  onClick={() => setAccountType(ROLES.CONTRACTOR)}
                >
                  <Building2 className="mb-2 h-6 w-6" />
                  <span className="text-center text-sm font-semibold">
                    Operador Logístico
                  </span>
                </div>

                <div
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4 transition-all ${
                    accountType === ROLES.CARRIER
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  onClick={() => setAccountType(ROLES.CARRIER)}
                >
                  <Truck className="mb-2 h-6 w-6" />
                  <span className="text-center text-sm font-semibold">
                    Transportador
                  </span>
                </div>
              </div>
            </div>

            {/* Conteúdo Aba Login */}
            <TabsContent
              value="login"
              className="animate-in space-y-6 duration-500 fade-in-50"
            >
              <div className="space-y-2 text-center md:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Bem-vindo de volta
                </h1>
                <p className="text-sm text-slate-500">
                  Insira suas credenciais para acessar o painel.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">
                    E-mail corporativo
                  </label>
                  <Input
                    type="email"
                    placeholder="nome@empresa.com"
                    required
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Senha
                    </label>
                    <Link
                      to="#"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-slate-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 h-11 w-full bg-slate-900 text-base text-white shadow-sm hover:bg-slate-800"
                >
                  Entrar no Sistema
                </Button>
              </form>
            </TabsContent>

            {/* Conteúdo Aba Criar Conta */}
            <TabsContent
              value="register"
              className="animate-in space-y-6 duration-500 fade-in-50"
            >
              <div className="space-y-2 text-center md:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Crie sua conta
                </h1>
                <p className="text-sm text-slate-500">
                  Preencha os dados abaixo para iniciar no SIGLOC.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Nome da Empresa / Razão Social
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Rumo Transportes LTDA"
                    required
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">
                    E-mail corporativo
                  </label>
                  <Input
                    type="email"
                    placeholder="nome@empresa.com"
                    required
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">
                    Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="Crie uma senha forte"
                    required
                    className="border-slate-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 h-11 w-full bg-slate-900 text-base text-white shadow-sm hover:bg-slate-800"
                >
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
