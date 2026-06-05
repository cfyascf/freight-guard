import { useState } from "react"
import { ArrowLeft, Save, X, PackageOpen, Box, AlertTriangle, Snowflake, FileText, Layers, Scale } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateProduct() {
  const navigate = useNavigate()
  
  // Estados corrigidos e completos
  const [temperatura, setTemperatura] = useState("Ambiente")
  const [perigosa, setPerigosa] = useState(false)
  const [fragil, setFragil] = useState(false)
  const [empilhavel, setEmpilhavel] = useState(true)
  const [isTemplate, setIsTemplate] = useState(false)

  return (
    <AppShell title="Novo Cadastro de SKU">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Link to="/product-management">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar ao Catálogo
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-9 border-slate-200 text-xs font-semibold text-slate-700 bg-white" onClick={() => navigate("/product-management")}>
              <X size={14} className="mr-1.5" /> Cancelar
            </Button>
            <Button className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Save size={14} className="mr-1.5" /> Salvar Novo SKU
            </Button>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
              
              {/* Bloco: Identificação */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Identificação do SKU</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Nome do Produto</label>
                    <Input placeholder="Ex: Peito de Frango Congelado" className="h-10 border-slate-200 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Código SKU</label>
                      <Input placeholder="Ex: FRG-001" className="h-10 border-slate-200 text-sm font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Categoria</label>
                      <Input placeholder="Ex: Congelados" className="h-10 border-slate-200 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco: Dimensões */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <Scale size={16} className="text-slate-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dimensões Base</h2>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Peso Base (Kg)</label>
                    <Input type="number" placeholder="0" className="h-10 border-slate-200 text-sm font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Volume (m³)</label>
                    <Input type="number" step="0.01" placeholder="0" className="h-10 border-slate-200 text-sm font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Max. Camadas</label>
                    <Input type="number" step="0.01" placeholder="0" className="h-10 border-slate-200 text-sm font-mono" />
                  </div>
                </div>
              </div>

              {/* BLOCO: REGRAS DE RISCO OPERACIONAL */}
              <div className="rounded-xl border border-slate-200 bg-white md:col-span-2">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <AlertTriangle size={16} className="text-amber-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Regras de Risco Operacional</h2>
                </div>
                
                <div className="p-5 space-y-4">
                  {/* Controle de Temperatura */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Ambiente de Transporte</label>
                    <Select onValueChange={setTemperatura} value={temperatura}>
                      <SelectTrigger className="h-10 border-slate-200 text-sm"><SelectValue placeholder="Ambiente" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ambiente">Seco / Ambiente</SelectItem>
                        <SelectItem value="Refrigerado">Refrigerado (Positivo)</SelectItem>
                        <SelectItem value="Congelado">Congelado (Negativo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Inputs condicionais */}
                  {temperatura !== "Ambiente" && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-200">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-sky-600">Temp. Mínima (°C)</label>
                            <Input type="number" placeholder="0" className="h-10 border-sky-200 bg-sky-50 text-sm font-mono text-sky-800" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Temp. Máxima (°C)</label>
                            <Input type="number" placeholder="0" className="h-10 border-rose-200 bg-rose-50 text-sm font-mono text-rose-800" />
                        </div>
                    </div>
                  )}

                  {/* Toggles */}
                  <div className="flex flex-col gap-3 pt-2">
                      <div className={`rounded-xl border p-4 transition-all ${perigosa ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white"}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => setPerigosa(!perigosa)} className={`mt-0.5 h-4 w-4 rounded border ${perigosa ? "bg-amber-500 border-amber-600" : "border-slate-300"}`} />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800">Carga Perigosa (Hazmat)</p>
                            {perigosa && (
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <Input placeholder="ONU" className="h-8 text-xs font-mono" />
                                <Input placeholder="Classe" className="h-8 text-xs font-mono" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button onClick={() => setFragil(!fragil)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-slate-300">
                        <div className={`h-4 w-4 rounded border ${fragil ? "bg-rose-500 border-rose-600" : "border-slate-300"}`} />
                        <p className="text-sm font-bold text-slate-800">Carga Frágil</p>
                      </button>

                      <button onClick={() => setEmpilhavel(!empilhavel)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-slate-300">
                        <div className={`h-4 w-4 rounded border ${empilhavel ? "bg-blue-600 border-blue-700" : "border-slate-300"}`} />
                        <p className="text-sm font-bold text-slate-800">Permite Empilhamento</p>
                      </button>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-600 mb-2 block">Observações de Manuseio</label>
                    <Textarea placeholder="Instruções para pátio ou carga..." className="border-slate-200 text-sm min-h-[80px]" />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                      <Layers size={14} /> Salvar como Modelo Frequente
                    </div>
                    <button type="button" onClick={() => setIsTemplate(!isTemplate)} className={`h-6 w-11 rounded-full relative transition-colors duration-200 ${isTemplate ? 'bg-blue-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${isTemplate ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}