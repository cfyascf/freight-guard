import { useState } from "react"
import { ArrowLeft, Package, Save, SlidersHorizontal, Tag, X } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const productTypes = ["Eletrônicos", "Alimentício", "Químico", "Siderúrgico", "Farmacêutico"]

export default function CreateProduct() {
  const [requirements, setRequirements] = useState([])
  const [newRequirement, setNewRequirement] = useState("")
  const [specifications, setSpecifications] = useState({
    fragil: false,
    refrigerado: false,
    hazmat: false,
  })

  const handleAddRequirement = (e) => {
    e.preventDefault()
    const trimmedRequirement = newRequirement.trim()

    if (trimmedRequirement !== "" && !requirements.includes(trimmedRequirement)) {
      setRequirements([...requirements, trimmedRequirement])
      setNewRequirement("")
    }
  }

  const handleRemoveRequirement = (requirementToRemove) => {
    setRequirements(requirements.filter((req) => req !== requirementToRemove))
  }

  const handleSpecificationChange = (key, value) => {
    setSpecifications((current) => ({ ...current, [key]: value }))
  }

  return (
    <AppShell title="Cadastro de Novo Produto">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/create-load">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Lançamento de Carga
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/products-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/products-management">
                <Save size={16} className="mr-2" /> Salvar Produto
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                <Package size={18} className="mr-2 text-blue-600" /> Dados do Produto
              </CardTitle>
              <CardDescription>
                Defina as características do produto para disponibilizá-lo no lançamento de cargas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Nome do Produto</p>
                <Input placeholder="Ex: Vacinas H1N1" className="border-slate-200" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Tipo do Produto</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">Especificações do Produto</CardTitle>
              <CardDescription className="text-xs">
                Defina requisitos e atributos operacionais para gerar a estrutura JSON do produto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <Tabs defaultValue="requirements" className="w-full">
                <TabsList className="h-10 w-full bg-white/70">
                  <TabsTrigger value="specifications" className="flex-1">
                    <SlidersHorizontal size={14} className="mr-1" /> Especificações
                  </TabsTrigger>
                  <TabsTrigger value="requirements" className="flex-1">
                    <Tag size={14} className="mr-1" /> Requisitos Específicos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="mt-5 min-h-40 space-y-3">
                  <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
                    <p className="text-sm font-medium text-slate-700">Frágil</p>
                    <Switch
                      checked={specifications.fragil}
                      onCheckedChange={(checked) => handleSpecificationChange("fragil", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
                    <p className="text-sm font-medium text-slate-700">Refrigerado</p>
                    <Switch
                      checked={specifications.refrigerado}
                      onCheckedChange={(checked) => handleSpecificationChange("refrigerado", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2">
                    <p className="text-sm font-medium text-slate-700">Hazmat</p>
                    <Switch
                      checked={specifications.hazmat}
                      onCheckedChange={(checked) => handleSpecificationChange("hazmat", checked)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="mt-5 min-h-40">
                  <form onSubmit={handleAddRequirement} className="flex space-x-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="Ex: Frágil, Refrigerado..."
                      className="border-slate-200 bg-white"
                    />
                    <Button type="submit" variant="secondary" className="bg-blue-100 px-3 text-blue-700 hover:bg-blue-200">
                      Add
                    </Button>
                  </form>

                  <div className="flex flex-wrap gap-2 pt-3">
                    {requirements.length === 0 && (
                      <p className="text-xs italic text-slate-400">Nenhum requisito especial adicionado.</p>
                    )}
                    {requirements.map((requirement) => (
                      <Badge key={requirement} className="flex items-center gap-1 border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50">
                        {requirement}
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(requirement)}
                          className="rounded-full text-slate-400 hover:text-red-500 focus:outline-none"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
