<<<<<<< HEAD
import { ArrowDownRight, ExternalLink, Scale, Trophy, Truck, Clock } from "lucide-react"
=======
import {
  ArrowDownRight,
  ExternalLink,
  Scale,
  Trophy,
  Truck,
  Clock,
} from "lucide-react"
>>>>>>> main
import { useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ==========================================
// MOCKS ADAPTADOS PARA TRANSPORTADORA
// ==========================================
const kpis = [
<<<<<<< HEAD
  { title: "Veículos Livres", value: "4", style: "text-amber-600"},
  { title: "Lances Ativos", value: "12", style: "text-blue-600" },
  { title: "Em Trânsito", value: "38", style: "text-emerald-600"},
=======
  { title: "Veículos Livres", value: "4", style: "text-amber-600" },
  { title: "Lances Ativos", value: "12", style: "text-blue-600" },
  { title: "Em Trânsito", value: "38", style: "text-emerald-600" },
>>>>>>> main
]

const carrierPerformance = {
  fleetActive: 88, // % de frota rodando
  capacityUtilization: 92, // % de ocupação de peso/cubagem nos caminhoes ativos
  winRate: 34, // % de vitorias nos ultimos leiloes
}

const activeBidsTracker = [
<<<<<<< HEAD
  { id: "ROT-9921", auctionId: "TRC-201", label: "Curitiba → São Paulo", myBid: 4200, bestBid: 4200, status: "VENCENDO" },
  { id: "ROT-9922", auctionId: "TRC-202", label: "Joinville → Campinas", myBid: 3680, bestBid: 3600, status: "PERDENDO" },
  { id: "ROT-9923", auctionId: "TRC-203", label: "Londrina → Contagem", myBid: 3500, bestBid: 3200, status: "PERDENDO" },
  { id: "ROT-9924", auctionId: "TRC-204", label: "Maringá → Serra", myBid: 4050, bestBid: 4050, status: "VENCENDO" },
]

const operationAlerts = [
  { id: "TRC-1042", truck: "ABC-1234", action: "ATRASO NA COLETA", time: "- 15 min", critical: true },
  { id: "TRC-1045", truck: "XYZ-9876", action: "PROX. COLETA", time: "1h 10m", critical: false },
  { id: "TRC-1043", truck: "QWE-5544", action: "DESCARGA SLA", time: "2h 20m", critical: false },
  { id: "TRC-1051", truck: "ASD-9988", action: "FIM DE JORNADA", time: "3h 00m", critical: false },
]

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)
}

