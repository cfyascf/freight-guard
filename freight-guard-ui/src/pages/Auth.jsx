import { useState } from "react"
import { Building2, Shield, Truck } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Auth() {
  const [accountType, setAccountType] = useState("contractor")
  const navigate = useNavigate()

  // Simulação de login para o TCC (Redirecionamento)
  const handleLogin = (e) => {
    e.preventDefault()
    // No mundo real, aqui você faria o POST para a sua API .NET
    // e ela devolveria um JWT (Token) com a role do usuário.
    // Para a apresentação, vamos redirecionar fixo para o dashboard executivo.
    navigate("/") 
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Lado Esquerdo: Branding / Apresentação */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div>
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Freight<span className="text-blue-500">Guard</span>
          </h1>
          <p className="max-w-md text-lg text-slate-400">
            A plataforma definitiva de consolidação de cargas e prevenção de overbooking. 
            Conectando operadores logísticos a transportadoras com eficiência e segurança.
          </p>
        </div>
        
        <div className="space-y-4 text-sm text-slate-500">
          <p>&copy; 2026 FreightGuard Systems.</p>
          <p>TCC Engineering Project</p>
        </div>
      </div>

      {/* Lado Direito: Formulários */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-32">
        <div className="mx-auto w-full max-w-md">
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 bg-slate-200/50 p-1">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Criar Conta
              </TabsTrigger>
            </TabsList>

            {/* ABA DE LOGIN */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bem-vindo de volta</h2>
                <p className="text-sm text-slate-500">Insira suas credenciais para acessar o painel.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="email">Email Corporativo</label>
                  <Input id="email" type="email" placeholder="nome@empresa.com" required className="border-slate-200" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700" htmlFor="password">Senha</label>
                    <Link to="/auth" className="text-xs font-medium text-blue-600 hover:underline">Esqueceu a senha?</Link>
                  </div>
                  <Input id="password" type="password" required className="border-slate-200" />
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-2">
                  Entrar no Sistema
                </Button>
              </form>
            </TabsContent>

            {/* ABA DE REGISTRO */}
            <TabsContent value="register" className="space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Nova Conta</h2>
                <p className="text-sm text-slate-500">Selecione seu perfil e preencha os dados.</p>
              </div>

              <form className="space-y-4">
                {/* Seleção de Perfil (Role) */}
                <div className="grid grid-cols-2 gap-4 pb-2">
                  <div 
                    onClick={() => setAccountType("contractor")}
                    className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                      accountType === "contractor" 
                        ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <Building2 size={24} className={`mx-auto mb-2 ${accountType === "contractor" ? "text-blue-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${accountType === "contractor" ? "text-blue-900" : "text-slate-700"}`}>
                      Operador Logístico
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">Contratar fretes</p>
                  </div>

                  <div 
                    onClick={() => setAccountType("carrier")}
                    className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                      accountType === "carrier" 
                        ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <Truck size={24} className={`mx-auto mb-2 ${accountType === "carrier" ? "text-blue-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${accountType === "carrier" ? "text-blue-900" : "text-slate-700"}`}>
                      Transportadora
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">Realizar fretes</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="companyName">Nome da Empresa</label>
                  <Input id="companyName" type="text" placeholder="Razão Social" required className="border-slate-200" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="regEmail">Email Corporativo</label>
                  <Input id="regEmail" type="email" placeholder="nome@empresa.com" required className="border-slate-200" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="regPassword">Senha</label>
                  <Input id="regPassword" type="password" required className="border-slate-200" />
                </div>

                <Button
                  type="button"
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 mt-2"
                  onClick={() => navigate("/")}
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