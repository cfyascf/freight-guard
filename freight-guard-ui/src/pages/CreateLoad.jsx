import { useState } from "react"
import { ArrowLeft, Box, Save, Tag, X } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateLoad() {
  const [requirements, setRequirements] = useState([])
  const [newRequirement, setNewRequirement] = useState("")

  const handleAddRequirement = (e) => {
    e.preventDefault()
    const trimmedRequirement = newRequirement.trim()
    
    if (trimmedRequirement !== "" && !requirements.includes(trimmedRequirement)) {
      setRequirements([...requirements, trimmedRequirement])
      setNewRequirement("")
    }
  }

  const handleRemoveRequirement = (requirementToRemove) => {
    setRequirements(requirements.filter(req => req !== requirementToRemove))
  }

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
                <CardTitle className="text-lg font-bold text-slate-800">Detalhes da Rota</CardTitle>
                <CardDescription>Defina a origem e destino baseados nas rotas cadastradas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Rota Selecionada</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma rota..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="route-1">Curitiba, PR → São Paulo, SP</SelectItem>
                      <SelectItem value="route-2">Joinville, SC → Campinas, SP</SelectItem>
                      <SelectItem value="route-3">Araucária, PR → Rio de Janeiro, RJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Data de Coleta</label>
                    <Input type="date" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Data Limite de Entrega</label>
                    <Input type="date" className="border-slate-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <Box size={18} className="mr-2 text-blue-600" /> Física e Produto
                </CardTitle>
                <CardDescription>Valores utilizados para o cálculo da heurística de consolidação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Produto Associado</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto cadastrado..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prod-1">Peças Automotivas (Carga Seca)</SelectItem>
                      <SelectItem value="prod-2">Medicamentos (Termolábil)</SelectItem>
                      <SelectItem value="prod-3">Aço em Bobinas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Peso Total (Toneladas)</label>
                    <Input type="number" step="0.1" placeholder="Ex: 12.5" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Cubagem (m³)</label>
                    <Input type="number" step="0.1" placeholder="Ex: 45.0" className="border-slate-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column: JSONB and Financials */}
          <div className="space-y-6">
            
            <Card className="border-slate-200 shadow-sm bg-blue-50/30">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-800 flex items-center">
                  <Tag size={16} className="mr-2 text-blue-600" /> Requisitos Específicos
                </CardTitle>
                <CardDescription className="text-xs">
                  Estes atributos gerarão a estrutura JSONB no banco de dados para o match.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAddRequirement} className="flex space-x-2">
                  <Input 
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Ex: Frágil, Refrigerado..." 
                    className="border-slate-200 bg-white"
                  />
                  <Button type="submit" variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3">
                    Add
                  </Button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {requirements.length === 0 && (
                    <p className="text-xs text-slate-400 italic">Nenhum requisito especial adicionado.</p>
                  )}
                  {requirements.map((requirement, index) => (
                    <Badge key={index} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-1 px-2 flex items-center gap-1 font-medium">
                      {requirement}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveRequirement(requirement)}
                        className="text-slate-400 hover:text-red-500 rounded-full focus:outline-none"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold text-slate-800 flex items-center">
                  Financeiro (Leilão)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Valor Teto (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm text-slate-500">R$</span>
                    <Input type="number" placeholder="0,00" className="pl-9 border-slate-200" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Este será o valor máximo ofertado no mercado.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AppShell>
  )
}