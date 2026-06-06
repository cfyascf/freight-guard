import { ArrowLeft, MapPinned, DollarSign, Truck, Scale, Box, Gavel, Layers, Activity, CalendarClock, PackageOpen, Snowflake, AlertTriangle, Calculator } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// ==========================================
// MOCKS DA ROTA CONSOLIDADA 
// ==========================================
const mockRoute = {
  id: "ROT-9921",
  name: "Rota Sul-Sudeste Consolidada",
  status: "Em Leilão",
  risk: "WARNING",
  totalWeightKg: 25800,
  totalVolumeM3: 95,
  totalDistanceKm: 854,
  targetFare: 12500,
  bodyType: "Frigorífico (Trailers/Carretas)",
  
  // NOVOS DADOS: Especificações do Produto
  productDetails: {
    packaging: "28 Paletes PBR (Madeira)",
    type: "Caixas Master (Frango/Polpa)",
    temperature: "-18ºC (Congelado)",
    handling: "Carga Paletizada - Não Empilhar"
  },
  
  // Datas extraídas para destaque (SLA)
  sla: {
    firstPickup: "Hoje, 14:00h",
    lastDelivery: "Amanhã, 12:00h"
  },

  itinerary: [
    { city: "Curitiba, PR", action: "Coleta (2 Trechos)", time: "Hoje, 14:00h" },
    { city: "Joinville, PR", action: "Coleta (1 Trecho)", time: "Hoje, 17:00h" },
    { city: "São Paulo, SP", action: "Entrega Parcial", time: "Amanhã, 08:00h" },
    { city: "Campinas, SP", action: "Entrega Final", time: "Amanhã, 12:00h" },
  ],
  segments: [
    { id: "TRC-1042", load: "Frango Congelado", from: "Curitiba", to: "São Paulo", value: 4200 },
    { id: "TRC-1088", load: "Polpa de Fruta", from: "Curitiba", to: "Campinas", value: 5100 },
    { id: "TRC-1090", load: "Sorvetes", from: "Joinville", to: "São Paulo", value: 3200 },
  ],
  auctionInfo: {
    bids: 18,
    bestBid: 11200,
    leader: "Expresso Frio Ltda",
  }
}

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)

function getStopBadgeClass(index, totalStops) {
  if (index === 0) return "bg-slate-800"
  if (index === totalStops - 1) return "bg-emerald-500"
  return "bg-blue-500"
}