export default function CarrierDashboard() {
  const navigate = useNavigate()

  return (
    <AppShell title="Visão Geral" contentClassName="overflow-hidden" innerClassName="h-full min-h-0">
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        
        {/* O GRANDE CARD BRANCO UNIFICADOR */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col min-h-0 overflow-hidden">
          
          {/* SEÇÃO 1: LINHA DE CONTADORES (KPIs MACROS) */}
          <section className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
            <div className="flex gap-16">
              {kpis.map((kpi) => (
                <div key={kpi.title}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{kpi.title}</p>
                  <div className="flex items-baseline gap-2 mt-0.5">
                      <p className={`text-2xl font-black ${kpi.style}`}>{kpi.value}</p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase">{kpi.desc}</p>
=======
  {
    id: "ROT-9921",
    auctionId: "TRC-201",
    label: "Curitiba → São Paulo",
    myBid: 4200,
    bestBid: 4200,
    status: "VENCENDO",
  },
  {
    id: "ROT-9922",
    auctionId: "TRC-202",
    label: "Joinville → Campinas",
    myBid: 3680,
    bestBid: 3600,
    status: "PERDENDO",
  },
  {
    id: "ROT-9923",
    auctionId: "TRC-203",
    label: "Londrina → Contagem",
    myBid: 3500,
    bestBid: 3200,
    status: "PERDENDO",
  },
  {
    id: "ROT-9924",
    auctionId: "TRC-204",
    label: "Maringá → Serra",
    myBid: 4050,
    bestBid: 4050,
    status: "VENCENDO",
  },
]

const operationAlerts = [
  {
    id: "TRC-1042",
    truck: "ABC-1234",
    action: "ATRASO NA COLETA",
    time: "- 15 min",
    critical: true,
  },
  {
    id: "TRC-1045",
    truck: "XYZ-9876",
    action: "PROX. COLETA",
    time: "1h 10m",
    critical: false,
  },
  {
    id: "TRC-1043",
    truck: "QWE-5544",
    action: "DESCARGA SLA",
    time: "2h 20m",
    critical: false,
  },
  {
    id: "TRC-1051",
    truck: "ASD-9988",
    action: "FIM DE JORNADA",
    time: "3h 00m",
    critical: false,
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <AppShell
      title="Visão Geral"
      contentClassName="overflow-hidden"
      innerClassName="h-full min-h-0"
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        {/* O GRANDE CARD BRANCO UNIFICADOR */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* SEÇÃO 1: LINHA DE CONTADORES (KPIs MACROS) */}
          <section className="mb-5 flex items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex gap-16">
              {kpis.map((kpi) => (
                <div key={kpi.title}>
                  <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    {kpi.title}
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <p className={`text-2xl font-black ${kpi.style}`}>
                      {kpi.value}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">
                      {kpi.desc}
                    </p>
>>>>>>> main
                  </div>
                </div>
              ))}
            </div>
<<<<<<< HEAD
            
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wide bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
=======

            <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-bold tracking-wide text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
>>>>>>> main
              <span>DISPATCH ATIVO</span>
            </div>
          </section>

          {/* SEÇÃO 2: DESEMPENHO DA TRANSPORTADORA */}
<<<<<<< HEAD
          <section className="border-b border-slate-100 pb-5 mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Performance e Operação (Mês Atual)</h2>
            <div className="grid grid-cols-3 gap-8">
              
              {/* Frota Ativa */}
              <div className="flex items-center gap-3 bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                <div className="p-2 bg-white rounded-md text-slate-600 border border-slate-100">
                  <Truck size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-slate-500">Frota em Operação</span>
                    <span className="text-sm font-black text-slate-800">{carrierPerformance.fleetActive}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-slate-700 h-full rounded-full" style={{ width: `${carrierPerformance.fleetActive}%` }} />
=======
          <section className="mb-5 border-b border-slate-100 pb-5">
            <h2 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
              Performance e Operação (Mês Atual)
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {/* Frota Ativa */}
              <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                <div className="rounded-md border border-slate-100 bg-white p-2 text-slate-600">
                  <Truck size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Frota em Operação
                    </span>
                    <span className="text-sm font-black text-slate-800">
                      {carrierPerformance.fleetActive}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-700"
                      style={{ width: `${carrierPerformance.fleetActive}%` }}
                    />
>>>>>>> main
                  </div>
                </div>
              </div>

              {/* Aproveitamento de Capacidade */}
<<<<<<< HEAD
              <div className="flex items-center gap-3 bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                <div className="p-2 bg-white rounded-md text-slate-600 border border-slate-100">
                  <Scale size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-slate-500">Ocupação (Peso/Vol)</span>
                    <span className="text-sm font-black text-slate-800">{carrierPerformance.capacityUtilization}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-slate-700 h-full rounded-full" style={{ width: `${carrierPerformance.capacityUtilization}%` }} />
=======
              <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                <div className="rounded-md border border-slate-100 bg-white p-2 text-slate-600">
                  <Scale size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Ocupação (Peso/Vol)
                    </span>
                    <span className="text-sm font-black text-slate-800">
                      {carrierPerformance.capacityUtilization}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-slate-700"
                      style={{
                        width: `${carrierPerformance.capacityUtilization}%`,
                      }}
                    />
>>>>>>> main
                  </div>
                </div>
              </div>

              {/* Taxa de Vitória (Win Rate) */}
<<<<<<< HEAD
              <div className="flex items-center gap-3 bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                <div className="p-2 bg-white rounded-md text-emerald-600 border border-slate-100">
                  <Trophy size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-slate-500">Sucesso em Leilões</span>
                    <span className="text-sm font-black text-emerald-600">{carrierPerformance.winRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${carrierPerformance.winRate}%` }} />
                  </div>
                </div>
              </div>

=======
              <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                <div className="rounded-md border border-slate-100 bg-white p-2 text-emerald-600">
                  <Trophy size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Sucesso em Leilões
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      {carrierPerformance.winRate}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${carrierPerformance.winRate}%` }}
                    />
                  </div>
                </div>
              </div>
>>>>>>> main
            </div>
          </section>

          {/* SEÇÃO 3: LANCES E OPERAÇÃO (BLOCO INFERIOR SCROLLÁVEL) */}
<<<<<<< HEAD
          <div className="flex-1 grid grid-cols-[1.2fr_1fr] gap-12 min-h-0 overflow-hidden">
            
            {/* Coluna Esquerda: Radar de Lances */}
            <div className="flex flex-col min-h-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Radar de Lances (Disputas Ativas)</h2>
                <Button 
                  variant="ghost" size="sm" 
                  className="h-7 text-xs text-blue-600 hover:text-blue-700 font-semibold gap-1 px-2"
                  onClick={() => navigate("/freights-offers-overview")}
=======
          <div className="grid min-h-0 flex-1 grid-cols-[1.2fr_1fr] gap-12 overflow-hidden">
            {/* Coluna Esquerda: Radar de Lances */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Radar de Lances (Disputas Ativas)
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  onClick={() => navigate("/freights-mural")}
>>>>>>> main
                >
                  Ir para Mural <ExternalLink size={12} />
                </Button>
              </div>
<<<<<<< HEAD
              
              <div className="flex-1 divide-y divide-slate-100 overflow-hidden">
=======

              <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
>>>>>>> main
                {activeBidsTracker.map((item) => {
                  const isWinning = item.status === "VENCENDO"
                  const diff = item.myBid - item.bestBid

                  return (
                    <button
                      key={item.id}
                      type="button"
<<<<<<< HEAD
                      onClick={() => navigate(`/bid-analysis/${item.auctionId}`)}
                      className="flex w-full items-center justify-between rounded-lg py-3 px-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[10px] font-bold text-slate-400">{item.id}</span>
                          <Badge variant="outline" className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0 border ${
                              isWinning ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}>
                              {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{item.label}</p>
                      </div>

                      <div className="text-right">
                        <div className="flex justify-end gap-3 mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <span>Meu Lance</span>
                            <span>Líder</span>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <span className="text-sm font-bold text-slate-900 font-mono">{formatCurrency(item.myBid)}</span>
                            <span className="text-sm font-bold text-slate-500 font-mono">{formatCurrency(item.bestBid)}</span>
                        </div>
                        
                        {!isWinning && diff > 0 && (
                            <p className="text-[10px] font-bold text-rose-500 flex items-center justify-end gap-1 mt-1">
                                <ArrowDownRight size={12} /> R$ {diff} para cobrir
                            </p>
=======
                      onClick={() => navigate(`/freight-bid/${item.auctionId}`)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left transition-colors hover:bg-slate-50"
                    >
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {item.id}
                          </span>
                          <Badge
                            variant="outline"
                            className={`border px-1.5 py-0 text-[8px] font-black tracking-wider uppercase ${
                              isWinning
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-rose-200 bg-rose-50 text-rose-700"
                            }`}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                          {item.label}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="mb-1 flex justify-end gap-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                          <span>Meu Lance</span>
                          <span>Líder</span>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                          <span className="font-mono text-sm font-bold text-slate-900">
                            {formatCurrency(item.myBid)}
                          </span>
                          <span className="font-mono text-sm font-bold text-slate-500">
                            {formatCurrency(item.bestBid)}
                          </span>
                        </div>

                        {!isWinning && diff > 0 && (
                          <p className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-rose-500">
                            <ArrowDownRight size={12} /> R$ {diff} para cobrir
                          </p>
>>>>>>> main
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Coluna Direita: Próximos Marcos de SLA (Despacho) */}
<<<<<<< HEAD
            <div className="flex flex-col min-h-0 border-l border-slate-100 pl-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Torre de Controle (SLAs)</h2>
                <Button 
                  variant="ghost" size="sm" 
                  className="h-7 text-xs text-blue-600 hover:text-blue-700 font-semibold gap-1 px-2"
                  onClick={() => navigate("/fleet-management")}
                >
                  Ver Frota <ExternalLink size={12} />
                </Button>
              </div>

              <div className="flex-1 divide-y divide-slate-100 overflow-hidden">
                {operationAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${alert.critical ? "bg-rose-600 animate-pulse" : "bg-amber-500"}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400"><Truck size={10} className="inline mr-1"/>{alert.truck}</span>
                          <span className="text-xs font-bold text-slate-800">{alert.id}</span>
                        </div>
                        <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase ${
                            alert.critical ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"
                        }`}>
=======
            <div className="flex min-h-0 flex-col border-l border-slate-100 pl-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Torre de Controle (SLAs)
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  onClick={() => navigate("/freight-management")}
                >
                  Ver Frota<ExternalLink size={12} />
                </Button>
              </div>

              <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
                {operationAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between px-2 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 shrink-0 rounded-full ${alert.critical ? "animate-pulse bg-rose-600" : "bg-amber-500"}`}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            <Truck size={10} className="mr-1 inline" />
                            {alert.truck}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {alert.id}
                          </span>
                        </div>
                        <span
                          className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
                            alert.critical
                              ? "bg-rose-50 text-rose-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
>>>>>>> main
                          {alert.action}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
<<<<<<< HEAD
                      <p className={`text-sm font-black font-mono flex items-center justify-end gap-1 ${alert.critical ? "text-rose-600" : "text-slate-700"}`}>
                        <Clock size={12} /> {alert.time}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Prazo Restante</p>
=======
                      <p
                        className={`flex items-center justify-end gap-1 font-mono text-sm font-black ${alert.critical ? "text-rose-600" : "text-slate-700"}`}
                      >
                        <Clock size={12} /> {alert.time}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        Prazo Restante
                      </p>
>>>>>>> main
                    </div>
                  </div>
                ))}
              </div>
            </div>
<<<<<<< HEAD

          </div>

=======
          </div>
>>>>>>> main
        </div>
      </div>
    </AppShell>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> main
