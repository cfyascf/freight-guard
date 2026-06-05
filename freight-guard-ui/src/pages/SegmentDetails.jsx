import { ArrowLeft, PackageOpen, MapPinned, CalendarClock, DollarSign, Truck, Scale, Box, TrendingDown, Gavel, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock Local para garantir que a tela funcione perfeitamente com o layout novo
const mockSegment = {
  id: "TRC-1042",
  productName: "Peito de Frango Congelado",
  bodyType: "Frigorífico", 
  loadType: "Paletizado",
  origin: "Curitiba, PR",
  destination: "São Paulo, SP",
  risk: "CRITIC",
  pickupWindow: "Hoje até às 18:00h",
  weightKg: 12000,
  volumeM3: 45,
  distanceKm: 408,
  targetPrice: 4200,
  auctionStatus: "Em Andamento",
  totalBids: 14,
  bestBid: 3850,
  winningCarrier: "TransGelada Logística",
}

const mockBids = [
  { id: "BID-892", carrier: "TransGelada Logística", value: 3850, time: "Há 5 min" },
  { id: "BID-891", carrier: "Expresso Frio Ltda", value: 3900, time: "Há 12 min" },
  { id: "BID-885", carrier: "Rodovias do Sul", value: 4100, time: "Há 45 min" },
]

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)

const getRiskDotStyle = (risk) => {
  if (risk === "CRITIC") return "bg-rose-500"
  if (risk === "WARNING") return "bg-amber-500"
  return "bg-slate-300"
}

export default function SegmentDetails() {
  const { segmentId } = useParams()
  // Na vida real, você buscaria o trecho pelo ID. Aqui usamos o mock de demonstração.
  const segment = mockSegment 

  const anttFloor = segment.targetPrice * 0.72 // Simulando Piso da ANTT (72% do Teto)
  const savings = segment.bestBid ? segment.targetPrice - segment.bestBid : 0

  return (
    <AppShell title={`Detalhes do Trecho ${segment.id}`}>
      <div className="mx-auto flex h-[calc(100vh-7.5rem)] max-w-5xl flex-col gap-5 overflow-hidden">
        
        {/* HEADER LIMPO E TEXTUAL */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1">
          <Link to="/load-management">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Trechos
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Link to={`/auction-bids/${segment.id}`}>
                <Gavel size={14} className="mr-1.5" /> Analisar Lances do Leilão
              </Link>
            </Button>
          </div>
        </div>

        {/* ALERTA DE CONTEXTO (Sem sombras, flat) */}
        {segment.risk === "CRITIC" && (
          <div className="shrink-0 rounded-xl border border-rose-200 bg-rose-50/50 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert size={18} className="mt-0.5 text-rose-600" />
              <div>
                <p className="text-sm font-bold text-rose-900">Trecho com Criticidade Máxima</p>
                <p className="mt-0.5 text-xs font-medium text-rose-700">
                  A composição tem alta sensibilidade operacional (Cadeia Fria). O SLA de coleta vence hoje às 18:00h.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CORPO DA TELA (Scrollable) */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-6">
          <div className="flex flex-col gap-6">

            {/* HEADER DO TRECHO (Dados macro) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${getRiskDotStyle(segment.risk)}`} />
                  <span className="font-mono text-sm font-bold text-slate-500">{segment.id}</span>
                  <Badge variant="secondary" className="border-none bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0">
                    {segment.auctionStatus}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{segment.productName}</h1>
              </div>
            </div>

            {/* GRID DOS 4 PILARES DA INFORMAÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* BLOCO 1: O Físico da Carga */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Raio-X da Carga</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Peso Físico</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-slate-800 flex items-center gap-1.5"><Scale size={14} className="text-slate-400"/> {formatWeight(segment.weightKg)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cubagem</p>
                      <p className="mt-1 font-mono text-sm font-semibold text-slate-800 flex items-center gap-1.5"><Box size={14} className="text-slate-400"/> {formatVolume(segment.volumeM3)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Acomodação</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{segment.loadType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Frota Exigida</p>
                      <Badge variant="outline" className="mt-1 text-[10px] font-bold uppercase tracking-wider border-slate-200 bg-slate-50 text-slate-700">{segment.bodyType}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCO 2: O Itinerário e SLA */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5">
                  <MapPinned size={16} className="text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Jornada e SLA</h2>
                </div>
                <div className="p-5 flex flex-col justify-between h-full">
                  <div className="relative space-y-4">
                    <div className="absolute bottom-5 left-1.5 top-3 w-px border-l-2 border-dashed border-slate-200" />
                    
                    <div className="relative pl-6">
                      <span className="absolute left-[-2px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-800" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Origem (Coleta)</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{segment.origin}</p>
                    </div>

                    <div className="relative pl-6">
                      <span className="absolute left-[-2px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Destino (Entrega Final)</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{segment.destination}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                      <CalendarClock size={14} /> Deadline: {segment.pickupWindow}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{segment.distanceKm} km</span>
                  </div>
                </div>
              </div>

              {/* BLOCO 3: O Cofre (Financeiro) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5">
                  <DollarSign size={16} className="text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cenário Financeiro</h2>
                </div>
                <div className="p-5 flex flex-col justify-center h-full space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Orçamento Teto</p>
                      <p className="text-xs text-slate-500">Limite pago pelo embarcador</p>
                    </div>
                    <p className="text-lg font-black font-mono text-slate-800">{formatCurrency(segment.targetPrice)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Piso ANTT (Base)</p>
                      <p className="text-xs text-slate-500">Valor mínimo bloqueado sistemicamente</p>
                    </div>
                    <p className="text-base font-bold font-mono text-slate-400">{formatCurrency(anttFloor)}</p>
                  </div>
                </div>
              </div>

              {/* BLOCO 4: Termômetro do Mercado (Leilão) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5">
                  <TrendingDown size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Desempenho do Leilão</h2>
                </div>
                <div className="p-5 flex flex-col justify-center h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tração Comercial</p>
                      <p className="text-xs text-slate-500">Volume de ofertas recebidas</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none font-black text-sm px-3">{segment.totalBids} lances</Badge>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Melhor Lance Recebido</p>
                      <p className="text-xs font-bold text-slate-700 mt-0.5">{segment.winningCarrier}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black font-mono text-emerald-600">{formatCurrency(segment.bestBid)}</p>
                      <p className="text-[10px] font-bold text-emerald-600 mt-0.5 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                        Saving de {formatCurrency(savings)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* SEÇÃO EXTRA: Lances Recentes Flat */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Lances Recentes</h2>
                <Link to={`/auction-bids/${segment.id}`} className="text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver todos <ArrowRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {mockBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Truck size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{bid.carrier}</p>
                        <p className="text-[10px] font-medium text-slate-400">{bid.id} • Recebido {bid.time}</p>
                      </div>
                    </div>
                    <p className="text-sm font-black font-mono text-slate-700">{formatCurrency(bid.value)}</p>
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