import { ArrowLeft, Box, PlusCircle, Save, Waypoints } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productOptionsMock } from "@/constants/products-mock"

export default function CreateLoad() {
  return (
    <AppShell title="Lançamento de Nova Carga">
      <div className="mx-auto max-w-4xl">
        
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/load-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Cargas
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/load-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/load-management">
                <Save size={16} className="mr-2" /> Salvar Carga
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Main Column: Base Data */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <Box size={18} className="mr-2 text-blue-600" /> Física e Produto
                </CardTitle>
                <CardDescription>Valores utilizados para o cálculo da heurística de consolidação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">Produto Associado</p>
                    <Button asChild variant="outline" size="sm" className="border-slate-200">
                      <Link to="/create-product">
                        <PlusCircle size={14} className="mr-1" /> New Product
                      </Link>
                    </Button>
                  </div>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione um produto cadastrado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptionsMock.map((product) => (
                        <SelectItem key={product.id} value={product.value}>{product.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Peso Total (Toneladas)</p>
                    <Input type="number" step="0.1" placeholder="Ex: 12.5" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Cubagem (m³)</p>
                    <Input type="number" step="0.1" placeholder="Ex: 45.0" className="border-slate-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <Waypoints size={18} className="mr-2 text-blue-600" /> Detalhes do Trecho
                </CardTitle>
                <CardDescription>Associe esta carga a um trecho (origem-destino) específico.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">Trecho Selecionado</p>
                    <Button asChild variant="outline" size="sm" className="border-slate-200">
                      {/* Aponta para o novo ecrã que criámos */}
                      <Link to="/create-stretch">
                        <PlusCircle size={14} className="mr-1" /> Novo Trecho
                      </Link>
                    </Button>
                  </div>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione um trecho cadastrado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Exemplos estáticos - no futuro virão da API */}
                      <SelectItem value="tr1">Curitiba, PR ➔ São Paulo, SP</SelectItem>
                      <SelectItem value="tr2">São Paulo, SP ➔ Rio de Janeiro, RJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Coleta Limite (SLA)</p>
                    <Input type="date" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Entrega Limite</p>
                    <Input type="date" className="border-slate-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </div>
    </AppShell>
  )
}