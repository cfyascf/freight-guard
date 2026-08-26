import { useState } from "react"
import { ArrowLeft, Truck, MapPin, User, Activity, Scale, Box, Save, X, Info } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterVehicle() {
  const navigate = useNavigate()
  
  // Estado espelhado aos campos do modo "update" da tela anterior
  const [formData, setFormData] = useState({
    plate: "",
    model: "",
    driver: "",
    location: "",
    weightKg: "",
    volumeM3: "",
    bodyType: "",
    status: "",
    axles: "",
    refrigeration: "Nenhuma",
    mopp: false,
  })

  return (
    <AppShell title="Cadastro de Veículo">
      {/* Container com scroll blindado e altura calculada em 8.5rem garantindo margem de segurança */}
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        
        {/* HEADER LIMPO E TEXTUAL */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Link to="/fleet-management">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Frota
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-9 border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Link to="/fleet-management"><X size={14} className="mr-1.5" /> Cancelar</Link>
            </Button>
            <Button className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Save size={14} className="mr-1.5" /> Salvar Veículo
            </Button>
          </div>
        </div>

        {/* Double Div (Container Blindado do Formulário) */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
          
            {/* O segredo do alinhamento: grid-rows-[auto_1fr] obriga as caixas a andarem em pares */}
            <div className="grid min-h-full gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr]">
              
              {/* ========================================================
                  LINHA 1: IDENTIFICAÇÃO (Esq) + ALOCAÇÃO (Dir)
                  ======================================================== */}
              
              {/* Bloco 1: Identificação Básica (Esquerda, Topo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <Truck size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Identificação do Veículo</h2>
                </div>
                
                <div className="flex flex-col p-5 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Placa do Veículo</label>
                    <Input 
                      placeholder="Ex: ABC-1234" 
                      value={formData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value})}
                      className="h-10 border-slate-200 text-sm font-mono font-bold uppercase placeholder:font-sans placeholder:font-normal focus:border-blue-500 focus:ring-blue-500" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Marca / Modelo</label>
                    <Input 
                      placeholder="Ex: Volvo FH 540" 
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-200 bg-slate-50/70 px-3 py-3 mt-2">
                    <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                        <Info size={14} className="text-blue-500"/>
                        A placa será usada como identificador único na frota.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloco 2: Alocação e Localização (Direita, Topo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <User size={16} className="text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Atribuição Física</h2>
                </div>
                
                <div className="flex flex-col p-5">
                  {/* Reaproveitamento visual da linha conectora do Itinerário original */}
                  <div className="relative space-y-6">
                    <div className="absolute bottom-5 left-3.5 top-8 w-px border-l-2 border-dashed border-slate-200" />
                    
                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-slate-800" />
                      <label className="text-xs font-bold text-slate-600">Motorista Responsável</label>
                      <Input 
                        placeholder="Nome do motorista (Opcional)" 
                        value={formData.driver}
                        onChange={(e) => setFormData({...formData, driver: e.target.value})}
                        className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" 
                      />
                    </div>

                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-500" />
                      <label className="text-xs font-bold text-slate-600">Pátio / Localização Atual</label>
                      <Input 
                        placeholder="Ex: Curitiba, PR" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================
                  LINHA 2: CUBAGEM E TIPO (Esq) + STATUS (Dir)
                  ======================================================== */}

              {/* Bloco 3: Dimensionamento e Equipamento (Esquerda, Baixo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <Scale size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Capacidade da Carroceria</h2>
                </div>
                
                <div className="flex flex-1 flex-col p-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Scale size={13} className="text-slate-400" /> Peso Suportado
                      </label>
                      <div className="relative">
                        <Input 
                            type="number" 
                            placeholder="0" 
                            value={formData.weightKg}
                            onChange={(e) => setFormData({...formData, weightKg: e.target.value})}
                            className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">kg</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Box size={13} className="text-slate-400" /> Volume Físico
                      </label>
                      <div className="relative">
                        <Input 
                            type="number" 
                            placeholder="0" 
                            value={formData.volumeM3}
                            onChange={(e) => setFormData({...formData, volumeM3: e.target.value})}
                            className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" 
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">m³</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Nº de Eixos</label>
                      <Input 
                          type="number" 
                          placeholder="Ex: 3" 
                          value={formData.axles}
                          onChange={(e) => setFormData({...formData, axles: e.target.value})}
                          className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" 
                      />
                      <p className="text-[10px] text-slate-400">Necessário para calcular o piso ANTT</p>
                    </div>
                  </div>

                  {/* MT-AUTO espelhado: Força a Restrição pro exato fundo da caixa */}
                  <div className="mt-auto border-t border-slate-100 pt-5 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Tipo de Carroceria</label>
                      <Select value={formData.bodyType} onValueChange={(v) => setFormData({...formData, bodyType: v})}>
                        <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                          <SelectValue placeholder="Selecione o implemento..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Carga Seca">Carga Seca Padrão</SelectItem>
                          <SelectItem value="Baú Sider">Baú Sider (Abertura Lateral)</SelectItem>
                          <SelectItem value="Frigorífico">Baú Frigorífico</SelectItem>
                          <SelectItem value="Refrigerado">Baú Refrigerado</SelectItem>
                          <SelectItem value="Carreta Prancha">Carreta Prancha / Aberta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-end">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Capacidade de Refrigeração</label>
                        <Select value={formData.refrigeration} onValueChange={(v) => setFormData({...formData, refrigeration: v})}>
                          <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nenhuma">Nenhuma</SelectItem>
                            <SelectItem value="Resfriado">Resfriado</SelectItem>
                            <SelectItem value="Congelado">Congelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFormData({...formData, mopp: !formData.mopp})}
                        className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-left transition-colors ${formData.mopp ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                      >
                        <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${formData.mopp ? "border-amber-600 bg-amber-500" : "border-slate-300"}`}>
                          {formData.mopp && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="text-xs font-bold text-slate-700">Habilitação MOPP</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco 4: Status Operacional (Direita, Baixo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <Activity size={16} className="text-amber-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Disponibilidade e Status</h2>
                </div>
                
                <div className="flex flex-1 flex-col p-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Status Operacional Inicial</label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                        <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                          <SelectValue placeholder="Defina o status atual do veículo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Livre" className="font-semibold text-emerald-700">Livre (Disponível para carga)</SelectItem>
                          <SelectItem value="Em Trânsito" className="font-semibold text-blue-700">Em Trânsito</SelectItem>
                          <SelectItem value="Manutenção" className="font-semibold text-amber-700">Em Manutenção</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>

                  {/* MT-AUTO espelhado: Força a info box pro exato fundo da caixa, igual ao "Orçamento Teto" anterior */}
                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
                        <h4 className="text-xs font-bold text-emerald-800 mb-1">Mesa de Operações</h4>
                        <p className="text-[11px] font-medium text-emerald-700 leading-relaxed">
                          Veículos criados com o status <strong className="font-bold">Livre</strong> serão automaticamente listados na mesa de operação e poderão receber atribuição de leilões e lances ativos.
                        </p>
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