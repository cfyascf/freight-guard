import { useState } from "react"
import { Plus, Search, Layers, ArrowRight, MapPin, DollarSign } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RISK } from "@/constants/risk"

// Base de dados higienizada com dados de alto valor comercial
export const availableRouteSegments = [
  {
    id: "TRC-1042",
    productName: "Peito de Frango Congelado",
    bodyType: "Frigorífico", 
    loadType: "Paletizado",
    origin: "Curitiba, PR",
    destination: "São Paulo, SP",
    risk: RISK.CRITIC,
    pickupWindow: "Hoje até às 18:00h",
    weightKg: 12000,
    volumeM3: 45,
    distanceKm: 408,
    targetPrice: 4200,
  },
  {
    id: "TRC-1043",
    productName: "Laticínios Pasteuzados",
    bodyType: "Refrigerado",
    loadType: "Paletizado",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    risk: RISK.WARNING,
    pickupWindow: "Amanhã até às 12:00h",
    weightKg: 9000,
    volumeM3: 28,
    distanceKm: 96,
    targetPrice: 1100,
  },
  {
    id: "TRC-1044",
    productName: "Eletrônicos de Alto Valor",
    bodyType: "Baú Sider",
    loadType: "Caixas Master",
    origin: "Campinas, SP",
    destination: "Ribeirão Preto, SP",
    risk: RISK.WARNING,
    pickupWindow: "07/06 às 08:00h",
    weightKg: 4800,
    volumeM3: 22,
    distanceKm: 223,
    targetPrice: 2800,
  },
  {
    id: "TRC-1045",
    productName: "Vacinas Influenza",
    bodyType: "Frigorífico",
    loadType: "Isotérmico",
    origin: "Ribeirão Preto, SP",
    destination: "Uberlândia, MG",
    risk: RISK.CRITIC,
    pickupWindow: "Hoje urgente até às 16:30h",
    weightKg: 3200,
    volumeM3: 18,
    distanceKm: 166,
    targetPrice: 3100,
  },
]

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)

// Substituímos a Color Band por um Dot Status elegante
const getRiskDotStyle = (risk) => {
  if (risk === RISK.CRITIC) return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
  if (risk === RISK.WARNING) return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
  return "bg-slate-300"
}

const getRiskTextStyle = (risk) => {
  if (risk === RISK.CRITIC) return "text-rose-600 font-bold"
  if (risk === RISK.WARNING) return "text-amber-600 font-bold"
  return "text-slate-400"
}

