import { ArrowLeft, CheckSquare, Route, Save, Truck } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CreateRoute() {
  return (
    <AppShell title="Formação de Nova Rota">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/route-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Rotas
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/route-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/route-management">
                <Save size={16} className="mr-2" /> Salvar Rota
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna da Esquerda: Seleção de Cargas */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <CheckSquare size={18} className="mr-2 text-blue-600" /> Seleção de Cargas (Consolidação)
                </CardTitle>
                <CardDescription>
                  Selecione as cargas que farão parte desta rota. O itinerário completo será gerado com base nos trechos das cargas selecionadas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Lista Simulada de Cargas Disponíveis */}
                <div className="space-y-3">
                  
                  {/* Carga 1 */}
                  <label className="flex items-start space-x-3 p-4 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-bold text-sm text-slate-800">Carga #1024 - Produtos Eletrónicos</p>
                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">12.5 Ton</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-semibold text-slate-700">Trecho:</span> Curitiba, PR ➔ São Paulo, SP
                      </p>
                      <p className="text-xs text-slate-500 mt-1">SLA: 25/05/2026 | Cubagem: 45m³</p>
                    </div>
                  </label>

                  {/* Carga 2 */}
                  <label className="flex items-start space-x-3 p-4 border border-slate-200 rounded-md bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-bold text-sm text-slate-800">Carga #1025 - Peças Auto</p>
                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">5.0 Ton</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        <span className="font-semibold text-slate-700">Trecho:</span> São Paulo, SP ➔ Campinas, SP
                      </p>
                      <p className="text-xs text-slate-500 mt-1">SLA: 26/05/2026 | Cubagem: 15m³</p>
                    </div>
                  </label>

                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita: Resumo da Rota */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm bg-slate-50">
              <CardHeader>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center">
                  <Route size={18} className="mr-2 text-slate-600" /> Resumo do Itinerário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="pb-4 border-b border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Origem Inicial</p>
                  <p className="text-sm font-medium text-slate-800">Curitiba, PR</p>
                </div>

                <div className="pb-4 border-b border-slate-200">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Destino Final</p>
                  <p className="text-sm font-medium text-slate-800">Campinas, SP</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total de Cargas:</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Peso Total:</span>
                    <span className="font-bold">17.5 Ton</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Paragens:</span>
                    <span className="font-bold">1 (São Paulo)</span>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-2">Tarifa Base Oferecida (R$)</p>
                  <Input type="number" placeholder="Ex: 1500,00" className="bg-white border-slate-200" />
                </div>

              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </AppShell>
  )
}