import { useState } from "react"
import { Plus, Search, Layers, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RISK } from "@/constants/risk"

// Base de dados mockada compartilhada do FreightGuard
export const availableRouteSegments = [
  {
    id: "TRC-1042",
    productName: "Peito de Frango Congelado",
    category: "Refrigerado",
    origin: "Curitiba, PR",
    destination: "São Paulo, SP",
    risk: RISK.CRITIC,
    riskLabel: "Crítico: Janela Limite Hoje",
    weightKg: 12000,
    volumeM3: 45,
    distanceKm: 408,
    requirements: ["Refrigerado"],
  },
  {
    id: "TRC-1043",
    productName: "Laticínios Pasteurizados",
    category: "Refrigerado",
    origin: "São Paulo, SP",
    destination: "Campinas, SP",
    risk: RISK.WARNING,
    riskLabel: "Atenção: Coleta nas próximas 6h",
    weightKg: 9000,
    volumeM3: 28,
    distanceKm: 96,
    requirements: ["Refrigerado"],
  },
  {
    id: "TRC-1044",
    productName: "Eletrônicos de Alto Valor",
    category: "Frágil",
    origin: "Campinas, SP",
    destination: "Ribeirão Preto, SP",
    risk: RISK.WARNING,
    riskLabel: "Atenção: Janela Curta",
    weightKg: 4800,
    volumeM3: 22,
    distanceKm: 223,
    requirements: ["Frágil"],
  },
  {
    id: "TRC-1045",
    productName: "Vacinas Influenza",
    category: "Saúde",
    origin: "Ribeirão Preto, SP",
    destination: "Uberlândia, MG",
    risk: RISK.CRITIC,
    riskLabel: "Crítico: Cadeia Fria Restrita",
    weightKg: 3200,
    volumeM3: 18,
    distanceKm: 166,
    requirements: ["Refrigerado", "Frágil"],
  },
]

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`

const getRiskCardStyle = (risk) => {
  if (risk === RISK.CRITIC) {
    return "border-l-4 border-l-rose-500 bg-rose-50/5"
  }

  if (risk === RISK.WARNING) {
    return "border-l-4 border-l-amber-500 bg-amber-50/5"
  }

  return "border-l-4 border-l-slate-200"
}

const getRiskTextStyle = (risk) => {
  if (risk === RISK.CRITIC) {
    return "text-rose-600 font-bold"
  }

  if (risk === RISK.WARNING) {
    return "text-amber-600 font-bold"
  }

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
    return [segment.id, segment.productName, segment.category, segment.origin, segment.destination]
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

  // Navega enviando os IDs marcados via state para CreateRouteWorkspace.jsx
  const handleProceedToWorkspace = () => {
    navigate("/create-route-workspace", { state: { selectedIds: selectedSegmentIds } })
  }

  return (
    <AppShell title="Gestão de Trechos">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* BARRA DE TOPO INTEGRADA MINIMALISTA (SEM CARD DE TEXTO DESCRITIVO) */}
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

        {/* NOVA MODIFICAÇÃO UX: Banner contextual de texto direto na tela acima da lista */}
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
            
            {/* Botão textual direto com a flecha de avanço */}
            <button
              onClick={handleProceedToWorkspace}
              className="flex items-center gap-1.5 pl-4 text-xs font-bold uppercase tracking-wider text-blue-700 transition-colors hover:text-blue-800 focus:outline-none"
            >
              Avançar para Rota <ArrowRight size={14} className="animate-pulse" />
            </button>
          </div>
        )}

        {/* LISTAGEM DE ALTA DENSIDADE */}
        <div className="space-y-2">
          {visibleSegments.map((segment) => {
            const isChecked = selectedSegmentIds.includes(segment.id)
            const riskCardStyle = getRiskCardStyle(segment.risk)
            const riskTextStyle = getRiskTextStyle(segment.risk)

            return (
              <button
                key={segment.id}
                type="button"
                onClick={() => isSelectionMode && handleToggleSegment(segment.id)}
                className={`flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-all ${isSelectionMode ? "cursor-pointer hover:border-slate-300" : "cursor-default"} ${riskCardStyle} ${isChecked ? "border-blue-300 bg-blue-50/40 ring-1 ring-blue-200" : ""}`}
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

                {/* Grid adaptável dependendo do modo de seleção ativo */}
                <div className="grid min-w-0 flex-1 grid-cols-[100px_1fr_1.2fr_180px] items-center gap-6">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-400 block">{segment.id}</span>
                    <Badge variant="outline" className="text-[10px] mt-0.5 border-slate-200 bg-slate-50 text-slate-500 font-medium">
                      {segment.category}
                    </Badge>
                  </div>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{segment.productName}</p></div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-700 flex items-center gap-2">
                      {segment.origin.split(",")[0]} <span className="text-slate-300 text-xs">➔</span> {segment.destination.split(",")[0]}
                    </p>
                    <span className={`text-[11px] block mt-0.5 ${riskTextStyle}`}>{segment.riskLabel}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/40">{formatWeight(segment.weightKg)}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/40">{formatVolume(segment.volumeM3)}</span>
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