export default function LoadManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedSegmentIds, setSelectedSegmentIds] = useState([])

  const visibleSegments = availableRouteSegments.filter((segment) => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return true
    return [segment.id, segment.productName, segment.bodyType, segment.origin, segment.destination]
      .join(" ")
      .toLowerCase()
      .includes(term)
  })

  const handleToggleSegment = (segmentId) => {
    setSelectedSegmentIds((prev) => 
      prev.includes(segmentId) ? prev.filter((id) => id !== segmentId) : [...prev, segmentId]
    )
  }

  const handleCancelSelection = () => {
    setIsSelectionMode(false)
    setSelectedSegmentIds([])
  }

  const handleProceedToWorkspace = () => {
    navigate("/create-route-workspace", { state: { selectedIds: selectedSegmentIds } })
  }

  return (
    <AppShell title="Gestão de Trechos">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* BARRA DE TOPO INTEGRADA MINIMALISTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Trechos Disponíveis</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por trecho, produto ou cidade..."
                className="h-9 border-slate-200 bg-white pl-9 text-xs"
              />
            </div>

            <Button 
              variant={isSelectionMode ? "secondary" : "outline"} 
              className={isSelectionMode ? "h-9 border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 hover:bg-blue-100" : "h-9 border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}
              onClick={() => isSelectionMode ? handleCancelSelection() : setIsSelectionMode(true)}
            >
              <Layers size={14} className="mr-1.5" />
              {isSelectionMode ? "Cancelar" : "Criar Rota"}
            </Button>

            <Button asChild className="h-9 bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 focus-visible:ring-blue-200 active:bg-blue-800">
              <Link to="/create-load">
                <Plus size={14} className="mr-1.5" /> Novo Trecho
              </Link>
            </Button>
          </div>
        </div>

        {/* BANNER CONTEXTUAL DE TOPO */}
        {isSelectionMode && selectedSegmentIds.length > 0 && (
          <div className="animate-in fade-in flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-3 px-4 text-sm duration-200">
            <div className="flex items-center gap-2.5 text-blue-900">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-[10px] font-black tracking-wider text-white">
                {selectedSegmentIds.length}
              </span>
              <span className="text-xs font-medium text-slate-700">
                {selectedSegmentIds.length === 1 
                  ? "Trecho selecionado e pronto para roteirização." 
                  : "Trechos selecionados e prontos para roteirização conjunta."}
              </span>
            </div>
            
            <button
              onClick={handleProceedToWorkspace}
              className="flex items-center gap-1.5 pl-4 text-xs font-bold uppercase tracking-wider text-blue-700 transition-colors hover:text-blue-800 focus:outline-none"
            >
              Avançar para Rota <ArrowRight size={14} className="animate-pulse" />
            </button>
          </div>
        )}

        {/* LISTAGEM DE ALTA DENSIDADE REESTRUTURADA */}
        <div className="space-y-2">
          {visibleSegments.map((segment) => {
            const isChecked = selectedSegmentIds.includes(segment.id)
            const riskTextStyle = getRiskTextStyle(segment.risk)
            const riskDotStyle = getRiskDotStyle(segment.risk)

            return (
              <button
                key={segment.id}
                type="button"
                onClick={() => isSelectionMode && handleToggleSegment(segment.id)}
                // BORDA 100% RETA E UNIFORME, SEM COLOR BANDS E SEM SOMBRAS
                className={`flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition-all ${isSelectionMode ? "cursor-pointer hover:border-slate-300 hover:bg-slate-50/50" : "cursor-default"} ${isChecked ? "border-blue-300 bg-blue-50/40 ring-1 ring-blue-200" : ""}`}
              >
                {isSelectionMode && (
                  <div className="flex items-center justify-center pl-1">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleSegment(segment.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Grid de alta densidade sem redundâncias */}
                <div className="grid min-w-0 flex-1 grid-cols-[110px_1.1fr_1.3fr_220px] items-center gap-6">
                  
                  {/* COLUNA 1: Status Dot + ID + Tipo de Frota Necessária */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`h-2 w-2 rounded-full ${riskDotStyle}`} title={`Risco: ${segment.risk}`} />
                      <span className="font-mono text-xs font-bold text-slate-500">{segment.id}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-bold uppercase tracking-wide border-none px-1.5 py-0">
                      {segment.bodyType}
                    </Badge>
                  </div>

                  {/* COLUNA 2: Mercadoria + Tipo de Acomodação */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{segment.productName}</p>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{segment.loadType}</span>
                  </div>

                  {/* COLUNA 3: Rota Física + Janela de Tempo Real */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      {segment.origin.split(",")[0]} <span className="text-slate-300 text-xs">➔</span> {segment.destination.split(",")[0]}
                      <span className="text-xs font-mono font-medium text-slate-400 bg-slate-50 px-1 rounded border border-slate-100">{segment.distanceKm} km</span>
                    </p>
                    <span className={`text-[11px] block mt-0.5 ${riskTextStyle}`}>
                      ⏱️ {segment.pickupWindow}
                    </span>
                  </div>

                  {/* COLUNA 4: Métricas Físicas + Custo Alvo do Frete */}
                  <div className="flex items-center justify-end gap-3 text-xs font-bold">
                    <div className="flex gap-1 text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span>{formatWeight(segment.weightKg)}</span>
                      <span className="text-slate-300">•</span>
                      <span>{formatVolume(segment.volumeM3)}</span>
                    </div>
                    
                    {/* Exibe o Custo Alvo / Balizador Financeiro */}
                    <div className="text-right min-w-[85px]">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Alvo</span>
                      <span className="text-sm font-black text-slate-700 font-mono">{formatCurrency(segment.targetPrice)}</span>
                    </div>
                  </div>

                </div>
              </button>
            )
          })}
        </div>

      </div>
    </AppShell>
  )
}