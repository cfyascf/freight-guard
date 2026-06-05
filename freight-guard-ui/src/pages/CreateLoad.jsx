import { ArrowLeft, PackageOpen, Truck, MapPinned, CalendarClock, DollarSign, Scale, Box, Save, X } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateLoad() {
  return (
    <AppShell title="Cadastro de Trecho">
      <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-5xl flex-col gap-4 overflow-hidden">
        
        {/* HEADER LIMPO E TEXTUAL (Mesmo padrão do Workspace) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <Link to="/load-management">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Trechos
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-9 border-slate-200 text-xs font-semibold text-slate-700">
              <Link to="/load-management"><X size={14} className="mr-1.5" /> Cancelar</Link>
            </Button>
            <Button className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Save size={14} className="mr-1.5" /> Salvar Trecho Operacional
            </Button>
          </div>
        </div>

        {/* FORMULÁRIO PRINCIPAL (Dividido em 2 grandes pilares lógicos) */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* ==========================================
                PILAR ESQUERDO: A CARGA E O VEÍCULO (O Físico)
                ========================================== */}
            <div className="flex flex-col gap-6">
              
              {/* Bloco 1: Identificação da Mercadoria */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Especificações da Carga</h2>
                </div>
                
                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Produto Principal</label>
                    <Input placeholder="Ex: Peito de Frango Congelado" className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Tipo de Acomodação</label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                        <SelectValue placeholder="Selecione o formato..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paletizado">Carga Paletizada</SelectItem>
                        <SelectItem value="caixas">Caixas Master (Batida)</SelectItem>
                        <SelectItem value="granel">Granel Sólido</SelectItem>
                        <SelectItem value="liquido">Granel Líquido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Bloco 2: Dimensionamento e Restrição de Frota */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
                  <Truck size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cubagem e Veículo Exigido</h2>
                </div>
                
                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Scale size={13} className="text-slate-400" /> Peso Total
                      </label>
                      <div className="relative">
                        <Input type="number" placeholder="0" className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">kg</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Box size={13} className="text-slate-400" /> Volume
                      </label>
                      <div className="relative">
                        <Input type="number" placeholder="0" className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">m³</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Tipo de Carroceria Requisitada</label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                        <SelectValue placeholder="Qual caminhão atende este trecho?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seca">Carga Seca Padrão</SelectItem>
                        <SelectItem value="sider">Baú Sider (Abertura Lateral)</SelectItem>
                        <SelectItem value="frigorifico">Baú Frigorífico / Refrigerado</SelectItem>
                        <SelectItem value="prancha">Carreta Prancha / Aberta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                PILAR DIREITO: GEOGRAFIA, TEMPO E CUSTO
                ========================================== */}
            <div className="flex flex-col gap-6">
              
              {/* Bloco 3: Malha Logística (Origem e Destino) */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
                  <MapPinned size={16} className="text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Itinerário Físico</h2>
                </div>
                
                <div className="space-y-4 p-5">
                  <div className="relative space-y-4">
                    {/* Elemento visual de conexão entre Origem e Destino */}
                    <div className="absolute bottom-5 left-3.5 top-8 w-px border-l-2 border-dashed border-slate-200" />
                    
                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-slate-800 shadow-sm" />
                      <label className="text-xs font-bold text-slate-600">Local de Coleta (Origem)</label>
                      <Input placeholder="Ex: Curitiba, PR" className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>

                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-500 shadow-sm" />
                      <label className="text-xs font-bold text-slate-600">Local de Entrega (Destino)</label>
                      <Input placeholder="Ex: São Paulo, SP" className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco 4: SLA e Balizamento Financeiro */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
                  <CalendarClock size={16} className="text-amber-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Prazos e Meta Comercial</h2>
                </div>
                
                <div className="space-y-5 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Coleta Limite (Deadline)</label>
                      <Input type="datetime-local" className="h-10 border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Entrega Limite (Deadline)</label>
                      <Input type="datetime-local" className="h-10 border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <DollarSign size={14} className="text-emerald-500" /> Preço Alvo do Trecho
                    </label>
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">R$</span>
                      <Input type="number" placeholder="0,00" className="h-10 border-slate-200 pl-9 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
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