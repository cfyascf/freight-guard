import { ArrowLeft, CheckCircle2, Truck, MapPin, Clock, ShieldCheck, Trophy, ArrowDownRight, ExternalLink } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { auctionBidsMock, getSegmentById } from "@/constants/logistics-mock"

export default function AuctionBids() {
  const { segmentId } = useParams()
  
  // Mock fallback
  const selectedSegment = segmentId ? getSegmentById(segmentId) : getSegmentById("TRC-1042")
  const visibleBids = (segmentId ? auctionBidsMock.filter((bid) => bid.segmentRef === segmentId) : auctionBidsMock) || []

  // Lógica de Ranking
  const rankedBids = [...visibleBids].sort((a, b) => a.proposedValue - b.proposedValue)

  // Simulação das balizas financeiras
  const targetFare = selectedSegment?.targetFare || 4200
  const anttFloorFare = targetFare * 0.72

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)

  return (
    <AppShell title="Análise de Lances">
      {/* 1. MUDANÇA: Ajuste no calc() para 8.5rem e remoção de gap geral pesado */}
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        
        {/* HEADER LIMPO E TEXTUAL (Com shrink-0) */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Link to="/freights-panel">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar à Mesa de Leilões
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-9 border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Link to={`/segment-details/${selectedSegment?.id}`}>
                <ExternalLink size={14} className="mr-1.5" /> Detalhes da Rota
              </Link>
            </Button>
          </div>
        </div>

        {/* CONTEXTO DA ROTA E BALIZAS FINANCEIRAS (Com shrink-0 para não amassar) */}
        {selectedSegment && (
          <div className="flex shrink-0 flex-col md:flex-row gap-0 rounded-xl border border-slate-200 bg-white mb-5">
            
            {/* Bloco 1: A Rota */}
            <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] font-bold uppercase tracking-wider">{selectedSegment.id}</Badge>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{selectedSegment.itemCount} Itens</span>
              </div>
              <h2 className="text-sm font-bold text-slate-900 mb-1">{selectedSegment.name}</h2>
              <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <MapPin size={13} className="text-blue-500" /> {selectedSegment.stops.join(" ➔ ")}
              </p>
            </div>

            {/* Bloco 2: O Piso (Legal) */}
            <div className="w-full md:w-56 p-5 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck size={12} /> Piso Legal ANTT
              </p>
              <p className="text-lg font-black text-slate-700 font-mono">{formatCurrency(anttFloorFare)}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">Lances abaixo deste valor são bloqueados.</p>
            </div>

            {/* Bloco 3: O Teto (Orçamento) */}
            <div className="w-full md:w-56 p-5 bg-slate-50/50 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Orçamento Teto</p>
              <p className="text-lg font-black text-slate-700 font-mono">{formatCurrency(targetFare)}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">Meta de custo estipulada pelo embarcador.</p>
            </div>

          </div>
        )}

        {/* 2. MUDANÇA: Double Div (Container Blindado para o Ranking) */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">Ranking de Propostas ({rankedBids.length})</h3>
              
              {rankedBids.length === 0 ? (
                <div className="rounded-xl border border-slate-200 border-dashed py-12 text-center text-slate-500 bg-slate-50/50">
                  Nenhum lance recebido para este trecho ainda.
                </div>
              ) : (
                rankedBids.map((bid, index) => {
                  const isWinner = index === 0
                  const savings = targetFare - bid.proposedValue
                  const savingsPercent = ((savings / targetFare) * 100).toFixed(1)

                  return (
                    <div 
                      key={bid.id} 
                      className={`relative flex items-center justify-between rounded-xl border p-4 transition-all ${
                        isWinner 
                          ? "border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-100" 
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      
                      {/* Destaque Ouro para o Menor Preço */}
                      {isWinner && (
                        <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-700 shadow-sm">
                          <Trophy size={10} /> Melhor Oferta
                        </div>
                      )}

                      <div className="flex items-center gap-5 w-1/2">
                        {/* Posição no Ranking */}
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isWinner ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          #{index + 1}
                        </div>

                        {/* Dados da Transportadora */}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{bid.carrier}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center text-[11px] font-semibold text-slate-500">
                              <Truck size={12} className="mr-1.5 text-slate-400" /> {bid.vehicle}
                            </span>
                            <span className="flex items-center text-[11px] font-semibold text-slate-500">
                              <Clock size={12} className="mr-1.5 text-slate-400" /> ETA: {bid.eta}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 justify-end w-1/2">
                        
                        {/* Lógica Financeira e Economia */}
                        <div className="text-right">
                          <p className={`text-lg font-black font-mono ${isWinner ? "text-emerald-700" : "text-slate-700"}`}>
                            {formatCurrency(bid.proposedValue)}
                          </p>
                          {savings > 0 ? (
                            <p className="flex items-center justify-end text-[10px] font-bold text-emerald-600 mt-0.5">
                              <ArrowDownRight size={12} className="mr-0.5" /> 
                              Economia de {formatCurrency(savings)} ({savingsPercent}%)
                            </p>
                          ) : (
                            <p className="text-[10px] font-bold text-rose-500 mt-0.5">
                              Acima do Teto Orçamentário
                            </p>
                          )}
                        </div>

                        {/* Botão de Decisão Final */}
                        <Button 
                          className={`h-9 px-6 text-xs font-bold tracking-wide transition-colors ${
                            isWinner 
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {isWinner ? <><CheckCircle2 size={14} className="mr-1.5" /> Adjudicar Vencedor</> : "Selecionar Lance"}
                        </Button>
                        
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            
          </div>
        </div>

      </div>
    </AppShell>
  )
}