export default function SegmentDetails() {
  const navigate = useNavigate()
  const route = mockRoute 
  const anttFloor = route.targetFare * 0.75 

  const [bidValue, setBidValue] = useState(route.targetFare)

  // Funções de ação rápida para o input de lance
  const applyLeaderBid = () => setBidValue(route.auctionInfo.bestBid - 50)
  const applyFloorBid = () => setBidValue(anttFloor)

  return (
    <AppShell title={`Detalhes da Rota`}>
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        
        {/* HEADER LIMPO */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-2" /> Voltar para a mesa de leilões
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6 space-y-6">

            {/* CABEÇALHO E SLA CRÍTICO */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={16} className="text-blue-500" />
                  <span className="font-mono text-sm font-bold text-slate-500">{route.id}</span>
                  <Badge className="bg-slate-800 text-white text-[10px] uppercase font-bold border-none hover:bg-slate-800">{route.status}</Badge>
                </div>
                <h1 className="text-2xl font-black text-slate-900">{route.name}</h1>
              </div>

              {/* BANNER DE SLA (Data/Hora em Evidência) */}
              <div className="flex flex-col md:flex-row border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex-1 bg-amber-50 p-4 border-b md:border-b-0 md:border-r border-slate-200 flex items-center gap-4">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                          <CalendarClock size={20} />
                      </div>
                      <div>
                          <p className="text-[10px] font-bold uppercase text-amber-700/70 tracking-wider">Primeira Coleta SLA</p>
                          <p className="font-black text-amber-900">{route.sla.firstPickup}</p>
                      </div>
                  </div>
                  <div className="flex-1 bg-emerald-50 p-4 flex items-center gap-4">
                      <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                          <MapPinned size={20} />
                      </div>
                      <div>
                          <p className="text-[10px] font-bold uppercase text-emerald-700/70 tracking-wider">Última Entrega SLA</p>
                          <p className="font-black text-emerald-900">{route.sla.lastDelivery}</p>
                      </div>
                  </div>
              </div>
            </div>

            {/* PAINEL DE AÇÃO (LANCE) E ESTRATÉGIA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. LANCE (Design Robusto para Analista) */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                            <Gavel size={16} className="text-blue-600" /> Formulário de Lance
                        </h3>
                        <Badge variant="outline" className="border-blue-200 bg-white text-blue-700 text-[10px]">Teto: {formatCurrency(route.targetFare)}</Badge>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Input Estruturado */}
                        <div className="bg-white border border-slate-300 rounded-lg p-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                            <div className="flex items-center px-3">
                                <span className="text-sm font-bold text-slate-400">R$</span>
                                <Input 
                                    type="number" 
                                    value={bidValue}
                                    onChange={(e) => setBidValue(e.target.value)}
                                    className="border-0 shadow-none focus-visible:ring-0 text-2xl font-black font-mono text-slate-800 h-14" 
                                />
                            </div>
                        </div>

                        {/* Botões de Ação Rápida */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" onClick={applyLeaderBid} className="text-xs font-bold border-slate-200 bg-white text-slate-600">
                                Cobrir Líder
                            </Button>
                            <Button variant="outline" size="sm" onClick={applyFloorBid} className="text-xs font-bold border-slate-200 bg-white text-slate-600">
                                Piso ANTT
                            </Button>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-sm">
                            Confirmar Lance Oficial
                        </Button>
                    </div>
                </div>

                {/* 2. ESTRATÉGIA E RANKING */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                        <Activity size={16} className="text-slate-500" /> Mercado & Concorrência
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Seu Rank Atual</p>
                             <p className="text-2xl font-black text-slate-800">#4</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                             <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Lances Ativos</p>
                             <p className="text-2xl font-black text-blue-600">{route.auctionInfo.bids}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Melhor Oferta (Líder)</p>
                            <p className="text-sm font-black font-mono text-emerald-600">{formatCurrency(route.auctionInfo.bestBid)}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-bold text-slate-400 uppercase">Distância P/ Lider</p>
                             <p className="text-sm font-bold font-mono text-rose-500">- R$ 300</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAINEL TÉCNICO: PRODUTO E EQUIPAMENTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Informações Críticas do Produto */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Especificações da Carga</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Embalagem Base</p>
                        <p className="mt-1 text-sm font-bold text-slate-800">{route.productDetails.packaging}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tipo de Produto</p>
                        <p className="mt-1 text-sm font-bold text-slate-800">{route.productDetails.type}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><Snowflake size={12}/> Temperatura</p>
                        <p className="mt-1 text-sm font-bold text-blue-600">{route.productDetails.temperature}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><AlertTriangle size={12}/> Manuseio</p>
                        <p className="mt-1 text-sm font-bold text-rose-600">{route.productDetails.handling}</p>
                    </div>
                </div>
              </div>

              {/* Capacidade e Veículo */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 flex flex-col">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Truck size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Exigência de Equipamento</h2>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Frota Recomendada</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">{route.bodyType}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-auto">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Peso Consolidado</p>
                      <p className="mt-1 font-mono text-sm font-black text-slate-800 flex items-center gap-1.5"><Scale size={14} className="text-slate-400"/> {formatWeight(route.totalWeightKg)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cubagem (Volume)</p>
                      <p className="mt-1 font-mono text-sm font-black text-slate-800 flex items-center gap-1.5"><Box size={14} className="text-slate-400"/> {formatVolume(route.totalVolumeM3)}</p>
                    </div>
                </div>
              </div>
            </div>

            {/* ITINERÁRIO (MANTIDO) */}
            <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                    <MapPinned size={16} className="text-slate-600" />
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Plano de Viagem (Milking Run)</h2>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {route.itinerary.map((stop, index) => (
                        <div key={index} className="flex md:flex-col gap-3 md:gap-0 items-center text-center">
                             <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white ${getStopBadgeClass(index, route.itinerary.length)}`}>
                                {index + 1}
                             </div>
                             <div className="md:mt-3 text-left md:text-center">
                                <p className="text-xs font-bold text-slate-900">{stop.city}</p>
                                <p className="text-[10px] font-medium text-slate-500 mt-0.5">{stop.action}</p>
                                <p className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded mt-1.5 inline-block">{stop.time}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TRECHOS COMPOSIÇÃO */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-slate-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Trechos Contidos nesta Rota ({route.segments.length})</h2>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {route.segments.map((seg) => (
                  <div key={seg.id} className="flex items-center justify-between px-5 py-3 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-slate-400">{seg.id}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{seg.load}</p>
                        <p className="text-[10px] font-medium text-slate-500">{seg.from} ➔ {seg.to}</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold font-mono text-slate-600">Teto: {formatCurrency(seg.value)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  )
}