import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, Box, AlertTriangle, Save, Trash2, PackageOpen, Tag, Scale, Info, Snowflake, Flame, Pencil, X, FileText } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductManagement() {
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([
    {
      id: "PRD-1001",
      sku: "CBO-099",
      nome: "Cebola Roxa (Saca 20kg)",
      tipo: "Alimentício",
      pesoPadrao: 20,
      volumePadrao: 0.05,
      fragil: false,
      empilhavel: true,
      maxCamadas: 5,
      tipoHu: "paletizado",
      temperatura: "Ambiente",
      tempMin: null,
      tempMax: null,
      perigosa: false,
      onu: "",
      classeRisco: "",
      descricao: "Atenção: Necessita de baú ventilado (Sider ou Carga Seca sem lona esticada) para evitar apodrecimento por umidade.",
    },
    {
      id: "PRD-1003",
      sku: "VD-MED",
      nome: "Ampolas de Vacina (Lote)",
      tipo: "Medicamento",
      pesoPadrao: 5,
      volumePadrao: 0.1,
      fragil: true,
      empilhavel: false,
      maxCamadas: 1,
      tipoHu: "caixas",
      temperatura: "Refrigerado",
      tempMin: 2,
      tempMax: 8,
      perigosa: false,
      onu: "",
      classeRisco: "",
      descricao: "Material biológico sensível. Exige registrador de temperatura (datalogger) ativado na viagem.",
    },
    {
      id: "PRD-1005",
      sku: "GL-SDA",
      nome: "Soda Cáustica Líquida (IBC)",
      tipo: "Químico",
      pesoPadrao: 1200,
      volumePadrao: 1.0,
      fragil: false,
      empilhavel: true,
      maxCamadas: 2,
      tipoHu: "caixas",
      temperatura: "Ambiente",
      tempMin: null,
      tempMax: null,
      perigosa: true,
      onu: "1824",
      classeRisco: "8",
      descricao: "Corrosivo grave. Obrigatório veículo com licença MOPP e kit de contenção de derramamento químico a bordo.",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  
  // NOVO: Estado que controla se a tela da direita está em modo de edição
  const [isEditing, setIsEditing] = useState(false)
  
  const activeProduct = produtos.find(p => p.id === selectedId)

  const filteredProdutos = produtos.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateField = (field, value) => {
    setProdutos(current => 
      current.map(p => p.id === selectedId ? { ...p, [field]: value } : p)
    )
  }

  const handleDelete = () => {
    setProdutos(current => current.filter(p => p.id !== selectedId))
    setSelectedId(null)
    setIsEditing(false)
  }

  const handleSelectProduct = (id) => {
    setSelectedId(id)
    setIsEditing(false) // Sempre que trocar de produto, trava a tela de novo
  }

  const handleSave = () => {
    // Aqui no futuro você enviaria os dados para a API (Backend)
    setIsEditing(false) // Trava a tela novamente indicando sucesso
  }

  return (
    <AppShell title="Catálogo de Produtos">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl gap-6 overflow-hidden">
        
        {/* =========================================================
            PAINEL ESQUERDO: LISTAGEM DE PRODUTOS
            ========================================================= */}
        <div className="flex w-full flex-col rounded-xl border border-slate-200 bg-white lg:w-1/2 xl:w-[45%]">
          
          <div className="flex shrink-0 flex-col gap-3 border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Catálogo de SKUs ({produtos.length})</h2>
              <Button size="sm" onClick={() => navigate("/create-product")} className="h-8 bg-blue-600 text-xs font-bold text-white hover:bg-blue-700">
                <Plus size={14} className="mr-1.5" /> Novo SKU
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome ou código..."
                className="h-9 border-slate-200 bg-slate-50 pl-9 text-xs focus:bg-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col divide-y divide-slate-100">
              {filteredProdutos.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">Nenhum produto encontrado.</div>
              ) : (
                filteredProdutos.map((produto) => {
                  const isSelected = selectedId === produto.id

                  return (
                    <button
                      key={produto.id}
                      onClick={() => handleSelectProduct(produto.id)}
                      className={`flex w-full items-start gap-4 p-4 text-left transition-colors focus:outline-none ${
                        isSelected ? "bg-blue-50/50" : "bg-white hover:bg-slate-50/70"
                      }`}
                    >
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isSelected ? "bg-blue-600" : "bg-transparent"}`} />
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-slate-500">{produto.sku}</span>
                          <div className="flex gap-1">
                            {produto.perigosa && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-none px-1.5 py-0 text-[9px] uppercase font-black tracking-wider flex items-center">
                                <Flame size={10} className="mr-1" /> Hazmat
                              </Badge>
                            )}
                            {produto.temperatura !== "Ambiente" && (
                              <Badge variant="secondary" className="bg-sky-100 text-sky-700 border-none px-1.5 py-0 text-[9px] uppercase font-black tracking-wider flex items-center">
                                <Snowflake size={10} className="mr-1" /> {produto.temperatura}
                              </Badge>
                            )}
                            {produto.fragil && (
                              <Badge variant="secondary" className="bg-rose-50 text-rose-600 border-none px-1.5 py-0 text-[9px] uppercase font-black tracking-wider">
                                Frágil
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <h3 className={`text-sm truncate ${isSelected ? "font-bold text-blue-900" : "font-semibold text-slate-800"}`}>
                          {produto.nome}
                        </h3>
                        <p className="mt-1 text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                          <Tag size={12} /> {produto.tipo} • {produto.pesoPadrao}kg
                        </p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
            PAINEL DIREITO: DETALHES E EDIÇÃO
            ========================================================= */}
        <div className="hidden lg:flex w-full flex-col rounded-xl border border-slate-200 bg-white lg:w-1/2 xl:w-[55%]">
          
          {!activeProduct ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-slate-500">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                <PackageOpen size={32} className="text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Nenhum item selecionado</p>
              <p className="text-xs mt-1">Selecione um produto na lista ao lado para visualizar e editar seus parâmetros.</p>
            </div>
          ) : (
            <>
              {/* HEADER DIREITO (Com botões de ação) */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center gap-2">
                  <Box size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Raio-X do SKU</h2>
                  {!isEditing && <Badge variant="outline" className="ml-2 bg-white text-[9px] text-slate-400">Somente Leitura</Badge>}
                </div>
                
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 text-xs font-semibold text-slate-700 hover:bg-slate-100 bg-white">
                      <Pencil size={14} className="mr-1.5" /> Editar
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleDelete} className="h-8 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                    <Trash2 size={14} className="mr-1.5" /> Excluir
                  </Button>
                </div>
              </div>

              {/* CORPO DO FORMULÁRIO */}
              <div className={`flex-1 overflow-y-auto p-6 ${!isEditing ? "opacity-95" : ""}`}>
                <div className="space-y-8 max-w-md">
                  
                  {/* Bloco 1: Identidade */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nome do Produto</label>
                      <Input 
                        disabled={!isEditing}
                        value={activeProduct.nome} 
                        onChange={(e) => handleUpdateField("nome", e.target.value)} 
                        className="h-10 border-slate-200 text-sm font-semibold text-slate-800 focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Código SKU</label>
                        <Input 
                          disabled={!isEditing}
                          value={activeProduct.sku} 
                          onChange={(e) => handleUpdateField("sku", e.target.value)} 
                          className="h-10 border-slate-200 font-mono text-sm text-slate-800 focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Categoria</label>
                        <Input 
                          disabled={!isEditing}
                          value={activeProduct.tipo} 
                          onChange={(e) => handleUpdateField("tipo", e.target.value)} 
                          className="h-10 border-slate-200 text-sm text-slate-800 focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bloco 2: Parâmetros Físicos */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Scale size={14} className="text-slate-400"/> Fatores Físicos Base</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Peso (Kg)</label>
                        <Input disabled={!isEditing} type="number" value={activeProduct.pesoPadrao} onChange={(e) => handleUpdateField("pesoPadrao", Number(e.target.value))} className="h-10 border-slate-200 text-sm font-mono focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Vol. (m³)</label>
                        <Input disabled={!isEditing} type="number" step="0.01" value={activeProduct.volumePadrao} onChange={(e) => handleUpdateField("volumePadrao", Number(e.target.value))} className="h-10 border-slate-200 text-sm font-mono focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tipo de HU</label>
                        <Select disabled={!isEditing} value={activeProduct.tipoHu} onValueChange={(value) => handleUpdateField("tipoHu", value)}>
                          <SelectTrigger className="h-10 w-full min-w-0 border-slate-200 px-2.5 py-1 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600">
                            <SelectValue placeholder="Selecione o formato..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paletizado">Paletizado</SelectItem>
                            <SelectItem value="caixas">Caixas Master</SelectItem>
                            <SelectItem value="granel">Granel</SelectItem>
                            <SelectItem value="isotermico">Isotérmico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Bloco 3: Ambiente Logístico */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Snowflake size={14} className="text-slate-400"/> Ambiente de Transporte</h3>
                    <div className={`rounded-xl transition-all ${activeProduct.temperatura !== "Ambiente" ? "border border-sky-300 bg-sky-50/30 p-4" : "border-transparent bg-transparent p-0"} ${!isEditing && "opacity-80"}`}>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Controle de Temperatura</label>
                        <Select disabled={!isEditing} value={activeProduct.temperatura} onValueChange={(v) => handleUpdateField("temperatura", v)}>
                          <SelectTrigger className="h-10 border-slate-200 text-sm font-semibold focus:ring-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ambiente">Seco / Ambiente</SelectItem>
                            <SelectItem value="Refrigerado">Refrigerado (Positivo)</SelectItem>
                            <SelectItem value="Congelado">Congelado (Negativo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {activeProduct.temperatura !== "Ambiente" && (
                        <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in zoom-in duration-200">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-sky-600">Temp. Mínima (°C)</label>
                            <Input disabled={!isEditing} type="number" value={activeProduct.tempMin || 0} onChange={(e) => handleUpdateField("tempMin", Number(e.target.value))} className="h-10 border-sky-200 bg-sky-50 text-sm font-mono text-sky-800 focus:border-sky-500 disabled:opacity-80" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Temp. Máxima (°C)</label>
                            <Input disabled={!isEditing} type="number" value={activeProduct.tempMax || 0} onChange={(e) => handleUpdateField("tempMax", Number(e.target.value))} className="h-10 border-rose-200 bg-rose-50 text-sm font-mono text-rose-800 focus:border-rose-500 disabled:opacity-80" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bloco 4: Restrições de Risco (Toggles) */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><AlertTriangle size={14} className="text-slate-400"/> Regras de Risco Operacional</h3>
                    <div className="flex flex-col gap-3">
                      
                      <div className={`rounded-xl border p-4 transition-all ${activeProduct.perigosa ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white"} ${!isEditing && "opacity-80"}`}>
                        <div className="flex items-start gap-3">
                          <button disabled={!isEditing} onClick={() => handleUpdateField("perigosa", !activeProduct.perigosa)} className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors disabled:cursor-not-allowed ${activeProduct.perigosa ? "border-amber-600 bg-amber-500" : "border-slate-300"}`}>
                            {activeProduct.perigosa && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </button>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800">Carga Perigosa (Hazmat)</p>
                            
                            {activeProduct.perigosa && (
                              <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Número ONU</label>
                                  <Input disabled={!isEditing} placeholder="Ex: 1203" value={activeProduct.onu} onChange={(e) => handleUpdateField("onu", e.target.value)} className="h-9 border-slate-300 bg-white text-xs font-mono disabled:bg-slate-50 disabled:text-slate-600" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Classe de Risco</label>
                                  <Input disabled={!isEditing} placeholder="Ex: 3" value={activeProduct.classeRisco} onChange={(e) => handleUpdateField("classeRisco", e.target.value)} className="h-9 border-slate-300 bg-white text-xs font-mono disabled:bg-slate-50 disabled:text-slate-600" />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button disabled={!isEditing} onClick={() => handleUpdateField("fragil", !activeProduct.fragil)} className={`flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-80 ${isEditing && "hover:border-slate-300"}`}>
                        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${activeProduct.fragil ? "border-rose-500 bg-rose-500" : "border-slate-300"}`}>
                          {activeProduct.fragil && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Carga Frágil</p>
                        </div>
                      </button>

                      <div className={`rounded-xl border p-4 transition-all ${activeProduct.empilhavel ? "border-blue-300 bg-blue-50/40" : "border-slate-200 bg-white"} ${!isEditing && "opacity-80"}`}>
                        <div className="flex items-start gap-3">
                          <button disabled={!isEditing} onClick={() => handleUpdateField("empilhavel", !activeProduct.empilhavel)} className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors disabled:cursor-not-allowed ${activeProduct.empilhavel ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}>
                            {activeProduct.empilhavel && <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </button>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800">Permite Empilhamento</p>

                            {activeProduct.empilhavel && (
                              <div className="mt-4 max-w-40 space-y-1.5 animate-in fade-in zoom-in duration-200">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Max. Camadas</label>
                                <Input disabled={!isEditing} type="number" value={activeProduct.maxCamadas} onChange={(e) => handleUpdateField("maxCamadas", Number(e.target.value))} className="h-10 border-blue-200 bg-blue-50 text-sm font-mono text-blue-800 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><FileText size={14} className="text-slate-400"/> Observação de Manuseio (Pátio e Motorista)</h3>
                    <Textarea 
                      disabled={!isEditing}
                      placeholder="Descreva instruções adicionais..."
                      value={activeProduct.descricao} 
                      onChange={(e) => handleUpdateField("descricao", e.target.value)} 
                      className="min-h-[80px] border-slate-200 text-sm focus:border-blue-500 disabled:opacity-100 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>

                </div>
              </div>
              
              {/* RODAPÉ DO MODO EDIÇÃO (Aparece apenas quando editando) */}
              {isEditing && (
                <div className="shrink-0 border-t border-slate-100 p-4 flex items-center justify-between bg-blue-50/50 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
                    <Info size={14} /> Modo de Edição Ativo
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="h-8 text-xs font-semibold text-slate-700 bg-white" onClick={() => setIsEditing(false)}>
                      <X size={14} className="mr-1.5" /> Cancelar
                    </Button>
                    <Button className="h-8 bg-blue-600 text-xs font-bold text-white hover:bg-blue-700" onClick={handleSave}>
                      <Save size={14} className="mr-1.5" /> Salvar Mudanças
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </AppShell>
  )
}