import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Scale, Box, ShieldCheck } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Importa a base mockada da Tela 1 para cruzar os dados
import { availableRouteSegments } from "./LoadManagement"

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`

// Agrupamento Geográfico Inteligente para despoluir a Timeline
const buildUnifiedTimeline = (segments) => {
  const nodes = []
  const addAction = (city, action) => {
    const existing = nodes.find((n) => n.city === city)
    if (existing) {
      existing.actions.push(action)
    } else {
      nodes.push({ city, actions: [action] })
    }
  }

  segments.forEach((s) => {
    addAction(s.origin, `📥 Coleta: ${s.productName} (${s.id})`)
    addAction(s.destination, `📤 Descarga: ${s.productName} (${s.id})`)
  })

  return nodes.map((node, idx) => ({
    ...node,
    type: idx === 0 ? "Origem" : idx === nodes.length - 1 ? "Destino Final" : "Parada Intermediária",
  }))
}

export default function CreateRouteWorkspace() {
  const location = useLocation()
  const navigate = useNavigate()
  const [auctionDeadline, setAuctionDeadline] = useState("")

  // Captura os IDs enviados pela Tela 1
  const selectedIds = location.state?.selectedIds || []
  const selectedSegments = availableRouteSegments.filter((s) => selectedIds.includes(s.id))
  
  const unifiedTimeline = buildUnifiedTimeline(selectedSegments)
  const totalDistance = selectedSegments.reduce((sum, s) => sum + s.distanceKm, 0)
  const maxWeight = selectedSegments.reduce((max, s) => Math.max(max, s.weightKg), 0)
  const maxVolume = selectedSegments.reduce((max, s) => Math.max(max, s.volumeM3), 0)

  const requirements = selectedSegments.flatMap((s) => s.requirements)
  const restrictiveRequirement = requirements.includes("Refrigerado") 
    ? "❄️ Requer Baú Frigorífico" 
    : requirements.includes("Frágil") ? "📦 Carga Sensível / Frágil" : "🚚 Carga Seca Padrão"

  // Se o usuário acessar a URL direto sem selecionar nada, avisa e pede pra voltar
  if (selectedIds.length === 0) {
    return (
      <AppShell title="Workspace de Rota">
        <div className="mx-auto max-w-xl text-center py-20 bg-white border rounded-2xl border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-500">Nenhum trecho foi selecionado para montagem.</p>
          <Button asChild className="mt-4 bg-slate-900 text-white text-xs h-9">
            <Link to="/load-management">Voltar para listagem</Link>
          </Button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Workspace de Rota">
      <div className="mx-auto max-w-7xl flex flex-col h-[calc(100vh-7.5rem)] overflow-hidden">
        
        {/* GRANDE CARD BRANCO INTEGRADO (TELA CHEIA SEM MODAL) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col min-h-0 overflow-hidden">
          
          {/* HEADER DO WORKSPACE COM BOTÃO VOLTAR */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100"
                onClick={() => navigate("/load-management")}
              >
                <ArrowLeft size={16} className="text-slate-600" />
              </Button>
              <div>
                <h1 className="text-base font-bold text-slate-900">Workspace de Consolidação de Rota</h1>
                <p className="text-xs text-slate-500 mt-0.5">Otimização geométrica de paradas agrupadas por proximidade física.</p>
              </div>
            </div>
            
            <Badge className="bg-slate-100 text-slate-700 font-bold border-none text-[10px] tracking-wide uppercase px-2 py-0.5">
              {selectedIds.length} Trechos Prontos
            </Badge>
          </div>

          {/* GRID CENTRAL: DUAS COLUNAS AMPLAS */}
          <div className="flex-1 grid grid-cols-[1.3fr_1fr] gap-16 min-h-0 overflow-hidden">
            
            {/* COLUNA ESQUERDA: Timeline por Cidade Limpa e Fluida */}
            <div className="flex flex-col min-h-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 block">Sequência Lógica de Paradas</span>
              <div className="flex-1 border-l-2 border-dashed border-slate-200 pl-8 space-y-6 ml-2 overflow-y-auto pr-4 pb-4">
                {unifiedTimeline.map((node, index) => (
                  <div key={`${node.city}-${index}`} className="relative">
                    {/* Indicador numérico sequencial */}
                    <span className="absolute -left-[39px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-sky-600 font-mono text-[9px] font-black text-sky-600 shadow-sm">
                      {index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-sky-600 block">{node.type}</span>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{node.city}</p>
                      
                      {/* Bloco de tarefas agrupadas por localidade */}
                      <div className="mt-2 space-y-1 bg-slate-50/70 p-3 rounded-lg border border-slate-100/60">
                        {node.actions.map((action, aIdx) => (
                          <p key={aIdx} className="text-xs font-semibold text-slate-600 leading-relaxed">{action}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUNA DIREITA: Dados da Mochila (Knapsack) e Regras de Leilão */}
            <div className="space-y-6 border-l border-slate-100 pl-12 flex flex-col justify-between pb-2">
              <div className="space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Restrições e Alvos Macros</span>
                
                {/* Métricas consolidadas pelo motor de otimização */}
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-4 text-xs font-semibold">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2">🗺️ Distância Total Estimada</span>
                    <strong className="text-slate-800 font-mono text-sm">{totalDistance} km</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2"><Scale size={14} /> Capacidade de Peso</span>
                    <strong className="text-slate-800 font-mono text-sm">{formatWeight(maxWeight)}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2"><Box size={14} /> Capacidade de Volume</span>
                    <strong className="text-slate-800 font-mono text-sm">{formatVolume(maxVolume)}</strong>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                    <span className="text-slate-500 flex items-center gap-2"><ShieldCheck size={14} /> Exigência Restritiva</span>
                    <Badge className="bg-sky-50 text-sky-700 font-bold border-none text-[10px]">{restrictiveRequirement}</Badge>
                  </div>
                </div>

                {/* Data limite para o encerramento do leilão */}
                <div className="space-y-2">
                  <label htmlFor="workspace-deadline" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Encerramento do Leilão Spot
                  </label>
                  <Input
                    id="workspace-deadline"
                    type="datetime-local"
                    value={auctionDeadline}
                    onChange={(e) => setAuctionDeadline(e.target.value)}
                    className="border-slate-200 bg-white h-10 text-sm focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Botão de Disparo Final */}
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-xs font-bold rounded-xl mt-6 tracking-wide">
                Disparar Leilão Reverso da Rota
              </Button>
            </div>

          </div>

        </div>
      </div>
    </AppShell>
  )
}