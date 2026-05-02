import { useState } from "react"
import { ArrowLeft, Save, Tag, Truck, X } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VehicleForm() {
  const [attributes, setAttributes] = useState([])
  const [newAttribute, setNewAttribute] = useState("")

  const handleAddAttribute = (e) => {
    e.preventDefault()
    const trimmedAttr = newAttribute.trim()
    
    if (trimmedAttr !== "" && !attributes.includes(trimmedAttr)) {
      setAttributes([...attributes, trimmedAttr])
      setNewAttribute("")
    }
  }

  const handleRemoveAttribute = (attrToRemove) => {
    setAttributes(attributes.filter(attr => attr !== attrToRemove))
  }

  return (
    <AppShell title="Cadastro de Veículo">
      <div className="mx-auto max-w-4xl">
        
        <div className="mb-6 flex items-center justify-between">
          <Link to="/fleet-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Frota
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/fleet-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
              <Link to="/fleet-management">
                <Save size={16} className="mr-2" /> Salvar Veículo
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Main Info */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                <Truck size={18} className="mr-2 text-slate-600" /> Identificação e Capacidade
              </CardTitle>
              <CardDescription>Dados base para o algoritmo de roteirização.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Placa</label>
                  <Input placeholder="ABC-1234" className="border-slate-200 uppercase" maxLength={8} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Modelo</label>
                  <Input placeholder="Ex: Volvo FH 540" className="border-slate-200" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tipo de Carroceria</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bau">Carreta Baú</SelectItem>
                    <SelectItem value="sider">Sider</SelectItem>
                    <SelectItem value="refrigerado">Refrigerado</SelectItem>
                    <SelectItem value="graneleiro">Graneleiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Carga Útil (Ton)</label>
                  <Input type="number" step="0.1" placeholder="Ex: 30.0" className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Volume Útil (m³)</label>
                  <Input type="number" step="0.1" placeholder="Ex: 115.0" className="border-slate-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JSONB Attributes */}
          <Card className="border-slate-200 shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                <Tag size={18} className="mr-2 text-slate-600" /> Atributos Especiais (JSONB)
              </CardTitle>
              <CardDescription>
                Certificações e equipamentos que o veículo possui para dar "match" com cargas específicas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddAttribute} className="flex space-x-2">
                <Input 
                  value={newAttribute}
                  onChange={(e) => setNewAttribute(e.target.value)}
                  placeholder="Ex: MOPP, Rastreador, Anvisa..." 
                  className="border-slate-200 bg-white"
                />
                <Button type="submit" variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300">
                  Add
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                {attributes.length === 0 && (
                  <p className="text-xs text-slate-400 italic">Nenhum atributo cadastrado.</p>
                )}
                {attributes.map((attr, index) => (
                  <Badge key={index} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-1 px-2 flex items-center gap-1 font-medium">
                    {attr}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveAttribute(attr)}
                      className="text-slate-400 hover:text-red-500 rounded-full focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </AppShell>
  )
}